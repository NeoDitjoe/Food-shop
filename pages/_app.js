import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import { ContextProvider } from '@/usecontext/stateContext'

export default function App({ Component, pageProps }) {
  return (

    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  
  )
}
