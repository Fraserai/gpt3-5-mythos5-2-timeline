import { useMemo, useState } from 'react';
import { scaleTime } from 'd3';
import type { Model } from '../types';
import { useElementWidth } from '../lib/useElementWidth';
import {
  LABS,
  formatDate,
  hashString,
  labColor,
  parseDate,
  shortLabName,
} from '../lib/metrics';

interface ReleaseLanesProps {
  models: Model[];
  allModels: Model[];
  activeLabs: string[];
  date: number;
  min: number;
  max: number;
  selectedId: string | null;
  onSelect: (model: Model) => void;
}

interface LaneHover {
  model: Model;
  x: number;
  y: number;
}

const LANE_HEIGHT = 40;
const TOP_AXIS = 30;

function tierRadius(tier: Model['tier']): number {
  if (tier === 'flagship') return 5.6;
  if (tier === 'mid') return 4.3;
  return 3.3;
}

export function ReleaseLanes({
  models,
  allModels,
  activeLabs,
  date,
  min,
  max,
  selectedId,
  onSelect,
}: ReleaseLanesProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [hover, setHover] = useState<LaneHover | null>(null);

  const visibleLabs = useMemo(
    () => LABS.filter((lab) => activeLabs.length === 0 || activeLabs.includes(lab.id)),
    [activeLabs],
  );

  const totalByLab = useMemo(() => {
    const counts = new Map<string, number>();
    for (const model of allModels) {
      counts.set(model.lab, (counts.get(model.lab) ?? 0) + 1);
    }
    return counts;
  }, [allModels]);

  const widthSafe = Math.max(width, 360);
  const leftMargin = widthSafe < 700 ? 102 : 136;
  const rightMargin = 18;
  const innerWidth = Math.max(widthSafe - leftMargin - rightMargin, 120);
  const lanesHeight = visibleLabs.length * LANE_HEIGHT;
  const height = TOP_AXIS + lanesHeight + 10;

  const x = useMemo(
    () => scaleTime().domain([new Date(min), new Date(max)]).range([0, innerWidth]),
    [min, max, innerWidth],
  );

  const years = useMemo(() => {
    const result: number[] = [];
    for (let year = 2023; year <= 2026; year += 1) {
      const stamp = Date.UTC(year, 0, 1);
      if (stamp >= min && stamp <= max) result.push(stamp);
    }
    return result;
  }, [min, max]);

  const byLab = useMemo(() => {
    const map = new Map<string, Model[]>();
    for (const lab of visibleLabs) map.set(lab.id, []);
    for (const model of models) {
      const bucket = map.get(model.lab);
      if (bucket) bucket.push(model);
    }
    for (const bucket of map.values()) {
      bucket.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    }
    return map;
  }, [models, visibleLabs]);

  const releasedByLab = useMemo(() => {
    const counts = new Map<string, number>();
    for (const [lab, labModels] of byLab) {
      counts.set(lab, labModels.filter((model) => parseDate(model.releaseDate) <= date).length);
    }
    return counts;
  }, [byLab, date]);

  const nowX = x(new Date(date));
  const totalReleased = models.filter((model) => parseDate(model.releaseDate) <= date).length;

  return (
    <section className="section lanes-panel">
      <div className="section-head">
        <div>
          <span className="kicker">Release lanes</span>
          <h2>Every launch, by lab</h2>
        </div>
        <div className="section-meta">
          <span>{totalReleased} of {models.length} released</span>
          <span className="lane-legend">
            <i className="legend-ring" /> open weights
          </span>
        </div>
      </div>

      <div className="lanes-scroll" ref={ref}>
        {width > 0 && (
          <svg
            width={widthSafe}
            height={height}
            className="lanes-svg"
            role="img"
            aria-label="Model release lanes by lab across the timeline"
          >
            <g transform={`translate(${leftMargin},${TOP_AXIS})`}>
              {years.map((year) => (
                <g key={year}>
                  <line
                    className="year-grid"
                    x1={x(new Date(year))}
                    x2={x(new Date(year))}
                    y1={-TOP_AXIS + 8}
                    y2={lanesHeight}
                  />
                  <text className="year-label" x={x(new Date(year))} y={-12} textAnchor="middle">
                    {new Date(year).getUTCFullYear()}
                  </text>
                </g>
              ))}

              {visibleLabs.map((lab, laneIndex) => {
                const center = laneIndex * LANE_HEIGHT + LANE_HEIGHT / 2;
                const labModels = byLab.get(lab.id) ?? [];
                const released = releasedByLab.get(lab.id) ?? 0;
                return (
                  <g key={lab.id} className="lane-row">
                    <rect
                      className="lane-bg"
                      x={-leftMargin + 8}
                      y={laneIndex * LANE_HEIGHT}
                      width={innerWidth + leftMargin + rightMargin - 16}
                      height={LANE_HEIGHT}
                      rx={5}
                    />
                    <line
                      className="lane-baseline"
                      x1={0}
                      x2={innerWidth}
                      y1={center}
                      y2={center}
                    />
                    <text
                      className="lane-name"
                      x={-leftMargin + 22}
                      y={center - 1}
                      fill={lab.color}
                      textAnchor="start"
                    >
                      {shortLabName(lab.id)}
                    </text>
                    <text
                      className="lane-count"
                      x={-leftMargin + 22}
                      y={center + 11}
                      textAnchor="start"
                    >
                      {released}/{totalByLab.get(lab.id) ?? 0} releases
                    </text>

                    {labModels.map((model) => {
                      const releaseStamp = parseDate(model.releaseDate);
                      if (releaseStamp > date) return null;
                      const jitter = ((hashString(model.id) % 1000) / 1000 - 0.5) * 11;
                      const cx = x(new Date(releaseStamp));
                      const cy = center + jitter;
                      const radius = tierRadius(model.tier);
                      const selected = model.id === selectedId;
                      return (
                        <g
                          key={model.id}
                          className={`lane-node ${selected ? 'selected' : ''}`}
                          role="button"
                          tabIndex={0}
                          aria-label={`${model.name}, ${lab.name}, released ${formatDate(releaseStamp)}`}
                          onClick={() => onSelect(model)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              onSelect(model);
                            }
                          }}
                          onMouseEnter={(event) => {
                            setHover({ model, x: event.clientX, y: event.clientY });
                          }}
                          onMouseMove={(event) => {
                            setHover({ model, x: event.clientX, y: event.clientY });
                          }}
                          onMouseLeave={() => setHover(null)}
                        >
                          {model.openWeights && (
                            <circle
                              className="node-ring"
                              cx={cx}
                              cy={cy}
                              r={radius + 2.6}
                              stroke={labColor(model.lab)}
                            />
                          )}
                          <circle
                            className="node-dot"
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill={labColor(model.lab)}
                          />
                          {selected && (
                            <circle
                              className="node-selected-ring"
                              cx={cx}
                              cy={cy}
                              r={radius + 6}
                              stroke={labColor(model.lab)}
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              <line
                className="now-line"
                x1={nowX}
                x2={nowX}
                y1={-TOP_AXIS + 12}
                y2={lanesHeight}
              />
              <g transform={`translate(${nowX},${-TOP_AXIS + 12})`}>
                <circle className="now-cap" r={3.2} />
              </g>
              <line className="start-line" x1={0} x2={0} y1={-TOP_AXIS + 8} y2={lanesHeight} />
            </g>
          </svg>
        )}
        {visibleLabs.length === 0 && (
          <div className="empty-note">No labs selected. Choose a lab chip to restore the lanes.</div>
        )}
        {visibleLabs.length > 0 && models.length === 0 && (
          <div className="empty-note">No models match the current search and filters.</div>
        )}
      </div>

      <div className="lanes-foot">
        <span>
          <i className="size-key flagship" /> flagship
          <i className="size-key mid" /> mid
          <i className="size-key small" /> small
        </span>
        <span>Nodes appear on their announcement date. Hover for detail, click to pin.</span>
      </div>

      {hover && (
        <div className="floating-tip node-tip" style={{ left: hover.x, top: hover.y - 12 }}>
          <span className="tip-kicker">
            <i style={{ background: labColor(hover.model.lab) }} />
            {hover.model.labName}
          </span>
          <strong>{hover.model.name}</strong>
          <span className="tip-meta">
            {formatDate(parseDate(hover.model.releaseDate))} · {hover.model.tier} ·{' '}
            {hover.model.openWeights ? 'open weights' : 'proprietary'}
          </span>
          <em>Click to inspect</em>
        </div>
      )}
    </section>
  );
}
