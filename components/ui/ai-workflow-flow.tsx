"use client";

import { memo, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useTheme } from "next-themes";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  useNodesInitialized,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { Braces, Zap, Sparkles } from "lucide-react";
import "@xyflow/react/dist/style.css";

type WorkflowNodeData = {
  label: string;
  icon: ReactNode;
  colors: {
    node: string;
    nodeBorder: string;
    nodeChip: string;
    nodeMuted: string;
    nodeText: string;
    handle: string;
    handleBorder: string;
  };
};

const DARK_COLORS = {
  bg: "#000000",
  dots: "#2a2a2a",
  edge: "#5b5b5b",
  node: "#131313",
  nodeBorder: "#2e2e2e",
  nodeChip: "#232323",
  nodeMuted: "#c6c6c6",
  nodeText: "#d6d6d6",
  handle: "#9ca3af",
  handleBorder: "#000000",
};

const LIGHT_COLORS = {
  bg: "#f4f1eb",
  dots: "#d9d3c9",
  edge: "#9a948a",
  node: "#ffffff",
  nodeBorder: "#ddd6c9",
  nodeChip: "#ede9e1",
  nodeMuted: "#6f6a62",
  nodeText: "#2b2723",
  handle: "#8b857c",
  handleBorder: "#ffffff",
};

const WorkflowNode = memo(function WorkflowNode({ data }: NodeProps<WorkflowNodeDef>) {
  const { colors } = data;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: 7, height: 7, background: colors.handle, border: `2px solid ${colors.handleBorder}` }}
      />
      <div
        className="flex items-center gap-1.5 rounded-[5px] px-1.5 py-1"
        style={{
          minWidth: 92,
          background: colors.node,
          border: `1px solid ${colors.nodeBorder}`,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px]"
          style={{ background: colors.nodeChip, color: colors.nodeMuted }}
        >
          {data.icon}
        </span>
        <p className="truncate font-mono text-caption font-medium tracking-wide" style={{ color: colors.nodeText }}>
          {data.label}
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: 7, height: 7, background: colors.handle, border: `2px solid ${colors.handleBorder}` }}
      />
    </>
  );
});

const nodeTypes = { workflow: WorkflowNode };

type WorkflowNodeDef = Node<WorkflowNodeData, "workflow">;

function buildNodes(colors: WorkflowNodeData["colors"]): WorkflowNodeDef[] {
  return [
    {
      id: "trigger",
      type: "workflow",
      position: { x: 0, y: 0 },
      data: { label: "trigger", icon: <Zap size={10} strokeWidth={2.5} />, colors },
    },
    {
      id: "extract",
      type: "workflow",
      position: { x: 120, y: 0 },
      data: { label: "extract", icon: <Braces size={10} strokeWidth={2.5} />, colors },
    },
    {
      id: "llm",
      type: "workflow",
      position: { x: 240, y: 0 },
      data: { label: "llm · reason", icon: <Sparkles size={10} strokeWidth={2.5} />, colors },
    },
  ];
}

function buildEdges(edgeColor: string): Edge[] {
  const edgeStyle = (): Edge["style"] => ({
    stroke: edgeColor,
    strokeWidth: 1.5,
    strokeDasharray: "6 4",
  });

  const edgeArrow = {
    type: MarkerType.ArrowClosed,
    color: edgeColor,
    width: 12,
    height: 12,
  };

  return [
    {
      id: "e-trigger-extract",
      source: "trigger",
      target: "extract",
      animated: true,
      style: edgeStyle(),
      markerEnd: edgeArrow,
    },
    {
      id: "e-extract-llm",
      source: "extract",
      target: "llm",
      animated: true,
      style: edgeStyle(),
      markerEnd: edgeArrow,
    },
  ];
}

function FlowCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { resolvedTheme } = useTheme();
  const { fitView } = useReactFlow();
  const nodesInitialized = useNodesInitialized({ includeHiddenNodes: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const nodes = useMemo(() => buildNodes(colors), [colors]);
  const edges = useMemo(() => buildEdges(colors.edge), [colors]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let raf = 0;
    const waitForSize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
        setReady(true);
      } else {
        raf = requestAnimationFrame(waitForSize);
      }
    };
    raf = requestAnimationFrame(waitForSize);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!ready || !nodesInitialized) return;
    const t = setTimeout(() => fitView({ padding: 0.5, duration: 0 }), 100);
    return () => clearTimeout(t);
  }, [ready, nodesInitialized, fitView]);

  const flowStyle: CSSProperties = {
    background: colors.bg,
  };

  return (
    <div
      ref={wrapperRef}
      className="ai-workflow-flow h-full w-full min-w-[320px]"
      style={{ minHeight: 60 }}
    >
      {ready && dimensions.width > 0 && dimensions.height > 0 && (
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
          proOptions={{ hideAttribution: true }}
          fitView
          fitViewOptions={{ padding: 0.5 }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={14}
            size={1}
            color={colors.dots}
            style={{ backgroundColor: "transparent" }}
          />
        </ReactFlow>
      )}
    </div>
  );
}

export function AIWorkflowFlow() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
