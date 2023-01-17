import Head from 'next/head'
import { Inter } from '@next/font/google'
import { LayoutPrimary } from '@/components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
        <meta name="description" content="Lighting Design | Jem Design | California" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

        </LayoutPrimary>
      </main>
    </>
  )
}
