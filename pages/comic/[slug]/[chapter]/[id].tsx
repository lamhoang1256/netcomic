import { IComicHistory, IComment, IDetailsChapter, IImageReading, ILinkChapter } from "@types";
import axios from "axios";
import { Button } from "components/button";
import { CommentAddNew, CommentFilter, CommentItem } from "components/comment";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDown,
  IconHeart,
  IconHome,
  IconList,
} from "components/icons";
import { CustomLink } from "components/link";
import { ModalChapters } from "components/modal";
import { server } from "configs/server";
import { commentStatus } from "constants/global";
import { getImage } from "constants/image";
import { LocalStorage } from "constants/localStorage";
import { PATH } from "constants/path";
import { collection, doc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import useModal from "hooks/useModal";
import LayoutHome from "layouts/LayoutHome";
import { auth, db } from "libs/firebase/firebase-config";
import { ComicImage } from "modules/comic";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useGlobalStore from "store/global-store";
import classNames from "utils/classNames";

// Cấp 1 -> Cấp 2 =10 chap,Cấp 2 -> Cấp 3 =100 chap,Cấp 3 -> Cấp 4 =1000 chap,Cấp 4 -> Cấp 5=10000 chap,Cấp 5 -> Cấp 6 =100000 chap,Cấp 6 -> Cấp 7 =1000000 chap,Cấp 7 -> Cấp 8 =10000000 chap,Cấp 8 -> Cấp 9 =100000000 chap,Cấp 9 -> Cấp Max =1 Tỉ chap
interface ReadComicPageProps {
  imageUrls: IImageReading[];
  info: IDetailsChapter;
  chapters: ILinkChapter[];
}

const ReadComicPage = ({ imageUrls, chapters, info }: ReadComicPageProps) => {
  const router = useRouter();
  const { slug, chapter, id } = router.query;
  const { isShow, toggleModal } = useModal();
  const [comments, setComments] = useState<IComment[]>([]);

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
    async function getComments() {
      const colRef = collection(db, "comments");
      const q = query(colRef, where("status", "==", commentStatus.APPROVED));
      const querySnapshot = await getDocs(q);
      let result: any[] = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setComments(result);
    }
    getComments();
  }, []);

  useEffect(() => {
    handleSaveHistory();
    handleLevelUp();
  }, [slug, chapter, id]);

  const currentChapter = chapters.findIndex((chapter) => chapter.id === router.query.id);
  return (
    <>
      <Head>
        <title>
          {info?.title} {info?.chapter}
        </title>
        <meta name="description" content="Trang chi tiết truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <section className="bg-[#f9f9f9] layout-container rounded">
          <div className="py-4 text-center">
            <h1 className="text-[22px] transition-all duration-200 text-[#0073f4]  hover:text-purpleae">
              {info.title}
              <span className="font-medium text-black"> - {info.chapter}</span>
            </h1>
            <span className="block mt-[6px] italic text-gray8a">{info.updatedAt}</span>
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
              className="bg-[#5cb85c] flex items-center gap-x-1 text-white"
              onClick={handleToggleFollow}
            >
              <IconHeart className="w-[18px] h-[18px]" />
              <span className="hidden md:block">{hasFollowed ? "Đã theo dõi" : "Theo dõi"}</span>
            </Button>
          </div>
          <ModalChapters isShow={isShow} toggleModal={toggleModal} chapters={chapters} />
        </section>
        <div className="pt-3 bg-black">
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
        <div className="layout-container">
          <CommentAddNew />
          <CommentFilter />
          <div>
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </LayoutHome>
    </>
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
