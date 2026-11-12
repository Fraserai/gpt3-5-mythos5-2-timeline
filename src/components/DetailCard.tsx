import type { Model } from '../types';
import {
  METRICS,
  formatContext,
  formatDate,
  formatMetricValue,
  formatModality,
  formatPrice,
  labColor,
  metricBarFraction,
  parseDate,
  sourceHost,
} from '../lib/metrics';

interface DetailCardProps {
  model: Model | null;
  date: number;
  onClose: () => void;
}

export function DetailCard({ model, date, onClose }: DetailCardProps) {
  if (!model) {
    return (
      <section className="section detail-empty">
        <p>Select a model in the lanes or the chart above to read its record.</p>
      </section>
    );
  }

  const released = parseDate(model.releaseDate) <= date;

  return (
    <section className="section record" key={model.id}>
      <div className="record-top">
        <div className="record-head">
          <div className="record-topline">
            <span className="field-label">
              <i className="lab-square" style={{ background: labColor(model.lab) }} />
              {model.labName} · {formatDate(parseDate(model.releaseDate))}
            </span>
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close record">
              ✕
            </button>
          </div>
          <h2>{model.name}</h2>
          <p className="record-badges">
            {model.tier} · {model.openWeights ? 'open weights' : 'proprietary'} · {model.access}
            {!released && ' · after the playhead'}
          </p>
          <p className="record-lede">{model.headlineCapabilities}</p>
        </div>

        <div className="record-why">
          <span className="field-label">Why it mattered</span>
          <p>{model.whyItMattered}</p>
        </div>
      </div>

      <div className="record-grid">
        <div className="record-facts">
          <span className="field-label">At a glance</span>
          <dl>
            <div>
              <dt>Context</dt>
              <dd>{formatContext(model.contextWindow)} tokens</dd>
            </div>
            <div>
              <dt>Max output</dt>
              <dd>{formatContext(model.maxOutputTokens)} tokens</dd>
            </div>
            <div>
              <dt>Price / 1M in</dt>
              <dd>{formatPrice(model.pricePerMillionInput)}</dd>
            </div>
            <div>
              <dt>Price / 1M out</dt>
              <dd>{formatPrice(model.pricePerMillionOutput)}</dd>
            </div>
            <div>
              <dt>Modalities</dt>
              <dd>
                {model.inputModalities.map(formatModality).join(', ') || '—'} →{' '}
                {model.outputModalities.map(formatModality).join(', ') || '—'}
              </dd>
            </div>
          </dl>

          <span className="field-label" style={{ marginTop: 22 }}>Sources</span>
          <ol className="source-list">
            {model.sources.map((source, index) => (
              <li key={source}>
                <a href={source} target="_blank" rel="noreferrer">
                  <span>{sourceHost(source)}</span>
                  <em>{index === 0 ? 'primary' : 'reference'}</em>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="record-benchmarks">
          <div className="section-title">
            <span className="field-label">Benchmarks</span>
            <span className="section-note">published values only; “—” means not found</span>
          </div>
          <div className="bench-list">
            {METRICS.map((metric) => {
              const value = model.benchmarks[metric.key];
              return (
                <div className={`bench-row ${value == null ? 'is-null' : ''}`} key={metric.key}>
                  <div className="bench-label">
                    <span>{metric.label}</span>
                    <strong>{formatMetricValue(metric.key, value)}</strong>
                  </div>
                  <div className="bench-track">
                    {value != null && (
                      <span
                        className="bench-fill"
                        style={{ width: `${metricBarFraction(metric.key, value) * 100}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
