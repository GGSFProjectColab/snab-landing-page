"use client";

import { memo, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type MermaidNodeData = {
  label: string;
  tag?: string;
  colors: {
    bg: string;
    border: string;
    text: string;
    tagBg: string;
    tagText: string;
    handle: string;
  };
};

const DARK_THEME = {
  canvasBg: "transparent",
  dots: "rgba(255, 255, 255, 0.14)",
  edgeColor: "rgba(255, 255, 255, 0.42)",
  node: {
    bg: "#111111",
    border: "rgba(255, 255, 255, 0.22)",
    text: "oklch(0.985 0 0)",
    tagBg: "#222222",
    tagText: "oklch(0.708 0 0)",
    handle: "oklch(0.556 0 0)",
  },
};

const LIGHT_THEME = {
  canvasBg: "transparent",
  dots: "rgba(0, 0, 0, 0.14)",
  edgeColor: "rgba(0, 0, 0, 0.42)",
  node: {
    bg: "#ffffff",
    border: "oklch(0.88 0.01 80)",
    text: "oklch(0.22 0.012 265)",
    tagBg: "oklch(0.94 0.008 80)",
    tagText: "oklch(0.5 0.02 265)",
    handle: "oklch(0.58 0.11 185)",
  },
};

const PRO_OPTIONS = { hideAttribution: true };
const FIT_VIEW_OPTIONS = { padding: 0.15 };

// Clean Mermaid-style rectangular Node
const MermaidNode = memo(function MermaidNode({ data }: NodeProps<Node<MermaidNodeData>>) {
  const { colors, label, tag } = data;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 6,
          height: 6,
          background: colors.handle,
          border: "none",
          borderRadius: 0,
        }}
      />
      <div
        className="flex min-w-[130px] flex-col justify-center rounded-none px-3 py-2 text-left"
        style={{
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          fontFamily: "var(--font-mono), monospace",
        }}
      >
        {tag && (
          <span
            className="mb-1 w-fit rounded-none px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-mono font-medium"
            style={{ background: colors.tagBg, color: colors.tagText }}
          >
            {tag}
          </span>
        )}
        <p
          className="font-mono text-[11px] font-medium leading-tight tracking-tight"
          style={{ color: colors.text }}
        >
          {label}
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 6,
          height: 6,
          background: colors.handle,
          border: "none",
          borderRadius: 0,
        }}
      />
    </>
  );
});

const nodeTypes = {
  mermaid: MermaidNode,
};

type MermaidNodeDef = Node<MermaidNodeData, "mermaid">;

function build8Nodes(colors: typeof DARK_THEME.node): MermaidNodeDef[] {
  return [
    {
      id: "1",
      type: "mermaid",
      position: { x: 0, y: 70 },
      data: { label: "Client Ingest / Webhook", tag: "START", colors },
    },
    {
      id: "2",
      type: "mermaid",
      position: { x: 160, y: 70 },
      data: { label: "Schema Validation", tag: "PROCESS", colors },
    },
    {
      id: "3",
      type: "mermaid",
      position: { x: 330, y: 15 },
      data: { label: "Vector Search & RAG", tag: "BRANCH A", colors },
    },
    {
      id: "4",
      type: "mermaid",
      position: { x: 330, y: 125 },
      data: { label: "Prompt & Tool Assembly", tag: "BRANCH B", colors },
    },
    {
      id: "5",
      type: "mermaid",
      position: { x: 500, y: 70 },
      data: { label: "LLM Reasoning Engine", tag: "CORE", colors },
    },
    {
      id: "6",
      type: "mermaid",
      position: { x: 670, y: 70 },
      data: { label: "Guardrails & Eval", tag: "CHECK", colors },
    },
    {
      id: "7",
      type: "mermaid",
      position: { x: 840, y: 15 },
      data: { label: "Database / API Action", tag: "OUTPUT A", colors },
    },
    {
      id: "8",
      type: "mermaid",
      position: { x: 840, y: 125 },
      data: { label: "Emit Stream Response", tag: "OUTPUT B", colors },
    },
  ];
}

function build8Edges(edgeColor: string): Edge[] {
  const edgeStyle: Edge["style"] = {
    stroke: edgeColor,
    strokeWidth: 1.5,
  };

  const markerEnd = {
    type: MarkerType.ArrowClosed,
    color: edgeColor,
    width: 10,
    height: 10,
  };

  return [
    { id: "e1-2", source: "1", target: "2", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e2-3", source: "2", target: "3", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e2-4", source: "2", target: "4", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e3-5", source: "3", target: "5", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e4-5", source: "4", target: "5", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e5-6", source: "5", target: "6", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e6-7", source: "6", target: "7", type: "smoothstep", style: edgeStyle, markerEnd },
    { id: "e6-8", source: "6", target: "8", type: "smoothstep", style: edgeStyle, markerEnd },
  ];
}

function FlowCanvas({ expanded = true }: { expanded?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { fitView } = useReactFlow();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  const nodes = useMemo(() => build8Nodes(theme.node), [theme.node]);
  const edges = useMemo(() => build8Edges(theme.edgeColor), [theme.edgeColor]);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      fitView(FIT_VIEW_OPTIONS);
    }, 80);
    return () => clearTimeout(t);
  }, [mounted, fitView, isDark]);

  const flowStyle: CSSProperties = {
    background: "transparent",
  };

  return (
    <div
      className="ai-workflow-flow relative h-full w-full min-h-[220px] select-none flex items-center justify-center"
      style={{ minHeight: expanded ? 240 : 180 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        style={flowStyle}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={PRO_OPTIONS}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color={theme.dots}
          style={{ backgroundColor: "transparent" }}
        />
      </ReactFlow>
    </div>
  );
}

export function AIWorkflowFlow({ expanded = true }: { expanded?: boolean }) {
  return (
    <ReactFlowProvider>
      <FlowCanvas expanded={expanded} />
    </ReactFlowProvider>
  );
}
