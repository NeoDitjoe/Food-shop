import Image from 'next/image'
import FullWidthGrid from '@/components/grid'
import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import {  getMenuList } from '@/database/Database'
import StateContext from '@/usecontext/stateContext'

export default function Home({menuList}) {

  const { setOptions } = StateContext()

  useEffect(() => {
    setOptions(menuList)
  })

  return (
    <Fragment>
      <Head>
        <title>BOBO. Delious Food</title>
        <meta name="description" content="Browse our menu at BOBO. Discover a wide range of kota, sphathlo, bunny, chips dishes." />
      </Head>

      <main>

        <Image 
            src={'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
            alt="background" 
            width={400} 
            height={300} 
            className='img'
        />

        <FullWidthGrid 
          menu = {menuList}
        />
        
      </main>
    </Fragment>
  )
}

export async function getStaticProps(){

  const menuList = await getMenuList('menulist', 'menu')

  return{
    props: {
      menuList,
    },
    revalidate: 1000
  }
}