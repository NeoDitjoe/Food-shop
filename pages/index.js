import FullWidthGrid from '@/components/grid'
import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import { getMenuList } from '@/database/Database'
import StateContext from '@/usecontext/stateContext'
import style from 'styles/mainIndex.module.css'

export default function Home({menuList, specials}) {

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

        <h1 className={style.heading}>Specials</h1>
        <FullWidthGrid 
          menu = {specials}
        />

        <h1 className={style.heading}>Order Now</h1>
        <FullWidthGrid 
          menu = {menuList}
        />
        
      </main>
    </Fragment>
  )
}

export async function getStaticProps(){

  const menuList = await getMenuList('menulist', 'menu')
  const specials = await getMenuList('menulist', 'specials')

  return{
    props: {
      menuList,
      specials
    },
    revalidate: 1000
  }
}