import Header from '@/components/header';
import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='grid-background'>
      </div>
      <main className='min-h-screen p-4 w-full h-full pr-8 pl-8'>
        <Header />
        <Outlet />
      </main>
      <footer className='p-10 text-center bg-gray-800 mt-10'>
        Made with Love ❤️ by Asif
      </footer>
    </div>
  )
}

export default AppLayout;