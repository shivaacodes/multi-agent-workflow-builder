"use client";
import { useEffect, useState } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getWorkflow, addStep } from "@/lib/api";

import ProfileIcon from "@/components/costum/ProfileIcon";

export default function WorkflowPage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWorkflow() {
      try {
        const res = await getWorkflow(1);
        const workflow = res.data;

        const workflowNodes = workflow.steps.map((step: any, i: number) => ({
          id: step.id.toString(),
          data: { label: step.name },
          position: { x: 100 * i, y: 100 },
        }));

        setNodes(workflowNodes);
      } catch (err) {
        console.error("Error loading workflow", err);
      }
    }

    fetchWorkflow();
  }, []);

  return (
    <div style={{ width: "100%", height: "90vh", position: "relative" }}>
      <ProfileIcon />
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
