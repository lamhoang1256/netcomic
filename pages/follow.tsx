import { IComic, IComicHistory } from "@types";
import axios from "axios";
import { IconCheck, IconClose } from "components/icons";
import { CustomLink } from "components/link";
import { LoadingSpinner } from "components/loading";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { doc, updateDoc } from "firebase/firestore";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { db } from "libs/firebase/firebase-config";
import { ComicAmount, ComicChapters, ComicGrid, ComicImage, ComicTitle } from "modules/comic";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";

const FollowPage = () => {
  const { history, follows, removeFollow } = useGlobalStore();
  const [loading, setLoading] = useState(true);
  const [comics, setComics] = useState<IComic[]>([]);
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
                const { slug, posterUrl, viewCount, title, followCount, commentCount, chapters } =
                  comic;
                const comicInHistory = history.find((h) => h.slug === slug);
                return (
                  <div key={slug}>
                    <div className="relative overflow-hidden rounded aspect-[2.2/3]">
                      <div className="absolute top-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay text-center px-1">
                        {comicInHistory ? `Đọc tiếp ${comicInHistory?.chapterName}` : "Đọc ngay"}
                      </div>
                      <CustomLink href={`${PATH.comic}/${slug}`}>
                        <ComicImage src={posterUrl} alt={slug} />
                      </CustomLink>
                      <ComicAmount view={viewCount} comment={commentCount} follow={followCount} />
                    </div>
                    <div className="flex justify-between mt-2 text-[13px]">
                      <button className="flex items-center text-[#23a903] gap-x-[2px]">
                        <IconCheck className="!w-3 !h-3" fill="#23a903" />
                        <span>Đã đọc</span>
                      </button>
                      <button
                        className="flex items-center text-rede5 gap-x-[1px]"
                        onClick={() => removeFollow(slug)}
                      >
                        <IconClose className="!w-3 !h-3" fill="#e52d27" />
                        <span>Bỏ theo dõi</span>
                      </button>
                    </div>
                    <ComicTitle href={`${PATH.comic}/${slug}`} className="mt-1">
                      {title}
                    </ComicTitle>
                    <ComicChapters chapters={chapters} comicInHistory={comicInHistory} />
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
