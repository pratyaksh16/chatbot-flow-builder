

import ReactFlow, { Controls, Background, ReactFlowProvider } from 'reactflow';
import useDahboardContainer, { DashboardContext } from './useDashboardContainer';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import "reactflow/dist/style.css";

const DashboardContainer = () => {

  const dashboardStates = useDahboardContainer();
  const {
    nodes,
    edges,
    nodeTypes,
    handleInit,
    onDragOver,
    onDrop,
    handleNodesChange,
    handleEdgesChange,
    handleConnect,
  } = dashboardStates;

  return (
    <ReactFlowProvider>
      <DashboardContext.Provider value={dashboardStates}>
        <div className='w-full h-full'>
          <Header />
          <div className='flex lg:flex-row flex-col w-full h-[calc(100vh-52px)]'>
            <div className='flex-grow h-[calc(100%-200px)] lg:h-full lg:w-[calc(100%-350px)] w-full'>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onInit={handleInit}
                onConnect={handleConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>

            <div className='lg:h-full h-[200px] lg:w-[350px] w-full border'>
              <Sidebar />
            </div>
          </div>
        </div>
      </DashboardContext.Provider>
    </ReactFlowProvider>
  )
}

export default DashboardContainer