"use client";

import { memo, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ReactFlow,
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
};

const WorkflowNode = memo(function WorkflowNode({ data }: NodeProps<WorkflowNodeDef>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ width: 7, height: 7, background: "#9ca3af", border: "2px solid #000" }}
      />
      <div
        className="flex items-center gap-1.5 rounded-[5px] px-1.5 py-1"
        style={{
          minWidth: 92,
          background: "#131313",
          border: "1px solid #2e2e2e",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#232323] text-[#c6c6c6]">
          {data.icon}
        </span>
        <p className="truncate font-mono text-[9px] font-medium tracking-wide text-[#d6d6d6]">
          {data.label}
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ width: 7, height: 7, background: "#9ca3af", border: "2px solid #000" }}
      />
    </>
  );
});

const nodeTypes = { workflow: WorkflowNode };

type WorkflowNodeDef = Node<WorkflowNodeData, "workflow">;

const nodes: WorkflowNodeDef[] = [
  {
    id: "trigger",
    type: "workflow",
    position: { x: 70, y: 6 },
    data: { label: "trigger", icon: <Zap size={10} strokeWidth={2.5} /> },
  },
  {
    id: "extract",
    type: "workflow",
    position: { x: 70, y: 88 },
    data: { label: "extract", icon: <Braces size={10} strokeWidth={2.5} /> },
  },
  {
    id: "llm",
    type: "workflow",
    position: { x: 70, y: 170 },
    data: { label: "llm · reason", icon: <Sparkles size={10} strokeWidth={2.5} /> },
  },
];

const edgeStyle = (): Edge["style"] => ({
  stroke: "#5b5b5b",
  strokeWidth: 1.5,
  strokeDasharray: "6 4",
});

const edgeArrow = {
  type: MarkerType.ArrowClosed,
  color: "#5b5b5b",
  width: 12,
  height: 12,
};

const edges: Edge[] = [
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

const flowStyle: CSSProperties = {
  background: "#000000",
};

function FlowAligner() {
  const { getNodes, setCenter } = useReactFlow();
  const nodesInitialized = useNodesInitialized({ includeHiddenNodes: true });

  const align = useCallback(() => {
    const el = document.querySelector(".ai-workflow-flow");
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    if (width === 0 || height === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of getNodes()) {
      const w = node.measured?.width ?? 0;
      const h = node.measured?.height ?? 0;
      if (w <= 0 || h <= 0) return;
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + w);
      maxY = Math.max(maxY, node.position.y + h);
    }

    const bw = maxX - minX;
    const bh = maxY - minY;
    const padding = 0.1;
    const zoom = Math.min(
      (width * (1 - padding * 2)) / bw,
      (height * (1 - padding * 2)) / bh
    );

    setCenter((minX + maxX) / 2, (minY + maxY) / 2, { zoom, duration: 0 });
  }, [getNodes, setCenter]);

  useEffect(() => {
    if (!nodesInitialized) return;
    align();
  }, [nodesInitialized, align]);

  useEffect(() => {
    const el = document.querySelector(".ai-workflow-flow");
    if (!el) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(align);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [align]);

  return null;
}

export function AIWorkflowFlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let raf = 0;
    const waitForSize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setReady(true);
      } else {
        raf = requestAnimationFrame(waitForSize);
      }
    };
    raf = requestAnimationFrame(waitForSize);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapperRef} className="ai-workflow-flow h-full w-full">
      {ready ? (
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
        >
          <FlowAligner />
          <Background
            variant={BackgroundVariant.Dots}
            gap={14}
            size={1}
            color="#2a2a2a"
          />
        </ReactFlow>
      ) : null}
    </div>
  );
}