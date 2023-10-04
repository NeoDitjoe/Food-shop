import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import { ContextProvider } from '@/usecontext/stateContext'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps, session }) {
  return (

    <SessionProvider session={session}>
      <ContextProvider>
          <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </SessionProvider>
  
  )
}
