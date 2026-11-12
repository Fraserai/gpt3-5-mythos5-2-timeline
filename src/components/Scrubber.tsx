import { useMemo, useRef, useState } from 'react';
import type { Milestone, Model } from '../types';
import { clamp, formatDate, labColor } from '../lib/metrics';

interface ScrubberProps {
  min: number;
  max: number;
  date: number;
  playing: boolean;
  speed: number;
  releasedCount: number;
  totalCount: number;
  models: Model[];
  milestones: Milestone[];
  onDate: (value: number) => void;
  onTogglePlay: () => void;
  onSpeed: (value: number) => void;
  onRestart: () => void;
  onPickMilestone: (milestone: Milestone) => void;
}

const SPEEDS = [0.5, 1, 2, 4];

interface HoverState {
  milestone: Milestone;
  x: number;
  y: number;
}

export function Scrubber({
  min,
  max,
  date,
  playing,
  speed,
  releasedCount,
  totalCount,
  models,
  milestones,
  onDate,
  onTogglePlay,
  onSpeed,
  onRestart,
  onPickMilestone,
}: ScrubberProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [hover, setHover] = useState<HoverState | null>(null);

  const pct = ((date - min) / (max - min)) * 100;

  const months = useMemo(() => {
    const result: { ts: number; yearStart: boolean }[] = [];
    const cursor = new Date(min);
    let tick = Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth(), 1);
    if (tick < min) {
      tick = Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1);
    }
    const end = max;
    while (tick <= end) {
      const current = new Date(tick);
      result.push({ ts: tick, yearStart: current.getUTCMonth() === 0 });
      tick = Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, 1);
    }
    return result;
  }, [min, max]);

  const releaseCounts = useMemo(() => {
    const counts = new Array(months.length).fill(0);
    for (const model of models) {
      const stamp = Date.parse(`${model.releaseDate}T00:00:00Z`);
      let closest = 0;
      for (let i = 0; i < months.length; i += 1) {
        if (months[i].ts <= stamp) closest = i;
      }
      counts[closest] += 1;
    }
    return counts.map((count) => Math.min(count, 6));
  }, [months, models]);

  const setFromClientX = (clientX: number) => {
    const element = trackRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    onDate(min + ratio * (max - min));
  };

  const yearLabels = months.filter(
    (month) => month.yearStart && new Date(month.ts).getUTCFullYear() >= 2024,
  );

  return (
    <div className="scrubber">
      <div className="scrub-head">
        <button
          type="button"
          className="play-button"
          onClick={onTogglePlay}
          aria-label={playing ? 'Pause timeline' : 'Play timeline'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="7" y="5" width="3.6" height="14" />
              <rect x="13.4" y="5" width="3.6" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7Z" />
            </svg>
          )}
        </button>

        <div className="scrub-date">
          <span className="field-label">Date</span>
          <strong>{formatDate(date)}</strong>
        </div>

        <div className="scrub-readout">
          <span className="field-label">Released</span>
          <strong>
            {releasedCount} <em>/ {totalCount}</em>
          </strong>
        </div>

        <div className="speed-control" role="group" aria-label="Playback speed">
          <span className="field-label">Speed</span>
          <div className="speed-buttons">
            {SPEEDS.map((value) => (
              <button
                key={value}
                type="button"
                className={value === speed ? 'active' : ''}
                onClick={() => onSpeed(value)}
                aria-pressed={value === speed}
              >
                {value}×
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="text-button" onClick={onRestart}>
          Restart
        </button>
      </div>

      <div
        ref={trackRef}
        className="scrub-track"
        role="slider"
        tabIndex={0}
        aria-label="Timeline scrubber"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(date)}
        aria-valuetext={formatDate(date)}
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('.milestone')) return;
          event.preventDefault();
          dragging.current = true;
          trackRef.current?.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) setFromClientX(event.clientX);
        }}
        onPointerUp={(event) => {
          dragging.current = false;
          trackRef.current?.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div className="month-grid" aria-hidden="true">
          {months.map((month) => (
            <span
              key={month.ts}
              className={month.yearStart ? 'year' : ''}
              style={{ left: `${((month.ts - min) / (max - min)) * 100}%` }}
            />
          ))}
        </div>

        <div className="histogram" aria-hidden="true">
          {months.map((month, index) => {
            const count = releaseCounts[index] ?? 0;
            const isPast = month.ts <= date;
            return (
              <span
                key={month.ts}
                className={isPast ? 'past' : ''}
                style={{
                  left: `${((month.ts - min) / (max - min)) * 100}%`,
                  height: `${3 + count * 2.2}px`,
                }}
              />
            );
          })}
        </div>

        <div className="milestones">
          {milestones.map((milestone) => {
            const left = ((milestone.date - min) / (max - min)) * 100;
            const reached = milestone.date <= date;
            return (
              <button
                key={milestone.id}
                type="button"
                className={`milestone ${reached ? 'reached' : ''}`}
                style={{ left: `${left}%` }}
                onClick={(event) => {
                  event.stopPropagation();
                  onPickMilestone(milestone);
                }}
                onMouseEnter={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  setHover({ milestone, x: rect.left + rect.width / 2, y: rect.top });
                }}
                onMouseLeave={() => setHover(null)}
                onFocus={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  setHover({ milestone, x: rect.left + rect.width / 2, y: rect.top });
                }}
                onBlur={() => setHover(null)}
                aria-label={milestone.label}
              />
            );
          })}
        </div>

        <div className="scrub-progress" style={{ width: `${pct}%` }} aria-hidden="true" />
        <div className="playhead" style={{ left: `${pct}%` }} aria-hidden="true" />

        <div className="scrub-years" aria-hidden="true">
          <span className="edge-label start" style={{ left: '0%' }}>
            Nov ’22
          </span>
          {yearLabels.map((month) => (
            <span
              key={month.ts}
              style={{ left: `${((month.ts - min) / (max - min)) * 100}%` }}
            >
              {new Date(month.ts).getUTCFullYear()}
            </span>
          ))}
          <span className="edge-label end">Nov ’26</span>
        </div>
      </div>

      {hover && (
        <div
          className="floating-tip milestone-tip"
          style={{ left: hover.x, top: hover.y - 10 }}
          role="tooltip"
        >
          <span className="tip-kicker">
            <i style={{ background: labColor(hover.milestone.lab) }} />
            {formatDate(hover.milestone.date)}
          </span>
          <strong>{hover.milestone.label}</strong>
          <em>Click to jump</em>
        </div>
      )}
    </div>
  );
}
