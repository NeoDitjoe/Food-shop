import Image from 'next/image'
import FullWidthGrid from '@/components/grid'
import { Fragment } from 'react'
import Head from 'next/head'


export default function Home() {
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
            width={800} 
            height={800} 
            className='img'
        />

        <FullWidthGrid/>
        
      </main>
    </Fragment>
  )
}
