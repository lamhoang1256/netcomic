import { IComic, IComicHistory } from "@types";
import axios from "axios";
import { IconChat, IconCheck, IconClose, IconEye, IconHeart } from "components/icons";
import { CustomLink } from "components/link";
import { LoadingSpinner } from "components/loading";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { doc, updateDoc } from "firebase/firestore";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { db } from "libs/firebase/firebase-config";
import { ComicChapters, ComicGrid, ComicImage, ComicTitle } from "modules/comic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useStore from "store/store";

const FollowPage = () => {
  const { follows, currentUser, setFollow } = useStore();
  const [loading, setLoading] = useState(true);
  const [comics, setComics] = useState<IComic[]>([]);
  const [history, setHistory] = useState<IComicHistory[]>([]);
  const handleRemoveFollow = async (slug: string) => {
    const colRef = doc(db, "users", currentUser?.uid);
    const newFollows = follows.filter((comic) => comic !== slug);
    setFollow(newFollows);
    await updateDoc(colRef, { follows: newFollows });
    toast.success("Đã hủy theo dõi truyện này!");
  };
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
  }, []);
  useEffect(() => {
    const fetchFollow = async () => {
      setLoading(true);
      const comics = await Promise.all(
        follows.map(
          async (follow: string) => (await axios.get(`${server}/api/follow/${follow}`)).data.data
        )
      );
      setComics(comics);
      setLoading(false);
    };
    fetchFollow();
  }, [follows]);
  return (
    <>
      <Head>
        <title>Truyện đang theo dõi - NetComic</title>
        <meta name="description" content="Truyện đang theo dõi - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template
          title="Truyện đang theo dõi"
          desc='Truyện chưa đọc sẽ hiển thị ở đầu danh sách, nhấn vào "Đã đọc" nếu truyện đọc rồi.'
        >
          {loading && <LoadingSpinner />}
          {!loading && (
            <ComicGrid className="mt-[10px]">
              {comics.map((comic) => {
                const comicInHistory = history.find((h) => h.title === comic.title);
                return (
                  <div key={comic.slug}>
                    <div className="relative overflow-hidden rounded aspect-[2.2/3]">
                      <div className="absolute top-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay text-center px-1">
                        {comicInHistory ? `Đọc tiếp ${comicInHistory?.chapterName}` : "Đọc ngay"}
                      </div>
                      <CustomLink href={`${PATH.comic}/${comic.slug}`}>
                        <ComicImage src={comic.posterUrl} alt={comic.slug} />
                      </CustomLink>
                      <div className="absolute bottom-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay flex items-center justify-between px-1 gap-x-[2px]">
                        <div className="flex items-center gap-x-[2px]">
                          <IconEye />
                          <span>{comic.viewCount}</span>
                        </div>
                        <div className="flex items-center gap-x-[2px]">
                          <IconChat />
                          <span>{comic.commentCount}</span>
                        </div>
                        <div className="flex items-center gap-x-[2px]">
                          <IconHeart />
                          <span>{comic.followCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-[13px]">
                      <button className="flex items-center text-[#23a903] gap-x-[2px]">
                        <IconCheck className="!w-3 !h-3" fill="#23a903" />
                        <span>Đã đọc</span>
                      </button>
                      <button
                        className="flex items-center text-rede5 gap-x-[1px]"
                        onClick={() => handleRemoveFollow(comic.slug)}
                      >
                        <IconClose className="!w-3 !h-3" fill="#e52d27" />
                        <span>Bỏ theo dõi</span>
                      </button>
                    </div>
                    <ComicTitle href={`${PATH.comic}/${comic.slug}`} className="mt-1">
                      {comic.title}
                    </ComicTitle>
                    <ComicChapters chapters={comic.chapters} />
                  </div>
                );
              })}
            </ComicGrid>
          )}
        </Template>
      </LayoutUser>
    </>
  );
};

export default FollowPage;
