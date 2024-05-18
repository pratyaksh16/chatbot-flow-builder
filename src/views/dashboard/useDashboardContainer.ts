// This file contains all the business logic and methods
import { createContext, useCallback, useMemo, useState } from "react";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeProps,
  ReactFlowInstance,
  ReactFlowJsonObject,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { toast } from "sonner";
import NODE_TYPES from "../../components/nodes/index";

interface DashboardContextType {
  nodes: Node[];
  edges: Edge[];
  settingsPanelOpen: boolean;
  setSettingsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNodes: Node[];
  setSelectedNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  handleInit: (instance: ReactFlowInstance) => void;
  onDragStart: (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: string
  ) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
  handleNodesChange: (changes: NodeChange[]) => void;
  handleEdgesChange: (changes: EdgeChange[]) => void;
  handleConnect: (connection: Connection) => void;
  nodeTypes: { [key: string]: React.ComponentType<NodeProps> };
  nodeTypesList: {
    type: string;
    name: string;
    image: string;
  }[];
  resetSelection: (rfInstance: ReactFlowInstance) => void;
  handleSave: () => void;
}

export const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

const useDahboardContainer = (): DashboardContextType => {
  const [settingsPanelOpen, setSettingsPanelOpen] = useState<boolean>(false);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [reactFlow, setReactFlow] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  // Callback when <ReactFlow> is Initialized/rendered
  const handleInit = (instance: ReactFlowInstance) => {
    setReactFlow(instance);

    // Restore last saved Flow State from localStorage
    const flowState = localStorage.getItem("flowState");
    if (!flowState) return;
    try {
      const parsedState: ReactFlowJsonObject | null = JSON.parse(flowState);
      if (!parsedState) return;

      // Adding default viewport parameters
      const { x = 0, y = 0, zoom = 1 } = parsedState.viewport;
      instance.setNodes(parsedState.nodes || []);
      instance.setEdges(parsedState.edges || []);
      instance.setViewport({ x, y, zoom });

      toast("Restored Saved Flow");
    } catch (error) {
      console.error("Error while parsing flowState from localStorage", error);
    }
  };

  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLButtonElement>, nodeType: string) => {
      if (!event.dataTransfer) return;

      event.dataTransfer.setData("application/reactflow", nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      if (!reactFlow) return;
      event.preventDefault();

      // ensure dragged item is a flow node
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // get screen position of dragged element
      const screenPosition = { x: event.clientX, y: event.clientY };

      // set position of dragged element in flow canvas
      const flowPosition = reactFlow.screenToFlowPosition(screenPosition);

      // Create data for newly added node
      const newNode: Node = {
        id: String(Date.now()),
        position: flowPosition,
        ...NODE_TYPES[type].generate(),
      };

      // Update it to Nodes[] state
      reactFlow.setNodes((old) => old.concat(newNode));
    },
    [reactFlow]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((old) => applyNodeChanges(changes, old));
    },
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((old) => applyEdgeChanges(changes, old));
    },
    [setEdges]
  );

  const handleConnect = useCallback(
    (connection: Connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    },
    [setEdges]
  );

  // Types of all nodes
  const nodeTypes: { [key: string]: React.ComponentType<NodeProps> } =
    useMemo(() => {
      const types: { [key: string]: React.ComponentType<NodeProps> } = {};

      Object.entries(NODE_TYPES).forEach(([key, value]) => {
        types[key] = value.Node;
      });

      return types;
    }, [NODE_TYPES]);

  // All types of Nodes to rendern on Sidepanel
  const nodeTypesList: { type: string; name: string; image: string }[] =
    useMemo(() => {
      const typesList: { type: string; name: string; image: string }[] = [];
      Object.entries(NODE_TYPES).forEach(([key, value]) => {
        typesList.push({ type: key, name: value.name, image: value.image });
      });
      return typesList;
    }, [NODE_TYPES]);

  // deselects all nodes
  const resetSelection = (rfInstance: ReactFlowInstance) => {
    rfInstance.setNodes((old) => {
      return old.map((node) => ({ ...node, selected: false }));
    });

    rfInstance.setEdges((old) => {
      return old.map((edge) => ({ ...edge, selected: false }));
    });
  };

  // Business Logic for saving
  const handleSave = useCallback(() => {
    if (!reactFlow) return;

    // if multiple nodes without source exist, prevent saving
    if (nodes.length === 0) {
      toast.error("Cannot save empty flow");
      return;
    }

    if (nodes.length > 1) {
      // get all nodes without a source
      // - find all edges
      // - filter out nodes ids that are nwither connect by a source or a target

      const nodeIDs = new Set();
      nodes.forEach((node) => nodeIDs.add(node.id));
      edges.forEach((edge) => {
        nodeIDs.delete(edge.target);
      });

      // if multiple nodes without source exist, prevent saving
      if (nodeIDs.size > 1) {
        toast.error("Unable to Save Flow");
        return;
      }
    }

    // save to localStorage
    localStorage.setItem("flowState", JSON.stringify(reactFlow.toObject()));

    toast("Saved Changes Successfully");
  }, [reactFlow, nodes, edges]);

  return {
    nodes,
    edges,
    nodeTypes,
    nodeTypesList,
    settingsPanelOpen,
    setSettingsPanelOpen,
    selectedNodes,
    setSelectedNodes,
    handleInit,
    onDragStart,
    onDragOver,
    onDrop,
    handleNodesChange,
    handleEdgesChange,
    handleConnect,
    resetSelection,
    handleSave,
  };
};

export default useDahboardContainer;
