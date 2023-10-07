import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import { ContextProvider } from '@/usecontext/stateContext'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

export default function App({ Component, pageProps, session }) {
  return (

    <SessionProvider session={session}>
      <ContextProvider>
          <Layout>

          <Head>
            <meta name="description" content="Delicious food at BOBO. Visit us at North west Luka for a wide range of mouthwatering dishes, from Chips to sphathlo. We offer takeout services. Explore our menu and savor the flavors today."></meta>
          </Head>

          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </SessionProvider>
  
  )
}
