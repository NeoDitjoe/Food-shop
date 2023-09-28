import Image from 'next/image'
import FullWidthGrid from '@/components/grid'
import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import { getMenuList } from '@/database/Database'
import StateContext from '@/usecontext/stateContext'

export default function Home({menuList}) {

  const { setOptions } = StateContext()

  useEffect(() => {
    setOptions(menuList)
  })

  return (
    <Fragment>
      <Head>
        <title>BOBO</title>
        <meta name='description' content=''/>
      </Head>

      <main>

        <Image 
            src={'https://i.pinimg.com/564x/a5/a7/0d/a5a70dd6d45f21688b18deeac7553efd.jpg'} 
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

  const menuList = await getMenuList('menu')

  return{
    props: {
      menuList,
    },
    revalidate: 1000
  }
}