import { useCallback, useContext } from 'react'
import { DashboardContext } from '../../views/dashboard/useDashboardContainer';
import { Edge, Node, useOnSelectionChange } from 'reactflow';
import NodesPanel from '../nodes-panel/NodesPanel';
import NodeSettings from './NodeSettings';

const Sidebar = () => {

  const { selectedNodes, setSelectedNodes } = useContext(DashboardContext);
  const onChange = useCallback(({ nodes }: { nodes: Node[], edges: Edge[] }) => {
    setSelectedNodes(nodes);
  }, []);
  useOnSelectionChange({ onChange });

  if (selectedNodes.length) return <NodeSettings selected={selectedNodes} />;
  return <NodesPanel />;
}

export default Sidebar