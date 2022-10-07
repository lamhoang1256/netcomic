import { IComment, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import axios from "axios";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDown,
  IconHeart,
  IconHome,
  IconList,
} from "components/icons";
import { ModalChapterList } from "components/modal";
import { server } from "configs/server";
import { getImage } from "constants/image";
import { PATH } from "constants/path";
import useModal from "hooks/useModal";
import LayoutHome from "layouts/LayoutHome";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

interface ReadComicPageProps {
  imageUrls: IImageReading[];
  info: IDetailsChapter;
  comments: IComment[];
  chapters: ILinkChapter[];
}

const ReadComicPage = ({ imageUrls, chapters, info, comments }: ReadComicPageProps) => {
  const { isShow, toggleModal } = useModal();
  return (
    <>
      <Head>
        <title>
          {info?.title} {info?.chapter}
        </title>
        <meta name="description" content="Trang chi tiết truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome className="bg-black">
        <section className="bg-[#f9f9f9] layout-container">
          <div className="flex flex-wrap py-4 lg:items-center gap-x-2">
            <h1 className="text-xl transition-all duration-200 text-[#0073f4]  hover:text-purpleae">
              {info.title}
            </h1>
            <span className="text-xl font-medium">- {info.chapter}</span>
            <span className="italic text-gray8a">{info.updatedAt}</span>
          </div>
          <div className="flex items-center justify-center pb-4 gap-x-3">
            <Link href={PATH.home}>
              <a>
                <IconHome fill="#d9534f" />
              </a>
            </Link>
            <Link href={PATH.home}>
              <a>
                <IconList fill="#d9534f" />
              </a>
            </Link>
            <div className="flex items-center flex-grow w-1/3 md:flex-grow-0 gap-x-1">
              <button className="w-[34px] h-[34px] flex items-center justify-center bg-black opacity-30 rounded-l">
                <IconChevronLeft fill="#fff" />
              </button>
              <div
                onClick={toggleModal}
                className="h-9 cursor-pointer px-2 rounded-sm flex items-center justify-between border border-[#ccc] flex-grow"
              >
                <span>{info?.chapter}</span>
                <IconDown />
              </div>
              <button className="w-[34px] h-[34px] flex items-center justify-center bg-black opacity-30 rounded-r">
                <IconChevronRight fill="#fff" />
              </button>
            </div>
            <button className="px-3 h-[34px] bg-[#5cb85c] hover:opacity-80 transition-all duration-200 flex items-center gap-x-1 text-white rounded">
              <IconHeart className="w-[18px] h-[18px]" />
              <span className="hidden md:block">Theo dõi</span>
            </button>
          </div>
          <ModalChapterList isShow={isShow} toggleModal={toggleModal} chapters={chapters} />
        </section>
        <div className="pt-3">
          {imageUrls.map((image) => (
            <picture key={image.imageUrl}>
              <source srcSet={getImage(image.imageUrl)} type="image/webp" />
              <img
                alt={image.alt}
                src={getImage(image.imageUrl)}
                className="object-cover mx-auto"
              />
            </picture>
          ))}
        </div>
      </LayoutHome>
    </>
  );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { slug, chapter, id } = query;
  const { imageUrls, info, chapters, comments } = (
    await axios.get(`${server}/api/comic/${slug}/${chapter}/${id}`)
  ).data.data;
  return {
    props: {
      imageUrls,
      info,
      chapters,
      comments,
    },
  };
}

export default ReadComicPage;
