import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Scrubber } from './components/Scrubber';
import { ReleaseLanes } from './components/ReleaseLanes';
import { FrontierChart } from './components/FrontierChart';
import { DetailCard } from './components/DetailCard';
import { models, MODELS_BY_DATE } from './data';
import type { Model } from './types';
import { buildMilestones } from './lib/milestones';
import { DAY_MS, LABS, clamp, parseDate } from './lib/metrics';

const MIN_DATE = Math.min(...models.map((model) => parseDate(model.releaseDate)));
const MAX_DATE = Math.max(...models.map((model) => parseDate(model.releaseDate)));
const DAYS_PER_SECOND = 32;
const MILESTONES = buildMilestones(models);

function matchesSearch(model: Model, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  const haystack = [
    model.name,
    model.labName,
    model.headlineCapabilities,
    model.whyItMattered,
    model.tier,
    model.access,
    model.id,
    ...model.inputModalities,
    ...model.outputModalities,
  ]
    .join(' ')
    .toLowerCase();
  return normalized.split(/\s+/).every((token) => haystack.includes(token));
}

export default function App() {
  const [date, setDate] = useState(MAX_DATE);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [query, setQuery] = useState('');
  const [activeLabs, setActiveLabs] = useState<string[]>([]);
  const [openOnly, setOpenOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [metricKey, setMetricKey] = useState('sweBenchVerified');

  const dateRef = useRef(date);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dateRef.current = date;
  }, [date]);

  const filtered = useMemo(
    () =>
      models.filter(
        (model) =>
          (activeLabs.length === 0 || activeLabs.includes(model.lab)) &&
          (!openOnly || model.openWeights) &&
          matchesSearch(model, query),
      ),
    [activeLabs, openOnly, query],
  );

  const filteredByDate = useMemo(
    () =>
      MODELS_BY_DATE.filter(
        (model) =>
          (activeLabs.length === 0 || activeLabs.includes(model.lab)) &&
          (!openOnly || model.openWeights) &&
          matchesSearch(model, query),
      ),
    [activeLabs, openOnly, query],
  );

  const releasedCount = useMemo(
    () => filtered.filter((model) => parseDate(model.releaseDate) <= date).length,
    [filtered, date],
  );

  const selected = useMemo(
    () => models.find((model) => model.id === selectedId) ?? null,
    [selectedId],
  );

  const togglePlay = useCallback(() => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (dateRef.current >= MAX_DATE - 1000) {
      dateRef.current = MIN_DATE;
      setDate(MIN_DATE);
    }
    setPlaying(true);
  }, [playing]);

  useEffect(() => {
    if (!playing) return undefined;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      const next = dateRef.current + delta * DAYS_PER_SECOND * DAY_MS * speed;
      if (next >= MAX_DATE) {
        dateRef.current = MAX_DATE;
        setDate(MAX_DATE);
        setPlaying(false);
        return;
      }
      dateRef.current = next;
      setDate(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest('input, textarea, select, [contenteditable="true"]') ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        if (event.shiftKey) {
          const next = clamp(dateRef.current + direction * 30 * DAY_MS, MIN_DATE, MAX_DATE);
          dateRef.current = next;
          setDate(next);
          return;
        }

        const pool = filteredByDate;
        let index = -1;
        for (let i = 0; i < pool.length; i += 1) {
          if (parseDate(pool[i].releaseDate) <= dateRef.current) index = i;
          else break;
        }

        let candidate: Model | undefined;
        if (direction > 0) {
          candidate = pool[index + 1];
        } else {
          const onModel =
            index >= 0 &&
            Math.abs(parseDate(pool[index].releaseDate) - dateRef.current) < 60_000;
          candidate = onModel ? pool[index - 1] : pool[index];
        }

        if (candidate) {
          const stamp = parseDate(candidate.releaseDate);
          dateRef.current = stamp;
          setDate(stamp);
          setSelectedId(candidate.id);
        } else {
          const edge = direction > 0 ? MAX_DATE : MIN_DATE;
          dateRef.current = edge;
          setDate(edge);
        }
        return;
      }

      if (event.key === ' ') {
        if (target?.closest('button, a, [role="button"]')) return;
        event.preventDefault();
        togglePlay();
        return;
      }

      if (event.key === 'Escape') {
        setSelectedId(null);
        return;
      }

      if (event.key === '/') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredByDate, togglePlay]);

  const handleDate = useCallback((value: number) => {
    const next = clamp(value, MIN_DATE, MAX_DATE);
    dateRef.current = next;
    setDate(next);
  }, []);

  const handleSelect = useCallback((model: Model) => {
    setSelectedId(model.id);
    const stamp = parseDate(model.releaseDate);
    if (stamp > dateRef.current) {
      dateRef.current = stamp;
      setDate(stamp);
    }
  }, []);

  const handleMilestone = useCallback((milestone: (typeof MILESTONES)[number]) => {
    dateRef.current = milestone.date;
    setDate(milestone.date);
    setSelectedId(milestone.modelId);
  }, []);

  const handleRestart = useCallback(() => {
    setPlaying(false);
    dateRef.current = MIN_DATE;
    setDate(MIN_DATE);
    setSelectedId(null);
  }, []);

  const toggleLab = (lab: string) => {
    setActiveLabs((previous) =>
      previous.includes(lab) ? previous.filter((item) => item !== lab) : [...previous, lab],
    );
  };

  const allLabsActive = activeLabs.length === 0;

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead-inner">
          <h1>Frontier Timeline</h1>
          <div className="masthead-rule" aria-hidden="true" />
        </div>
      </header>

      <div className="control-deck">
        <Scrubber
          min={MIN_DATE}
          max={MAX_DATE}
          date={date}
          playing={playing}
          speed={speed}
          releasedCount={releasedCount}
          totalCount={filtered.length}
          models={models}
          milestones={MILESTONES}
          onDate={handleDate}
          onTogglePlay={togglePlay}
          onSpeed={setSpeed}
          onRestart={handleRestart}
          onPickMilestone={handleMilestone}
        />

        <div className="filter-bar">
          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search models, labs, capabilities"
              aria-label="Search models"
            />
          </label>

          <div className="lab-filter" role="group" aria-label="Filter by lab">
            <button
              type="button"
              className={`lab-chip ${allLabsActive ? 'active' : ''}`}
              onClick={() => setActiveLabs([])}
              aria-pressed={allLabsActive}
            >
              All labs
            </button>
            {LABS.map((lab) => {
              const active = activeLabs.includes(lab.id);
              return (
                <button
                  type="button"
                  key={lab.id}
                  className={`lab-chip ${active ? 'active' : ''}`}
                  onClick={() => toggleLab(lab.id)}
                  aria-pressed={active}
                >
                  <i style={{ background: lab.color }} />
                  {lab.name}
                </button>
              );
            })}
          </div>

          <label className="open-toggle">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(event) => setOpenOnly(event.target.checked)}
            />
            Open weights only
          </label>

          <span className="filter-count">
            {filtered.length} of {models.length}
          </span>
        </div>
      </div>

      <main>
        <ReleaseLanes
          models={filtered}
          allModels={models}
          activeLabs={activeLabs}
          date={date}
          min={MIN_DATE}
          max={MAX_DATE}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        <FrontierChart
          models={filtered}
          date={date}
          min={MIN_DATE}
          max={MAX_DATE}
          metricKey={metricKey}
          onMetricChange={setMetricKey}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        <DetailCard model={selected} date={date} onClose={() => setSelectedId(null)} />
      </main>

    </div>
  );
}
