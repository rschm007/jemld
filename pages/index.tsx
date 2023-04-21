import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { getContentBySchemaName, getHomePageContentData } from '@/database';
import { PanelImage } from '@/components/Images/PanelImage';
import { useState } from 'react';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';

interface PropType {
  contentData: any;
  imagesData: any;
}

export const Home = ({
  contentData,
  imagesData
}: PropType) => {
  const [content] = useState(contentData);
  const [images] = useState(imagesData);

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="mt-48 min-h-screen">
            <div className="md:grid md:grid-cols-4 gap-x-2 ">
              {content.map((x, i) => (
                <PanelImage
                  key={i}
                  src={images[i]}
                  alt={x.category}
                  title={x.category}
                  href={`portfolio/${x.category}`}
                />
              ))}
            </div>

          </section>

        </LayoutPrimary>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const content = await getContentBySchemaName("homepageImages");
  const contentData = await getHomePageContentData(content);

  let images = [];
  await contentData.forEach((x) => {
    const storage = getStorage();
    const imageRef = ref(storage, `flamelink/media/${x.imageName}`)
    const url = getDownloadURL(imageRef).then((res) => {
      if (res) {
        return res;
      }
    }).catch((error) => {
      console.error(error);
      return null;
    });
    images.push(url);
  })

  const imagesData = await Promise.all(images);

  return {
    props: {
      contentData: contentData,
      imagesData: imagesData
    }
  }
}

export default Home;