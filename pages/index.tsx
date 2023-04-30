import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { getContent } from '@/database';
import { PanelImage } from '@/components/Images/PanelImage';
import { useState } from 'react';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';

interface PropType {
  contentData: any;
  dancePanelData: any;
  theatrePanelData: any;
  processContentData: any;
  imagesData: any;
}

export const Home = ({
  contentData,
  dancePanelData,
  theatrePanelData,
  processContentData,
  imagesData
}: PropType) => {
  const [dancePanel, setDancePanel] = useState(dancePanelData);
  const [theatrePanel, setTheatrePanel] = useState(theatrePanelData);
  const [processPanel, setProcessPanel] = useState(processContentData);
  const [images, setImages] = useState(imagesData);

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="mt-48 min-h-screen">
            <div className="md:grid md:grid-cols-3 gap-x-2 ">
              {dancePanel && (
                <PanelImage
                  src={images[0]}
                  alt="Dance"
                  title="Dance"
                  href="portfolio/design/dance"
                />
              )}

              {theatrePanel &&
                <PanelImage
                  src={images[1]}
                  alt="Theatre"
                  title="Theatre"
                  href="portfolio/design/theatre"
                />
              }

              {processPanel && (
                <PanelImage
                  src={"/images/process/r&j_lighting pckgpdf-1.png"}
                  alt="Process"
                  title="Process"
                  href="portfolio/process"
                />
              )}
            </div>

          </section>

        </LayoutPrimary>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const contentData = await getContent();
  const danceContentData = [];
  const theatreContentData = [];
  const processContentData = [];

  contentData.forEach((x) => {
    if (x._fl_meta_.schema === "dance") {
      danceContentData.push(x);
    } else if (x._fl_meta_.schema === "theatre") {
      theatreContentData.push(x);
    }
  })

  const imageIds = [];
  const imageNames = [];

  let dancePanelData = null;
  await danceContentData.filter(async (d) => {
    await d.imageGallery.forEach(async (x) => {
      if (x.hasOwnProperty('mainCatImage')) {
        dancePanelData = x;
        if (x?.title && !imageIds.includes(d.imageNameId) && imageNames.length < 1) {
          imageIds.push(d.imageNameId);
          imageNames.push(x.title)
        }
      }
    });
  })

  let theatrePanelData = null;
  await theatreContentData.filter(async (d) => {
    await d.imageGallery.forEach(async (x) => {
      if (x.hasOwnProperty('mainCatImage')) {
        theatrePanelData = x;
        if (x?.title && !imageIds.includes(d.imageNameId) && imageNames.length < 2) {
          imageIds.push(d.imageNameId);
          imageNames.push(x.title)
        }
      }
    });
  })

  await contentData.filter(async (c) => {
    if (c?.processFiles != null || undefined && c?.processFiles.length > 0) {
      await processContentData.push(c);

      if (c?.processFiles[0]?.title && imageNames.length < 3) {
        await imageIds.push(c.imageNameId)
        await imageNames.push(c.processFiles[0].title);
      }
    }
  })

  let images = [];
  await imageNames.forEach((x) => {
    const storage = getStorage();
    const imageRef = ref(storage, `flamelink/media/${x}`)
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
      dancePanelData: dancePanelData,
      theatrePanelData: theatrePanelData,
      processContentData: processContentData,
      imagesData: imagesData
    }
  }
}

export default Home;