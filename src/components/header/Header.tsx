import { Toaster } from './Toaster'
import { useContext } from 'react';
import { DashboardContext } from '../../views/dashboard/useDashboardContainer';

const Header = () => {
  const { handleSave } = useContext(DashboardContext)
  return (
    <div className='flex w-full h-[50px] border bg-gray-100 items-center'>
      <Toaster position='top-center' />
      <div className='flex w-full justify-between items-center'>
        <a href="https://github.com/pratyaksh16/chatbot-flow-builder" target='_blank'>
          <div className='underline text-sm lg:ml-6 ml-2'>Github Repo</div>
        </a>
        <button className='border border-blue-500 rounded-md text-sm p-2.5 lg:mr-12 mr-2' onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  )
}

export default Header