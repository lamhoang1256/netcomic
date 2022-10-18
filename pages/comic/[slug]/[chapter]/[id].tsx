import { IComicHistory, IComment, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import axios from "axios";
import { Button } from "components/button";
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
import { ComicImage } from "modules/comic";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import classNames from "utils/classNames";

interface ReadComicPageProps {
  imageUrls: IImageReading[];
  info: IDetailsChapter;
  comments: IComment[];
  chapters: ILinkChapter[];
}

const ReadComicPage = ({ imageUrls, chapters, info, comments }: ReadComicPageProps) => {
  const { query } = useRouter();
  const { slug, chapter, id } = query;
  const { isShow, toggleModal } = useModal();
  const handleSaveHistory = async () => {
    const history: IComicHistory[] = JSON.parse(localStorage.getItem("history") || "[]");
    const hasSeen = history.some((item) => item.slug === slug);
    if (!hasSeen) {
      const { data } = (await axios.get(`${server}/api/comic/${slug}`)).data;
      const historyComic = {
        id: id as string,
        slug: slug as string,
        title: info.title,
        chapterName: info.chapter,
        posterUrl: data.info.posterUrl,
        chapterUrl: `${slug}/${chapter}/${id}`,
        chapters: [id as string],
      };
      localStorage.setItem("history", JSON.stringify([historyComic, ...history]));
      return;
    }
    let existComic = history.find((item: IComicHistory) => item.slug === slug);
    if (!existComic) return;
    const hasRead = existComic.chapters.includes(id as string);
    const historyComic = {
      ...existComic,
      chapterName: info.chapter,
      chapters: hasRead ? existComic.chapters : [...existComic.chapters, id as string],
      id: id as string,
      chapterUrl: `${slug}/${chapter}/${id}`,
    };
    const newHistory = history.filter((item: IComicHistory) => item.slug !== slug);
    localStorage.setItem("history", JSON.stringify([historyComic, ...newHistory]));
  };
  useEffect(() => {
    handleSaveHistory();
  }, [slug, chapter, id]);

  const currentChapter = chapters.findIndex((chapter) => chapter.id === query.id);
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
        <section className="bg-[#f9f9f9] layout-container rounded">
          <div className="py-4 text-center">
            <h1 className="text-[22px] transition-all duration-200 text-[#0073f4]  hover:text-purpleae">
              {info.title}
              <span className="font-medium text-black"> - {info.chapter}</span>
            </h1>
            <span className="block mt-[6px] italic text-gray8a">{info.updatedAt}</span>
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
              <Link href={`${PATH.comic}/${chapters[currentChapter + 1]?.href}`}>
                <a
                  className={classNames(
                    "w-[34px] h-[34px] flex items-center justify-center rounded-l",
                    !chapters[currentChapter + 1] && "pointer-events-none",
                    currentChapter === chapters.length - 1 ? "bg-black opacity-30 " : "bg-[#d9534f]"
                  )}
                >
                  <IconChevronLeft fill="#fff" />
                </a>
              </Link>
              <div
                onClick={toggleModal}
                className="h-9 cursor-pointer px-2 rounded-sm flex items-center justify-between border border-[#ccc] flex-grow"
              >
                <span>{info?.chapter}</span>
                <IconDown />
              </div>
              <Link href={`${PATH.comic}/${chapters[currentChapter - 1]?.href}`}>
                <a
                  className={classNames(
                    "w-[34px] h-[34px] flex items-center justify-center rounded-r",
                    !chapters[currentChapter - 1] && "pointer-events-none",
                    currentChapter === 0 ? "bg-black opacity-30 " : "bg-[#d9534f]"
                  )}
                >
                  <IconChevronRight fill="#fff" />
                </a>
              </Link>
            </div>
            <Button className="bg-[#5cb85c] flex items-center gap-x-1 text-white">
              <IconHeart className="w-[18px] h-[18px]" />
              <span className="hidden md:block">Theo dõi</span>
            </Button>
          </div>
          <ModalChapterList isShow={isShow} toggleModal={toggleModal} chapters={chapters} />
        </section>
        <div className="pt-3">
          {imageUrls.map((image) => (
            <ComicImage
              key={image.imageUrl}
              src={getImage(image.imageUrl)}
              alt={image.alt}
              className="mx-auto w-[unset]"
            />
          ))}
        </div>
        <div className="flex items-center justify-center py-4 bg-[#f9f9f9] gap-x-2">
          <Button
            to={`${PATH.comic}/${chapters[currentChapter + 1]?.href}`}
            className={classNames(
              "bg-[#d9534f] flex items-center gap-x-1 text-white hover:bg-[#AB2925]",
              !chapters[currentChapter + 1] && "pointer-events-none opacity-70 cursor-not-allowed"
            )}
          >
            <IconChevronLeft className="!w-3 !h-3" fill="#fff" />
            <span className="hidden md:block">Chap trước</span>
          </Button>
          <Button
            to={`${PATH.comic}/${chapters[currentChapter - 1]?.href}`}
            className={classNames(
              "bg-[#d9534f] flex items-center gap-x-1 text-white hover:bg-[#AB2925]",
              !chapters[currentChapter - 1] && "pointer-events-none opacity-70 cursor-not-allowed"
            )}
          >
            <span className="hidden md:block">Chap sau</span>
            <IconChevronRight className="!w-3 !h-3" fill="#fff" />
          </Button>
        </div>
      </LayoutHome>
    </>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as string;
  const chapter = params?.chapter as string;
  const id = params?.id as string;
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
    revalidate: 300,
  };
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ReadComicPage;
