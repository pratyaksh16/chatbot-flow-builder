import React, { useContext } from "react";
import { DashboardContext } from "../../views/dashboard/useDashboardContainer";

const NodesPanel: React.FunctionComponent = () => {
  const { onDragStart, nodeTypesList } = useContext(DashboardContext);

  return (
    <aside className="h-full px-4 py-10 grid grid-cols-1 grid-rows-8 gap-4">
      {nodeTypesList.map(({ image, name, type }, i) => (
        <button aria-label={type} key={i} className="flex w-full border border-blue-400 rounded-md py-4 h-max flex-col items-center gap-3" onDragStart={(event) => onDragStart(event, type)} draggable>
          <img alt={"bubble"} src={image} width={32} height={32} />
          <span>{name}</span>
        </button>
      ))}
    </aside>
  );
}

export default NodesPanel;