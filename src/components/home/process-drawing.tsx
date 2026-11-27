'use client';

import { useId, useState } from 'react';

/**
 * Homepage signature: the visitor's process drawn as a working drawing.
 * Selecting a revision (0 → A → B → C) redraws the process stroke by stroke.
 * The SVG is decorative; the parts list under it carries the same content as text.
 */

type NodeKind = 'source' | 'manual' | 'tool' | 'app' | 'decision';

type DrawingNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  kind: NodeKind;
};

type DrawingEdge = {
  points: ReadonlyArray<readonly [number, number]>;
  manual?: boolean;
  /** Integration bus or the final route to value — drawn in sage. */
  accent?: boolean;
};

type Revision = {
  id: '0' | 'A' | 'B' | 'C';
  name: string;
  when: string;
  dimension: string;
  nodes: DrawingNode[];
  edges: DrawingEdge[];
  /** The route reaches value: draw the sage stop-dot from the logo. */
  reachesValue: boolean;
};

const BOX_W = 120;
const BOX_H = 40;

const DECISION: DrawingNode = { id: 'decision', label: 'Sprawna praca', x: 432, y: 290, w: 128, kind: 'decision' };

const REVISIONS: Revision[] = [
  {
    id: '0',
    name: 'Stan obecny',
    when: 'rozproszone dane, ręczne przepisywanie albo kłopoty ze sprzętem i IT',
    dimension: 'dziś: rozproszone pliki, ręczna praca i nieuporządkowane środowisko IT',
    reachesValue: false,
    nodes: [
      { id: 'mail', label: 'Poczta / pliki', x: 30, y: 30, kind: 'source' },
      { id: 'sheets', label: 'Arkusze', x: 240, y: 30, kind: 'source' },
      { id: 'systems', label: 'Systemy', x: 440, y: 30, kind: 'source' },
      { id: 'it', label: 'Sprzęt / IT', x: 30, y: 170, kind: 'source' },
      { id: 'manual', label: 'ręczna praca', x: 230, y: 170, w: 140, kind: 'manual' },
      DECISION,
    ],
    edges: [
      { points: [[90, 70], [90, 120], [270, 120], [270, 170]], manual: true },
      { points: [[300, 70], [300, 170]], manual: true },
      { points: [[500, 70], [500, 130], [330, 130], [330, 170]], manual: true },
      { points: [[150, 190], [230, 190]], manual: true },
      { points: [[240, 50], [150, 50]], manual: true },
      { points: [[440, 60], [410, 60], [410, 150], [90, 150], [90, 170]], manual: true },
      { points: [[370, 190], [400, 190], [400, 250], [496, 250], [496, 290]], manual: true },
    ],
  },
  {
    id: 'A',
    name: 'Wsparcie IT i sprzęt',
    when: 'instalacja i konfiguracja komputerów, serwerów, sieci, poczty i backupu',
    dimension: 'rewizja A: sprawny sprzęt, serwery, poczta i automatyczne kopie zapasowe',
    reachesValue: true,
    nodes: [
      { id: 'hw', label: 'Komputery / sprzęt', x: 15, y: 30, w: 150, kind: 'source' },
      { id: 'srv', label: 'Serwery / NAS', x: 235, y: 30, w: 130, kind: 'source' },
      { id: 'backup', label: 'Poczta / backup', x: 430, y: 30, w: 135, kind: 'source' },
      { id: 'infra', label: 'sprawne środowisko IT', x: 195, y: 160, w: 210, kind: 'tool' },
      DECISION,
    ],
    edges: [
      { points: [[90, 70], [90, 180], [205, 180]] },
      { points: [[300, 70], [300, 160]] },
      { points: [[500, 70], [500, 180], [395, 180]] },
      { points: [[300, 200], [300, 310], [432, 310]], accent: true },
    ],
  },
  {
    id: 'B',
    name: 'Integracje i dane',
    when: 'połączone arkusze, poczta i systemy oraz czytelny widok danych',
    dimension: 'rewizja B: automatyczny przepływ danych i jeden uzgodniony widok',
    reachesValue: true,
    nodes: [
      { id: 'mail', label: 'Poczta / pliki', x: 30, y: 30, kind: 'source' },
      { id: 'sheets', label: 'Arkusze', x: 240, y: 30, kind: 'source' },
      { id: 'systems', label: 'Systemy', x: 440, y: 30, kind: 'source' },
      { id: 'sync', label: 'integracje i raporty', x: 195, y: 200, w: 210, kind: 'tool' },
      DECISION,
    ],
    edges: [
      { points: [[60, 140], [540, 140]], accent: true },
      { points: [[90, 70], [90, 140]] },
      { points: [[300, 70], [300, 140]] },
      { points: [[500, 70], [500, 140]] },
      { points: [[300, 140], [300, 200]] },
      { points: [[405, 220], [496, 220], [496, 290]], accent: true },
    ],
  },
  {
    id: 'C',
    name: 'Narzędzia i AI',
    when: 'dedykowana aplikacja albo automatyzacja dla jednego procesu',
    dimension: 'rewizja C: lekka aplikacja webowa lub automatyzacja pod konkretny proces',
    reachesValue: true,
    nodes: [
      { id: 'data', label: 'Dane / pliki', x: 30, y: 30, kind: 'source' },
      { id: 'process', label: 'Twój proces', x: 240, y: 30, kind: 'source' },
      { id: 'auto', label: 'automatyzacja / AI', x: 30, y: 160, w: 155, kind: 'tool' },
      { id: 'app', label: 'lekka aplikacja', x: 245, y: 150, w: 175, h: 60, kind: 'app' },
      DECISION,
    ],
    edges: [
      { points: [[90, 70], [90, 160]] },
      { points: [[300, 70], [300, 110], [150, 110], [150, 160]] },
      { points: [[185, 180], [245, 180]] },
      { points: [[420, 180], [496, 180], [496, 290]], accent: true },
    ],
  },
];

function toPath(points: DrawingEdge['points']) {
  return points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
}

function NodeShape({ node, index, hatchId }: { node: DrawingNode; index: number; hatchId: string }) {
  const w = node.w ?? BOX_W;
  const h = node.h ?? BOX_H;
  const isDecision = node.kind === 'decision';
  const className = `gv-node gv-node-${node.kind}`;

  return (
    <g className={className} style={{ '--i': index } as React.CSSProperties}>
      <rect x={node.x} y={node.y} width={w} height={h} />
      {node.kind === 'manual' ? (
        <rect className="gv-node-hatch" x={node.x} y={node.y} width={w} height={h} fill={`url(#${hatchId})`} />
      ) : null}
      <text x={node.x + w / 2} y={node.y + h / 2} dominantBaseline="central" textAnchor="middle">
        {node.label}
      </text>
      {isDecision ? null : (
        <g className="gv-balloon">
          <circle cx={node.x} cy={node.y} r={10} />
          <text x={node.x} y={node.y} dominantBaseline="central" textAnchor="middle">
            {index + 1}
          </text>
        </g>
      )}
    </g>
  );
}

export function ProcessDrawing() {
  const [revisionId, setRevisionId] = useState<Revision['id']>('0');
  const [hasInteracted, setHasInteracted] = useState(false);
  const groupName = `rev-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const revision = REVISIONS.find((item) => item.id === revisionId) ?? REVISIONS[0];
  const sources = revision.nodes.filter((node) => node.kind !== 'decision');

  return (
    <div className="gv-drawing-block">
      <figure className="gv-drawing">
        <svg
          viewBox="0 14 600 326"
          role="img"
          aria-labelledby={`${groupName}-caption`}
          className={hasInteracted ? 'is-redrawing' : undefined}
        >
          <defs>
            <pattern id={`${groupName}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" className="gv-hatch-line" />
            </pattern>
          </defs>
          <g key={revision.id}>
            {revision.edges.map((edge, index) => (
              <path
                key={`${revision.id}-edge-${index}`}
                d={toPath(edge.points)}
                pathLength={edge.manual ? undefined : 1}
                className={`gv-edge${edge.manual ? ' gv-edge-manual' : ''}${edge.accent ? ' gv-edge-accent' : ''}`}
                style={{ '--i': index } as React.CSSProperties}
              />
            ))}
            {revision.nodes.map((node, index) => (
              <NodeShape key={`${revision.id}-${node.id}`} node={node} index={index} hatchId={`${groupName}-hatch`} />
            ))}
            {revision.reachesValue ? (
              <g className="gv-value">
                <path d="M560 310 L578 310" pathLength={1} className="gv-edge gv-edge-accent" />
                <circle cx={586} cy={310} r={7} />
              </g>
            ) : (
              <text className="gv-unknown" x={586} y={310} dominantBaseline="central" textAnchor="middle">
                ?
              </text>
            )}
          </g>
        </svg>
        <figcaption id={`${groupName}-caption`} className="gv-dimension">
          <span aria-hidden="true" className="gv-dimension-line" />
          <span>{revision.dimension}</span>
          <span aria-hidden="true" className="gv-dimension-line" />
        </figcaption>
      </figure>

      <div className="gv-drawing-legend">
        <ol className="gv-parts-mini" aria-label={`Pozycje na rysunku, rewizja ${revision.id}`}>
          {sources.map((node, index) => (
            <li key={`${revision.id}-${node.id}-legend`}>
              <span className="gv-pos">{index + 1}</span>
              {node.label}
            </li>
          ))}
        </ol>
        <p className="gv-legend-note">
          <span className="gv-legend-swatch gv-legend-swatch-manual" aria-hidden="true" /> linia kreskowa i kreskowanie:
          ręczna praca i rozproszone dane
        </p>
      </div>

      <fieldset className="gv-revisions">
        <legend>Tabela zmian: od problemu do rozwiązania</legend>
        <div className="gv-revisions-head" aria-hidden="true">
          <span>Rew.</span>
          <span>Rozwiązanie</span>
          <span>Kiedy</span>
        </div>
        {REVISIONS.map((item) => (
          <label key={item.id} className="gv-revision-row">
            <input
              type="radio"
              name={groupName}
              value={item.id}
              checked={item.id === revisionId}
              onChange={() => {
                setHasInteracted(true);
                setRevisionId(item.id);
              }}
            />
            <span className="gv-revision-id">{item.id}</span>
            <span className="gv-revision-name">{item.name}</span>
            <span className="gv-revision-when">{item.when}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
