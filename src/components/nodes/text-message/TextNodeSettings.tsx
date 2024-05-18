"use client"

import React, { useEffect, useState } from "react";
import { Node, useReactFlow } from "reactflow";
import { TextMessageData } from "./TextNode";

export type SettingsPanelProps = {
  selected: Node<TextMessageData>;
}

const SettingsPanel: React.FunctionComponent<SettingsPanelProps> = ({ selected }) => {
  const reactFlow = useReactFlow();
  const [message, setMessage] = useState(selected.data.message);

  useEffect(() => {
    // side-effect to run, whenever selected node changes
    setMessage(selected.data.message);
  }, [selected]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);

    reactFlow.setNodes((oldNodes) => {
      const updatedNodes = oldNodes.map((node) => {
        if (node.id !== selected.id) return node;
        return { ...node, data: { ...node.data, message: event.target.value } };
      });

      return updatedNodes;
    });
  };

  return (
    <section className="px-4 py-6 border-b border-b-gray-300">
      <label className="text-xs mb-2 block text-gray-500">Text</label>
      <textarea
        className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        value={message}
        onChange={handleChange}
      />
    </section>
  );
};

export default SettingsPanel;
