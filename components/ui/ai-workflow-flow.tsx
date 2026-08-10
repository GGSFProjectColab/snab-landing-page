"use client";

import { memo, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
};

const WorkflowNode = memo(function WorkflowNode({ data }: NodeProps<WorkflowNodeDef>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
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
        position={Position.Right}
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
    position: { x: 0, y: 0 },
    data: { label: "trigger", icon: <Zap size={10} strokeWidth={2.5} /> },
  },
  {
    id: "extract",
    type: "workflow",
    position: { x: 120, y: 0 },
    data: { label: "extract", icon: <Braces size={10} strokeWidth={2.5} /> },
  },
  {
    id: "llm",
    type: "workflow",
    position: { x: 240, y: 0 },
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

function FlowCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { fitView } = useReactFlow();
  const nodesInitialized = useNodesInitialized({ includeHiddenNodes: true });

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
            color="#2a2a2a"
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