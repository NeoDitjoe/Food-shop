import Image from 'next/image'
import { Inter } from 'next/font/google'
import FullWidthGrid from '@/components/grid'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      {/* <h1>this should work</h1> */}
      <FullWidthGrid/>
    </main>
  )
}
