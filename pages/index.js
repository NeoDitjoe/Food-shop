import Image from 'next/image'
import FullWidthGrid from '@/components/grid'
import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import {  getMenuList } from '@/database/Database'
import StateContext from '@/usecontext/stateContext'
import style from 'styles/mainIndex.module.css'
import image from 'public/homepageImg.jpeg'

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
      <div className={style.welcome}>
        <h1>Welcome to BOBO <br/> Your Culinary Destination!</h1>
      </div>

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