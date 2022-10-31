import { IComic } from "@types";
import axios from "axios";
import { ProtectedRoute } from "components/auth";
import { IconCheck, IconClose } from "components/icons";
import { CustomLink } from "components/link";
import { LoadingSpinner } from "components/loading";
import { Meta } from "components/meta";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { ComicAmount, ComicChapters, ComicGrid, ComicImage, ComicTitle } from "modules/comic";
import { useEffect, useState } from "react";
import useGlobalStore from "store/global-store";

const FollowPage = () => {
  const { history, follows, removeFollow } = useGlobalStore();
  const [loading, setLoading] = useState(true);
  const [comics, setComics] = useState<IComic[]>([]);
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
  useEffect(() => {
    fetchFollow();
  }, [follows]);
  return (
    <>
      <Meta
        title="Truyện đang theo dõi - NetComic"
        description="Theo dõi những bộ truyện hay nhất tại NetComic"
        image="https://i.ibb.co/VMC8pDm/preview.png"
      />
      <ProtectedRoute>
        <LayoutUser>
          <Template
            title="Truyện đang theo dõi"
            desc='Truyện chưa đọc sẽ hiển thị ở đầu danh sách, nhấn vào "Đã đọc" nếu truyện đọc rồi.'
          >
            {loading && <LoadingSpinner />}
            {!loading && comics?.length > 0 ? (
              <ComicGrid className="mt-4">
                {comics.map((comic) => {
                  const { slug, posterUrl, viewCount, title, followCount, commentCount, chapters } =
                    comic;
                  const comicInHistory = history.find((h) => h.slug === slug);
                  return (
                    <div key={slug}>
                      <div className="relative overflow-hidden rounded border border-graydd aspect-[2.2/3]">
                        <div className="absolute top-0 left-0 text-xs right-0 py-[5px] text-white bg-overlay text-center px-1">
                          {comicInHistory ? (
                            <CustomLink href={`${PATH.comic}/${comicInHistory.chapterUrl}`}>
                              Đọc tiếp {comicInHistory?.chapterName}
                            </CustomLink>
                          ) : (
                            <CustomLink href={`${PATH.comic}/${slug}`}>Đọc ngay</CustomLink>
                          )}
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
            ) : (
              <span className="block mt-3">Danh sách theo dõi đang trống!</span>
            )}
          </Template>
        </LayoutUser>
      </ProtectedRoute>
    </>
  );
};

export default FollowPage;
