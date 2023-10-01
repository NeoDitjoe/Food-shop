import Image from 'next/image'
import FullWidthGrid from '@/components/grid'
import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import { connectDatabase, getMenuList } from '@/database/Database'
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

  const menuList = await getMenuList('menu')
  const connect = await connectDatabase('menulist')

  const db = connect.db();
  
  const documents = await db
    .collection('menu')
    .find()
    .toArray();
    
  const menuLists = documents.map((doc) => {
    const { _id, ...menuData } = doc;
    return menuData;
  });

  return{
    props: {
      menuList,
    },
    revalidate: 1000
  }
}