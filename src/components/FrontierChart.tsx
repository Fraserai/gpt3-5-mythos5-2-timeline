import { useEffect, useMemo, useRef, useState } from 'react';
import { axisBottom, axisLeft, scaleLinear, scaleLog, scaleTime, select, timeFormat } from 'd3';
import type { BenchmarkKey, Model } from '../types';
import { useElementWidth } from '../lib/useElementWidth';
import {
  CHART_METRICS,
  formatDate,
  formatMetricValue,
  labColor,
  METRIC_BY_KEY,
  parseDate,
} from '../lib/metrics';

interface FrontierChartProps {
  models: Model[];
  date: number;
  min: number;
  max: number;
  metricKey: string;
  onMetricChange: (key: string) => void;
  selectedId: string | null;
  onSelect: (model: Model) => void;
}

interface ChartHover {
  model: Model;
  value: number;
  x: number;
  y: number;
}

const MARGIN = { top: 18, right: 14, bottom: 28, left: 56 };
const CHART_HEIGHT = 300;

export function FrontierChart({
  models,
  date,
  min,
  max,
  metricKey,
  onMetricChange,
  selectedId,
  onSelect,
}: FrontierChartProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const [hover, setHover] = useState<ChartHover | null>(null);
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);
  const gridRef = useRef<SVGGElement>(null);

  const metric = METRIC_BY_KEY.get(metricKey as BenchmarkKey) ?? METRIC_BY_KEY.get('sweBenchVerified')!;

  const available = useMemo(
    () =>
      models
        .filter((model) => model.benchmarks[metric.key] != null)
        .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate)),
    [models, metric.key],
  );

  const released = useMemo(
    () => available.filter((model) => parseDate(model.releaseDate) <= date),
    [available, date],
  );

  const records = useMemo(() => {
    const result: { model: Model; date: number; value: number }[] = [];
    let record = Number.NEGATIVE_INFINITY;
    for (const model of released) {
      const value = model.benchmarks[metric.key];
      if (value == null || value <= record) continue;
      record = value;
      result.push({ model, date: parseDate(model.releaseDate), value });
    }
    return result;
  }, [released, metric.key]);

  const widthSafe = Math.max(width, 360);
  const innerWidth = Math.max(widthSafe - MARGIN.left - MARGIN.right, 120);
  const innerHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom;

  const yDomain = useMemo<[number, number]>(() => {
    if (metric.scale === 'log') return [1, 1000];
    if (metric.scale === 'arena') {
      const highest = Math.max(...available.map((model) => model.benchmarks[metric.key] ?? 0), 1500);
      return [1200, Math.max(1500, Math.ceil(highest / 50) * 50)];
    }
    return [0, 100];
  }, [metric, available]);

  const x = useMemo(
    () => scaleTime().domain([new Date(min), new Date(max)]).range([0, innerWidth]),
    [min, max, innerWidth],
  );

  const y = useMemo(() => {
    const scale = metric.scale === 'log' ? scaleLog() : scaleLinear();
    scale.domain(yDomain).range([innerHeight, 0]);
    return scale;
  }, [metric.scale, yDomain, innerHeight]);

  const yTicks = useMemo(() => {
    if (metric.scale === 'log') return [1, 10, 60, 240, 720];
    if (metric.scale === 'arena') {
      const ticks: number[] = [];
      for (let tick = yDomain[0]; tick <= yDomain[1]; tick += 50) ticks.push(tick);
      return ticks;
    }
    return [0, 20, 40, 60, 80, 100];
  }, [metric.scale, yDomain]);

  const yearTicks = useMemo(() => {
    const result: Date[] = [];
    for (let year = 2023; year <= 2026; year += 1) {
      const stamp = Date.UTC(year, 0, 1);
      if (stamp >= min && stamp <= max) result.push(new Date(stamp));
    }
    return result;
  }, [min, max]);

  useEffect(() => {
    if (!width || !xAxisRef.current || !yAxisRef.current || !gridRef.current) return;
    const xAxis = axisBottom(x)
      .tickValues(yearTicks)
      .tickFormat((value) => timeFormat('%Y')(value as Date))
      .tickSizeOuter(0);
    select(xAxisRef.current).call(xAxis as never);

    const yAxis = axisLeft(y)
      .tickValues(yTicks)
      .tickFormat((value) => formatMetricValue(metric.key, Number(value)))
      .tickSizeOuter(0);
    select(yAxisRef.current).call(yAxis);

    const grid = axisLeft(y)
      .tickValues(yTicks)
      .tickSize(-innerWidth)
      .tickFormat(() => '');
    select(gridRef.current).call(grid);
  }, [x, y, innerWidth, yTicks, yearTicks, metric.key, width]);

  const recordPath = useMemo(() => {
    if (records.length === 0) return '';
    const [first, ...rest] = records;
    let path = `M${x(new Date(first.date))},${y(first.value)}`;
    for (const record of rest) {
      path += ` H${x(new Date(record.date))} V${y(record.value)}`;
    }
    path += ` H${x(new Date(date))}`;
    return path;
  }, [records, x, y, date]);

  const latest = records[records.length - 1] ?? null;

  return (
    <section className="section chart-panel">
      <div className="section-head chart-head">
        <div>
          <span className="kicker">The frontier, measured</span>
          <h2>{metric.label}</h2>
        </div>
        <label className="select-wrap">
          <span>Metric</span>
          <select value={metric.key} onChange={(event) => onMetricChange(event.target.value)}>
            {CHART_METRICS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
            <option disabled value="arcAgi1">
              ARC-AGI-1 (no published rows)
            </option>
          </select>
        </label>
      </div>

      {latest && (
        <p className="record-line-note">
          Standing record at this date: <strong>{formatMetricValue(metric.key, latest.value)}</strong>
          , set by {latest.model.name} on {formatDate(latest.date)}.
        </p>
      )}

      <div className="chart-plot" ref={ref}>
        {width > 0 && (
          <svg
            width={widthSafe}
            height={CHART_HEIGHT}
            role="img"
            aria-label={`${metric.label} record chart from late 2022 to late 2026`}
          >
            <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
              <g ref={gridRef} className="chart-grid" />
              <path className="record-line" d={recordPath} />

              {released.map((model) => {
                const value = model.benchmarks[metric.key];
                if (value == null) return null;
                const cx = x(new Date(parseDate(model.releaseDate)));
                const cy = y(value);
                const selected = model.id === selectedId;
                return (
                  <g
                    key={model.id}
                    className={`chart-point ${selected ? 'selected' : ''}`}
                    onClick={() => onSelect(model)}
                    onMouseEnter={(event) =>
                      setHover({ model, value, x: event.clientX, y: event.clientY })
                    }
                    onMouseMove={(event) =>
                      setHover({ model, value, x: event.clientX, y: event.clientY })
                    }
                    onMouseLeave={() => setHover(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${model.name}: ${formatMetricValue(metric.key, value)}`}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onSelect(model);
                      }
                    }}
                  >
                    <circle
                      className="chart-dot"
                      cx={cx}
                      cy={cy}
                      r={selected ? 5 : 2.8}
                      fill={labColor(model.lab)}
                    />
                    {selected && <circle className="chart-selected" cx={cx} cy={cy} r={9} />}
                  </g>
                );
              })}

              {records.map((record) => {
                const cx = x(new Date(record.date));
                const cy = y(record.value);
                return (
                  <rect
                    key={`record-${record.model.id}`}
                    className="record-marker"
                    x={cx - 3.2}
                    y={cy - 3.2}
                    width={6.4}
                    height={6.4}
                    transform={`rotate(45 ${cx} ${cy})`}
                  />
                );
              })}

              <g ref={xAxisRef} className="axis x-axis" transform={`translate(0,${innerHeight})`} />
              <g ref={yAxisRef} className="axis y-axis" />
            </g>
          </svg>
        )}
      </div>

      <p className="section-note">
        Each point is a published score attached to a model row; no point means no published value
        was found — a gap, not a zero. Scores are mostly provider-reported and not strictly
        like-for-like. Diamonds mark new all-time highs.
        {metric.scale === 'log' ? ' Y axis is logarithmic.' : ''}
      </p>

      {hover && (
        <div className="floating-tip chart-tip" style={{ left: hover.x, top: hover.y - 12 }}>
          <span className="tip-kicker">
            <i style={{ background: labColor(hover.model.lab) }} />
            {hover.model.labName}
          </span>
          <strong>{hover.model.name}</strong>
          <span className="tip-meta">
            {metric.short}: {formatMetricValue(metric.key, hover.value)} ·{' '}
            {formatDate(parseDate(hover.model.releaseDate))}
          </span>
          <em>Click to inspect</em>
        </div>
      )}
    </section>
  );
}
