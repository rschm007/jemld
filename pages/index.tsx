import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { app } from '@/database/firebase';
import { useEffect } from 'react';
import { getTheatre } from '@/database/theatre/theatre';

interface PropType {
  data: any;
}

export default function Home({
  data
}) {

  useEffect(() => {
    getTheatre().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    })
  }, [])

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

        </LayoutPrimary>
      </main>
    </>
  )
}

// @ts-ignore
// export async function getServerSideProps({ req, res }) {

//   const data = await app.content.get({ schemaKey: 'theatre' })
//     .then((response) => {
//       console.log(response)
//       return response;
//     }).catch((error) => {
//       console.error(error);
//     })

//   return {
//     props: {
//       data
//     }
//   }
// }