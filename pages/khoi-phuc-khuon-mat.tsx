import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";
import Chip from "../components/Chip";
import { CompareSlider } from "../components/CompareSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputUploader from "../components/InputUploader";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Toggle from "../components/Toggle";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import getBase64 from "../utils/getBase64";

const Home: NextPage = () => {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newPhoto = await res.json();
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      setRestoredImage(newPhoto);
    }
    setLoading(false);
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Khôi phục ảnh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mt- sm:mb-0 mb-8">
        {/* <WatchTutorial /> */}
        <Chip className="text-red-500">
          Hệ thống hiện tại <span className="font-semibold">đang bảo trì</span>{" "}
          và sẽ quay lại hoạt động sau vài ngày.
        </Chip>
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl my-5">
          Khôi phục{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br to-[#6A3DE8] from-[#536DFE]">
            bất kỳ
          </span>{" "}
          ảnh cũ nào
        </h1>
        {/* <PhotosGeneratedCountUp /> */}
        <ResizablePanel>
          <AnimatePresence exitBeforeEnter>
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              <Toggle
                className={`${restoredLoaded ? "visible mb-6" : "invisible"}`}
                sideBySide={sideBySide}
                setSideBySide={(newVal) => setSideBySide(newVal)}
              />
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}
              {!originalPhoto && (
                <InputUploader
                  onChange={async (event) => {
                    if (!event.currentTarget.files?.length) return;
                    try {
                      const file = event.currentTarget.files[0];
                      const imageBase64 = await getBase64(file);
                      if (typeof imageBase64 === "string") {
                        setPhotoName(file.name);
                        setOriginalPhoto(imageBase64);
                        await generatePhoto(imageBase64);
                      } else {
                        console.log({ imageBase64 });
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                />
              )}
              {originalPhoto && !restoredImage && (
                <Image
                  unoptimized
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl"
                  width={475}
                  height={475}
                />
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Ảnh gốc</h2>
                    <Image
                      unoptimized
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-1 font-medium text-lg">
                      Ảnh đã khôi phục
                    </h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image
                        unoptimized
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in"
                        width={475}
                        height={475}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}
              {loading && (
                <button
                  disabled
                  className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 hover:bg-black/80 w-40"
                >
                  <span className="pt-4">
                    <LoadingDots color="white" style="large" />
                  </span>
                </button>
              )}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <div className="flex sm:space-x-2 justify-center sm:flex-row flex-col mt-4">
                {originalPhoto && !loading && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="bg-black rounded-full text-white font-medium px-4 py-2 mt-4 hover:bg-black/80 transition"
                  >
                    Khôi phục ảnh khác
                  </button>
                )}
                {restoredLoaded && (
                  <button
                    onClick={() => {
                      downloadPhoto(
                        restoredImage!,
                        appendNewToName(photoName!)
                      );
                    }}
                    className="bg-white rounded-full text-black border font-medium px-4 py-2 mt-4 hover:bg-gray-100 transition"
                  >
                    Tải về ảnh đã khôi phục
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

function WatchTutorial() {
  return (
    <a
      href="https://youtu.be/FRQtFDDrUXQ"
      target="_blank"
      rel="noreferrer"
      className="border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out"
    >
      Are you a developer and want to learn how I built this? Watch the{" "}
      <span className="font-bold">YouTube tutorial</span>.
    </a>
  );
}

function PhotosGeneratedCountUp() {
  return (
    <p className="text-slate-500">
      {" "}
      {/* Obtained this number from Vercel: based on how many serverless invocations happened. */}
      <CountUp start={100000} end={325321} duration={2} separator="," /> photos
      generated and counting.
    </p>
  );
}

export default Home;
