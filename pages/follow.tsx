import { IComicFollow } from "@types";
import axios from "axios";
import { Image } from "components/image";
import { LoadingSpinner } from "components/loading";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { getFollowComics } from "libs/firebase/firebase-helper";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FollowPageProps {}

const FollowPage = ({}: FollowPageProps) => {
  const [loading, setLoading] = useState(true);
  const [comics, setComics] = useState<IComicFollow[]>([]);
  useEffect(() => {
    const fetchFollow = async () => {
      setLoading(true);
      const followedComicsId = await getFollowComics("R88yfg3aKzbfgTJ9lxptUCWjyEW2");
      const followedComics = await Promise.all(
        followedComicsId.map(
          async (follow: string) => (await axios.get(`${server}/api/follow/${follow}`)).data.data
        )
      );
      setComics(followedComics);
      setLoading(false);
    };
    fetchFollow();
  }, []);
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
            <div className="overflow-x-auto">
              <div>
                <div className="py-3 follow-grid">
                  <div className="min-w-[180px]">Tên truyện</div>
                  <div className="min-w-[100px]">Xem gần nhất</div>
                  <div className="min-w-[100px]">Chap mới nhất</div>
                </div>
                {comics.map((comic) => (
                  <div className="py-2 border-t border-graydd follow-grid" key={comic.slug}>
                    <div className="min-w-[180px] flex md:items-center gap-x-2">
                      <Link href={`${PATH.comic}/${comic.slug}`}>
                        <a className="text-sm font-semibold transition-all duration-200 text-blue29 hover:text-purpleae">
                          <Image
                            alt={comic.slug}
                            src={comic.posterUrl}
                            className="w-[50px] h-[50px] flex-shrink-0 rounded-sm object-cover object-top"
                          />
                        </a>
                      </Link>
                      <div>
                        <Link href={`${PATH.comic}/${comic.slug}`}>
                          <a className="text-sm font-semibold transition-all duration-200 text-blue29 hover:text-purpleae">
                            {comic.title}
                          </a>
                        </Link>
                        <div className="flex flex-col items-start mt-1 md:flex-row gap-y-1 gap-x-3">
                          <button className="text-xs font-semibold text-[#23a903]">Đã đọc</button>
                          <button className="text-xs font-semibold text-rede5">Bỏ theo dõi</button>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-[100px] text-xs text-left">
                      <span className="block whitespace-nowrap">Chapter 1</span>
                      <span className="block whitespace-nowrap text-[#999] italic">
                        1 phút trước
                      </span>
                    </div>
                    <div className="min-w-[100px] text-xs text-left">
                      <Link href={`${PATH.comic}/${comic.hrefNewChapter}`}>
                        <a className="block whitespace-nowrap">{comic.newChapter}</a>
                      </Link>
                      <span className="block whitespace-nowrap text-[#999] italic">
                        {comic.updatedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Template>
      </LayoutUser>
    </>
  );
};

export default FollowPage;
