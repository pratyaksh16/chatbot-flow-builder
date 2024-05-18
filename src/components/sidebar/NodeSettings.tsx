import { Node, useReactFlow } from "reactflow";
import NODE_TYPES from "../nodes";
import { DashboardContext } from "../../views/dashboard/useDashboardContainer";
import { useContext } from "react";

type Props = {
  selected: Node[],
}

const NodeSettings = ({ selected }: Props) => {
  const { resetSelection } = useContext(DashboardContext);
  const reactFlow = useReactFlow();
  let header = `${selected.length} Nodes Selected`;
  let Settings = null;

  if (selected.length === 1) {
    const nodeType = selected[0].type;
    if (nodeType) {
      const nodeTypeData = NODE_TYPES[nodeType];

      if (nodeTypeData) {
        header = nodeTypeData.name;
        Settings = nodeTypeData.Settings;
      }
    }
  }

  return (
    <aside className="h-full">
      <header className="relative w-full px-4 py-2 flex items-center justify-center border-b border-b-gray-300 leading-none">
        <button onClick={() => resetSelection(reactFlow)}>
          <img alt={"bubble"} src={"/arrow-left.svg"} width={16} height={16} />
        </button>
        <span className="flex-1 text-sm text-center font-medium block">
          {header}
        </span>
      </header>

      {Settings && <Settings selected={selected[0]} />}
    </aside>
  );
}

export default NodeSettings;
