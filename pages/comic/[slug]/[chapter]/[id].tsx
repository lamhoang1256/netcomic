import { IComicHistory, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import axios from "axios";
import { Button } from "components/button";
import { CommentAddNew, CommentFilter, CommentList } from "components/comment";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDown,
  IconHeart,
  IconHome,
  IconList,
} from "components/icons";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { ModalChapters } from "components/modal";
import { server } from "configs/server";
import { getImage } from "constants/image";
import { LocalStorage } from "constants/localStorage";
import { PATH } from "constants/path";
import { doc, increment, updateDoc } from "firebase/firestore";
import useModal from "hooks/useModal";
import LayoutHome from "layouts/LayoutHome";
import { auth, db } from "libs/firebase/firebase-config";
import { ComicImage } from "modules/comic";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useGlobalStore from "store/global-store";
import classNames from "utils/classNames";

interface ReadComicPageProps {
  imageUrls: IImageReading[];
  info: IDetailsChapter;
  chapters: ILinkChapter[];
}

const ReadComicPage = ({ imageUrls, chapters, info }: ReadComicPageProps) => {
  const router = useRouter();
  const { slug, chapter, id } = router.query;
  const { isShow, toggleModal } = useModal();
  let { follows, removeFollow, addFollow, setHistory } = useGlobalStore();
  const hasFollowed = follows.some((comic) => comic === slug);
  const handleToggleFollow = () => {
    hasFollowed ? removeFollow(slug as string) : addFollow(slug as string);
  };
  const handleSaveHistory = () => {
    let history: IComicHistory[] = JSON.parse(localStorage.getItem(LocalStorage.history) || "[]");
    let comic: IComicHistory = {} as IComicHistory;
    let existComic = history.find((comic) => comic.slug === slug);
    comic.id = id as string;
    comic.slug = slug as string;
    comic.title = info.title;
    comic.chapterName = info.chapter;
    comic.posterUrl = info.posterUrl;
    comic.chapterUrl = `${slug}/${chapter}/${id}`;
    comic.chapters = [id as string];
    if (existComic) {
      const oldChapters = existComic.chapters;
      const hasRead = oldChapters.includes(id as string);
      comic.chapters = hasRead ? oldChapters : [...oldChapters, id as string];
      history = history.filter((comic: IComicHistory) => comic.slug !== slug);
    }
    history.unshift(comic);
    if (history.length >= 30) history = history.slice(0, 30);
    setHistory(history);
  };

  const handleLevelUp = async () => {
    try {
      if (!auth.currentUser) return;
      const colRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(colRef, { score: increment(1) });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    handleSaveHistory();
    handleLevelUp();
  }, [slug, chapter, id]);

  const currentChapter = chapters.findIndex((chapter) => chapter.id === router.query.id);
  return (
    <LayoutHome className="bg-bgdark">
      <Meta
        title={`${info.title} - NetComic`}
        description={`Đọc truyện tranh ${info.title} Tiếng Việt bản đẹp chất lượng cao, cập nhật nhanh và sớm nhất tại NetComic`}
        image={info.posterUrl}
      />
      <div className="layout-container">
        <section className="lg:rounded-lg bg-bglight dark:bg-bgdark">
          <div className="py-4 text-center">
            <h1 className="flex-wrap text-[22px] gap-1 flex items-center justify-center">
              <CustomLink
                href={`${PATH.comic}/${slug}`}
                className="text-[22px] transition-all duration-200 dark:text-white text-[#0073f4] hover:text-purpleae"
              >
                {info.title}
              </CustomLink>
              <span>-</span>
              <span>{info.chapter}</span>
            </h1>
            <span className="block mt-[6px] italic text-gray8a dark:text-[#c0c0c0]">
              {info.updatedAt}
            </span>
          </div>
          <div className="flex items-center justify-center pb-4 gap-x-3">
            <CustomLink href={PATH.home}>
              <IconHome fill="#d9534f" />
            </CustomLink>
            <CustomLink href={`${PATH.comic}/${slug}`}>
              <IconList fill="#d9534f" />
            </CustomLink>
            <div className="flex items-center flex-grow w-1/3 md:flex-grow-0 gap-x-1">
              <CustomLink
                href={`${PATH.comic}/${chapters[currentChapter + 1]?.href}`}
                className={classNames(
                  "w-[34px] h-[34px] flex items-center justify-center rounded-l",
                  !chapters[currentChapter + 1] && "pointer-events-none",
                  currentChapter === chapters.length - 1 ? "bg-black opacity-30 " : "bg-[#d9534f]"
                )}
              >
                <IconChevronLeft fill="#fff" />
              </CustomLink>
              <div
                onClick={toggleModal}
                className="h-9 cursor-pointer px-2 rounded-sm flex items-center justify-between border border-[#ccc] flex-grow"
              >
                <span>{info?.chapter}</span>
                <IconDown />
              </div>
              <CustomLink
                href={`${PATH.comic}/${chapters[currentChapter - 1]?.href}`}
                className={classNames(
                  "w-[34px] h-[34px] flex items-center justify-center rounded-r",
                  !chapters[currentChapter - 1] && "pointer-events-none",
                  currentChapter === 0 ? "bg-black opacity-30 " : "bg-[#d9534f]"
                )}
              >
                <IconChevronRight fill="#fff" />
              </CustomLink>
            </div>
            <Button
              className={classNames(
                "flex items-center gap-x-1 text-white",
                hasFollowed ? "bg-[#d9534f]" : "bg-[#5cb85c]"
              )}
              onClick={handleToggleFollow}
            >
              <IconHeart className="w-[18px] h-[18px]" />
              <span className="hidden md:block">{hasFollowed ? "Hủy theo dõi" : "Theo dõi"}</span>
            </Button>
          </div>
          <ModalChapters isShow={isShow} toggleModal={toggleModal} chapters={chapters} />
        </section>
      </div>
      <div className="pt-3 bg-bgdark">
        {imageUrls.map((image) => (
          <ComicImage
            key={image.imageUrl}
            src={getImage(image.imageUrl)}
            alt={image.alt}
            className="mx-auto w-[unset]"
          />
        ))}
      </div>
      <div className="flex items-center justify-center py-4 gap-x-2">
        <Button
          to={`${PATH.comic}/${chapters[currentChapter + 1]?.href}`}
          className={classNames(
            "bg-[#d9534f] flex items-center gap-x-1 text-white hover:bg-[#AB2925]",
            !chapters[currentChapter + 1] && "pointer-events-none opacity-70 cursor-not-allowed"
          )}
        >
          <IconChevronLeft className="!w-3 !h-3" fill="#fff" />
          <span>Chap trước</span>
        </Button>
        <Button
          to={`${PATH.comic}/${chapters[currentChapter - 1]?.href}`}
          className={classNames(
            "bg-[#d9534f] flex items-center gap-x-1 text-white hover:bg-[#AB2925]",
            !chapters[currentChapter - 1] && "pointer-events-none opacity-70 cursor-not-allowed"
          )}
        >
          <span>Chap sau</span>
          <IconChevronRight className="!w-3 !h-3" fill="#fff" />
        </Button>
      </div>
      <div className="mx-auto max-w-[1000px] p-5 lg:rounded-lg bg-bglight dark:bg-bgdark">
        <CommentAddNew poster={info.posterUrl} title={info.title} />
        <CommentFilter />
        <CommentList />
      </div>
    </LayoutHome>
  );
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as string;
  const chapter = params?.chapter as string;
  const id = params?.id as string;
  const { imageUrls, info, chapters } = (
    await axios.get(`${server}/api/comic/${slug}/${chapter}/${id}`)
  ).data.data;
  return {
    props: {
      imageUrls,
      info,
      chapters,
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
