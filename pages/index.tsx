import Head from 'next/head'
import { Inter } from '@next/font/google'
import { LayoutPrimary } from '@/components'
import { apiUrl, app, db } from '@/database/firebase';
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

interface PropType {
  data: any;
}

export default function Home({
  data
}) {
  console.log(data)

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
        {/* adobe fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/tng3whk.css" />
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

        </LayoutPrimary>
      </main>
    </>
  )
}

// @ts-ignore
export async function getServerSideProps({ req, res }) {

  const data = await app.content.get({ schemaKey: 'theatre' })
    .then((response) => {
      return response;
    }).catch((error) => {
      console.error(error);
    })

  return {
    props: {
      data
    }
  }
}