"use client";

import { memo, useEffect, useState, useId } from "react";
import { useTheme } from "next-themes";

interface ColumnDef {
  type: string;
  name: string;
  isPk?: boolean;
}

interface TableCardProps {
  id: string;
  title: string;
  columns: ColumnDef[];
  x: number;
  y: number;
  width: number;
  isHovered: boolean;
  isDimmed: boolean;
  isDark: boolean;
  onHover: (id: string | null) => void;
}

const TableCard = memo(function TableCard({
  id,
  title,
  columns,
  x,
  y,
  width,
  isHovered,
  isDimmed,
  isDark,
  onHover,
}: TableCardProps) {
  const headerHeight = 28;
  const rowHeight = 22;
  const totalHeight = headerHeight + columns.length * rowHeight;
  const typeColWidth = 52;
  const nameColWidth = width - typeColWidth - 28;

  // Colors based on theme
  const cardBg = isDark
    ? isHovered
      ? "rgba(16, 26, 36, 0.95)"
      : "rgba(10, 16, 24, 0.92)"
    : isHovered
    ? "rgba(255, 255, 255, 0.98)"
    : "rgba(250, 252, 255, 0.95)";

  const headerBg = isDark
    ? isHovered
      ? "rgba(30, 58, 82, 0.85)"
      : "rgba(20, 38, 54, 0.75)"
    : isHovered
    ? "rgba(224, 238, 249, 0.9)"
    : "rgba(235, 243, 250, 0.8)";

  const borderColor = isDark
    ? isHovered
      ? "rgba(56, 189, 248, 0.8)"
      : "rgba(60, 95, 125, 0.55)"
    : isHovered
    ? "rgba(14, 116, 144, 0.85)"
    : "rgba(180, 205, 225, 0.75)";

  const headerTextColor = isDark
    ? "rgba(240, 248, 255, 0.98)"
    : "rgba(15, 23, 42, 0.95)";

  const typeTextColor = isDark
    ? "rgba(125, 175, 205, 0.75)"
    : "rgba(71, 105, 130, 0.85)";

  const nameTextColor = isDark
    ? "rgba(230, 240, 250, 0.95)"
    : "rgba(30, 41, 59, 0.95)";

  const dividerColor = isDark
    ? "rgba(60, 95, 125, 0.35)"
    : "rgba(200, 220, 235, 0.65)";

  const pkBadgeBg = isDark
    ? "rgba(56, 189, 248, 0.15)"
    : "rgba(14, 116, 144, 0.12)";

  const pkBadgeText = isDark
    ? "rgba(125, 211, 252, 0.95)"
    : "rgba(14, 116, 144, 0.95)";

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{
        cursor: "pointer",
        transition: "all 0.25s ease-out",
        opacity: isDimmed ? 0.35 : 1,
      }}
    >
      {/* Outer Card Frame with subtle shadow & glow */}
      {isHovered && (
        <rect
          x={-3}
          y={-3}
          width={width + 6}
          height={totalHeight + 6}
          rx={3}
          fill="none"
          stroke={isDark ? "rgba(56, 189, 248, 0.45)" : "rgba(14, 116, 144, 0.3)"}
          strokeWidth={3}
          opacity={0.6}
        />
      )}

      {/* Main Card Background */}
      <rect
        x={0}
        y={0}
        width={width}
        height={totalHeight}
        rx={2}
        fill={cardBg}
        stroke={borderColor}
        strokeWidth={isHovered ? 1.5 : 1}
      />

      {/* Header Container */}
      <rect
        x={0}
        y={0}
        width={width}
        height={headerHeight}
        fill={headerBg}
        rx={2}
      />
      <line
        x1={0}
        y1={headerHeight}
        x2={width}
        y2={headerHeight}
        stroke={borderColor}
        strokeWidth={1}
      />

      {/* Table Header Title */}
      <text
        x={width / 2}
        y={18}
        textAnchor="middle"
        fill={headerTextColor}
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.08em"
        fontFamily="var(--font-mono), monospace"
      >
        {title}
      </text>

      {/* Column Rows */}
      {columns.map((col, idx) => {
        const rowY = headerHeight + idx * rowHeight;
        const isLast = idx === columns.length - 1;

        return (
          <g key={col.name + idx}>
            {/* Row separator */}
            {!isLast && (
              <line
                x1={0}
                y1={rowY + rowHeight}
                x2={width}
                y2={rowY + rowHeight}
                stroke={dividerColor}
                strokeWidth={0.75}
              />
            )}

            {/* Vertical column separator 1 (between type and name) */}
            <line
              x1={typeColWidth}
              y1={rowY}
              x2={typeColWidth}
              y2={rowY + rowHeight}
              stroke={dividerColor}
              strokeWidth={0.75}
            />

            {/* Vertical column separator 2 (between name and PK) */}
            <line
              x1={width - 28}
              y1={rowY}
              x2={width - 28}
              y2={rowY + rowHeight}
              stroke={dividerColor}
              strokeWidth={0.75}
            />

            {/* Type Column */}
            <text
              x={6}
              y={rowY + 15}
              fill={typeTextColor}
              fontSize="9.5"
              fontFamily="var(--font-mono), monospace"
              fontWeight="400"
            >
              {col.type}
            </text>

            {/* Name Column */}
            <text
              x={typeColWidth + 7}
              y={rowY + 15}
              fill={nameTextColor}
              fontSize="10"
              fontFamily="var(--font-mono), monospace"
              fontWeight="500"
            >
              {col.name}
            </text>

            {/* PK Badge if primary key */}
            {col.isPk && (
              <g transform={`translate(${width - 24}, ${rowY + 4})`}>
                <rect
                  x={0}
                  y={0}
                  width={20}
                  height={14}
                  rx={2}
                  fill={pkBadgeBg}
                />
                <text
                  x={10}
                  y={10.5}
                  textAnchor="middle"
                  fill={pkBadgeText}
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="var(--font-mono), monospace"
                >
                  PK
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
});

export function AIWorkflowFlow({ expanded = true }: { expanded?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const filterId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Schema definitions strictly matching the reference
  const tables = {
    user: {
      id: "user",
      title: "USER",
      x: 75,
      y: 20,
      width: 155,
      columns: [
        { type: "string", name: "id", isPk: true },
        { type: "string", name: "name" },
        { type: "string", name: "email" },
      ],
    },
    training: {
      id: "training",
      title: "TRAINING",
      x: 265,
      y: 135,
      width: 155,
      columns: [
        { type: "number", name: "id", isPk: true },
        { type: "string", name: "name" },
        { type: "string", name: "author_id" },
        { type: "idk", name: "idk" },
      ],
    },
    readAccess: {
      id: "readAccess",
      title: "READ_ACCES",
      x: 75,
      y: 285,
      width: 155,
      columns: [
        { type: "string", name: "training_id", isPk: true },
        { type: "string", name: "user_id", isPk: true },
      ],
    },
    writeAccess: {
      id: "writeAccess",
      title: "WRITE_ACCES",
      x: 435,
      y: 285,
      width: 155,
      columns: [
        { type: "string", name: "training_id", isPk: true },
        { type: "string", name: "user_id", isPk: true },
      ],
    },
  };

  // Color tokens
  const strokeColor = isDark ? "rgba(100, 150, 185, 0.55)" : "rgba(80, 120, 150, 0.65)";
  const strokeActiveColor = isDark ? "rgba(56, 189, 248, 0.95)" : "rgba(14, 116, 144, 1)";
  const dotColor = isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(15, 23, 42, 0.85)";
  const labelBg = isDark ? "rgba(12, 20, 30, 0.88)" : "rgba(245, 248, 252, 0.92)";
  const labelText = isDark ? "rgba(215, 235, 250, 0.9)" : "rgba(30, 50, 70, 0.95)";
  const gridDotColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.07)";

  // Relationships
  const relations = [
    {
      id: "rel-user-training",
      from: "user",
      to: "training",
      label: "Created",
      labelPos: { x: 250, y: 92 },
      path: "M 230 75 C 285 75, 342 90, 342 135",
      // End markers: double tick at user, crow's foot at training
      userTick: { x: 238, y: 75, angle: 90 },
      crowFoot: { x: 342, y: 135, angle: 90 },
    },
    {
      id: "rel-user-read",
      from: "user",
      to: "readAccess",
      label: "has",
      labelPos: { x: 130, y: 200 },
      path: "M 152 114 C 152 165, 152 230, 152 285",
      userTick: { x: 152, y: 124, angle: 0 },
      crowFoot: { x: 152, y: 285, angle: 0 },
    },
    {
      id: "rel-user-write",
      from: "user",
      to: "writeAccess",
      label: "has",
      labelPos: { x: 420, y: 95 },
      path: "M 230 50 C 445 42, 515 110, 512 285",
      userTick: { x: 242, y: 50, angle: 90 },
      crowFoot: { x: 512, y: 285, angle: 0 },
    },
    {
      id: "rel-training-read",
      from: "training",
      to: "readAccess",
      label: "gives",
      labelPos: { x: 248, y: 270 },
      path: "M 320 255 C 300 280, 260 295, 230 305",
      userTick: { x: 312, y: 263, angle: 45 },
      crowFoot: { x: 230, y: 305, angle: 165 },
    },
    {
      id: "rel-training-write",
      from: "training",
      to: "writeAccess",
      label: "gives",
      labelPos: { x: 440, y: 230 },
      path: "M 420 220 C 465 230, 475 255, 465 285",
      userTick: { x: 428, y: 222, angle: 45 },
      crowFoot: { x: 465, y: 285, angle: 0 },
    },
  ];

  return (
    <div className="relative w-full h-full min-h-0 flex items-center justify-center select-none overflow-hidden p-1">
      <svg
        viewBox="0 0 650 380"
        className="w-full h-full max-h-[380px] object-contain overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle Grid Dot Pattern */}
          <pattern
            id={`grid-dots-${filterId}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="1" fill={gridDotColor} />
          </pattern>

          {/* Glow Filter for Active Edges */}
          <filter id={`glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Canvas Background Grid */}
        <rect
          x="0"
          y="0"
          width="650"
          height="380"
          fill={`url(#grid-dots-${filterId})`}
        />

        {/* Relationship Lines */}
        {relations.map((rel, idx) => {
          const isRelActive =
            hoveredEntity === rel.from || hoveredEntity === rel.to;
          const isRelDimmed =
            hoveredEntity !== null && !isRelActive;

          return (
            <g
              key={rel.id}
              style={{
                opacity: isRelDimmed ? 0.2 : 1,
                transition: "opacity 0.25s ease-out",
              }}
            >
              {/* Active Backing Glow */}
              {isRelActive && (
                <path
                  d={rel.path}
                  fill="none"
                  stroke={strokeActiveColor}
                  strokeWidth="3.5"
                  opacity="0.5"
                  filter={`url(#glow-${filterId})`}
                />
              )}

              {/* Main Curve */}
              <path
                id={`path-${rel.id}`}
                d={rel.path}
                fill="none"
                stroke={isRelActive ? strokeActiveColor : strokeColor}
                strokeWidth={isRelActive ? 1.75 : 1.25}
              />

              {/* ERD Double Crossbar (||) at source */}
              {rel.id === "rel-user-training" && (
                <g transform="translate(242, 75)">
                  <line x1="-3" y1="-6" x2="-3" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="2" y1="-6" x2="2" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}
              {rel.id === "rel-user-read" && (
                <g transform="translate(152, 126)">
                  <line x1="-6" y1="-3" x2="6" y2="-3" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="-6" y1="2" x2="6" y2="2" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}
              {rel.id === "rel-user-write" && (
                <g transform="translate(242, 50)">
                  <line x1="-3" y1="-6" x2="-3" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="2" y1="-6" x2="2" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}
              {rel.id === "rel-training-read" && (
                <g transform="translate(310, 268) rotate(40)">
                  <line x1="-3" y1="-6" x2="-3" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="2" y1="-6" x2="2" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}
              {rel.id === "rel-training-write" && (
                <g transform="translate(426, 222) rotate(-30)">
                  <line x1="-3" y1="-6" x2="-3" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="2" y1="-6" x2="2" y2="6" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}

              {/* ERD Crow's Foot & Circle Notation at target */}
              {rel.id === "rel-user-training" && (
                <g transform="translate(342, 135)">
                  {/* Circle */}
                  <circle cx="0" cy="-12" r="3.5" fill={dotColor} stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1" />
                  {/* 3 Prongs of crow's foot */}
                  <line x1="0" y1="-12" x2="-7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="0" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}

              {rel.id === "rel-user-read" && (
                <g transform="translate(152, 285)">
                  {/* Circle */}
                  <circle cx="0" cy="-12" r="3.5" fill={dotColor} stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1" />
                  {/* 3 Prongs */}
                  <line x1="0" y1="-12" x2="-7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="0" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}

              {rel.id === "rel-user-write" && (
                <g transform="translate(512, 285)">
                  {/* Circle */}
                  <circle cx="0" cy="-12" r="3.5" fill={dotColor} stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1" />
                  {/* 3 Prongs */}
                  <line x1="0" y1="-12" x2="-7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="0" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}

              {rel.id === "rel-training-read" && (
                <g transform="translate(230, 305) rotate(70)">
                  <circle cx="0" cy="-12" r="3.5" fill={dotColor} stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1" />
                  <line x1="0" y1="-12" x2="-7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="0" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}

              {rel.id === "rel-training-write" && (
                <g transform="translate(465, 285)">
                  <circle cx="0" cy="-12" r="3.5" fill={dotColor} stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1" />
                  <line x1="0" y1="-12" x2="-7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="0" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                  <line x1="0" y1="-12" x2="7" y2="0" stroke={isRelActive ? strokeActiveColor : strokeColor} strokeWidth="1.25" />
                </g>
              )}

              {/* Animated Light Flow Pulse along path */}
              <circle r="2.5" fill={isDark ? "#38bdf8" : "#0284c7"}>
                <animateMotion
                  dur={`${3.5 + idx * 0.5}s`}
                  repeatCount="indefinite"
                  path={rel.path}
                />
              </circle>

              {/* Text Label with Pill Background */}
              <g transform={`translate(${rel.labelPos.x}, ${rel.labelPos.y})`}>
                <rect
                  x="-18"
                  y="-8"
                  width="36"
                  height="16"
                  rx="3"
                  fill={labelBg}
                  stroke={isRelActive ? strokeActiveColor : "transparent"}
                  strokeWidth="0.75"
                />
                <text
                  x="0"
                  y="3.5"
                  textAnchor="middle"
                  fill={labelText}
                  fontSize="9.5"
                  fontWeight="500"
                  fontFamily="var(--font-mono), monospace"
                >
                  {rel.label}
                </text>
              </g>
            </g>
          );
        })}

        {/* Database / Workflow Tables */}
        {Object.values(tables).map((tbl) => {
          const isHovered = hoveredEntity === tbl.id;
          const isDimmed =
            hoveredEntity !== null &&
            hoveredEntity !== tbl.id &&
            !relations.some(
              (r) =>
                (r.from === hoveredEntity && r.to === tbl.id) ||
                (r.to === hoveredEntity && r.from === tbl.id)
            );

          return (
            <TableCard
              key={tbl.id}
              id={tbl.id}
              title={tbl.title}
              columns={tbl.columns}
              x={tbl.x}
              y={tbl.y}
              width={tbl.width}
              isHovered={isHovered}
              isDimmed={isDimmed}
              isDark={isDark}
              onHover={setHoveredEntity}
            />
          );
        })}
      </svg>
    </div>
  );
}
