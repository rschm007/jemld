import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { useEffect } from 'react';
import { getContent, getSocialMedia } from '@/database';
import { socialsAtom } from '@/state/socials';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils'

interface PropType {
  contentData: any;
}

export const Home = ({
  contentData
}: PropType) => {

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="space-y-2 mt-48">
            {/* {imgNames.map((img, i) => (
              <BannerImage
                key={i}
                src={imgUrls[i]}
                alt={img.title}
                title={img.title}
              />
            ))} */}
          </section>

        </LayoutPrimary>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const contentData = await getContent();

  return {
    props: {
      contentData: contentData
    }
  }
}

export default Home;