import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import Navbar from '../components/Navbar'

const Podcast = () => {
  return (
    <DefaultLayout>
        <Navbar />
        <div className='text-Black'>podcast</div>
    </DefaultLayout>
  )
}

export default Podcast