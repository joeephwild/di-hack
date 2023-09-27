import { Sidebar } from '../components'

export default function DefaultLayout({ children }) {
  return (
    <div className='flex items-start'>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}