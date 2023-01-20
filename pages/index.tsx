import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { useEffect, useState } from 'react';
import { getTheatre } from '@/database/collections/theatre';
import Image from 'next/image';
import { firebaseApp, getImage } from '@/database';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

interface PropType {
  data: any;
}

export default function Home({
  data
}) {
  const [img, setImg] = useState("");

  useEffect(() => {

    const getData = async () => {
      await getTheatre()
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.error(error);
        })

      await getImage("bb_0.webp")
        .then(async (response) => {
          console.log(response)
          setImg(response);
        }).catch((error) => {
          console.error(error);
        })
    }

  }, [])

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>
          <>

            <img alt="" src={img} />

          </>
        </LayoutPrimary>
      </main>
    </>
  )
}