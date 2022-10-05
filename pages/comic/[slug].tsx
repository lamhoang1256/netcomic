import axios from "axios";
import { Heading } from "components/text";
import { server } from "configs/server";
import LayoutHome from "layouts/LayoutHome";
import { ComicChartRanking } from "modules/comic";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { IComicInfo } from "types";

interface ComicDetailsPageProps {
  info: IComicInfo;
}

const ComicDetailsPage = ({ info }: ComicDetailsPageProps) => {
  return (
    <>
      <Head>
        <title>Trang chi tiết truyện</title>
        <meta name="description" content="Trang chi tiết truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        ComicPage
        {/* <section className="max-w-[1030px] py-[15px] bg-[#f9f9f9] mx-auto">
          <div className="flex flex-col lg:flex-row gap-5 px-[15px]">
            <div className="lg:w-2/3">
              <div className="text-center">
                <h1 className="text-[21px] uppercase">{info?.title}</h1>
                <span className="inline-block mt-1 opacity-70 text-[13px] italic">
                  {info.updatedAt}
                </span>
              </div>
              <div className="md:flex gap-x-[15px] mt-5">
                <div className="md:w-[30%] mx-auto aspect-[2/3] w-[180px]">
                  <picture>
                    <source srcSet={info.posterUrl} type="image/webp" />
                    <img alt={info.title} src={info.posterUrl} className="object-cover rounded" />
                  </picture>
                </div>
                <div className="md:w-[70%] text-[#777676]">
                  <ul>
                    <li className="flex mb-2 text-base">
                      <div className="w-1/3">Tác giả</div>
                      <div className="flex-1">{info.author}</div>
                    </li>
                    <li className="flex mb-2 text-base">
                      <div className="w-1/3">Tình trạng</div>
                      <div className="flex-1">{info.status}</div>
                    </li>
                    <li className="flex mb-2 text-base">
                      <div className="w-1/3">Thể loại</div>
                      <div className="flex-1">
                        {info.categories.split(" - ").map((category, index) => (
                          <Link href="/" key={category}>
                            <a className="mr-1 transition-all duration-200 text-blue33 hover:text-purpleae">
                              {info.categories.split(" - ").length === index + 1
                                ? category
                                : category + " - "}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </li>
                    <li className="flex mb-2 text-base">
                      <div className="w-1/3">Lượt xem</div>
                      <div className="flex-1">{info.viewCount}</div>
                    </li>
                    <li>
                      <a className="mr-2 transition-all duration-200 text-blue33 hover:text-purpleae">
                        {info.title}
                      </a>
                      Xếp hạng: {info.ratingValue}/5 - {info.ratingCount} Lượt đánh giá.
                    </li>
                    <li className="flex items-center mt-[10px] gap-x-2">
                      <button className="px-5 py-2 bg-[#5cb85c] text-white rounded">
                        Theo dõi
                      </button>
                      <span className="text-[15px]">
                        <b className="text-black">{info.followCount}</b> Lượt theo dõi
                      </span>
                    </li>
                    <li className="flex items-center mt-[10px] gap-x-2">
                      <button className="px-5 py-2 bg-[#ec971f] hover:bg-[#d58512] transition-all duration-200 text-white rounded">
                        Đọc từ đầu
                      </button>
                      <button className="px-5 py-2 bg-[#ec971f] hover:bg-[#d58512] transition-all duration-200 text-white rounded">
                        Đọc từ nhất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <Heading className="!text-base font-light border-b-2 border-b-blue29">
                  NỘI DUNG
                </Heading>
                <p className="mt-[10px]">{info.description}</p>
              </div>
              <div className="mt-5">
                <Heading className="!text-base font-light border-b-2 border-b-blue29">
                  DANH SÁCH CHƯƠNG
                </Heading>
                <p className="mt-[10px]">{info.description}</p>
              </div>
            </div>
            <div className="flex flex-col lg:w-1/3 gap-y-4">
              <ComicChartRanking />
            </div>
          </div>
        </section> */}
      </LayoutHome>
    </>
  );
};

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { slug } = query;
  const { data } = (await axios.get(`${server}/api/comic/${slug}`)).data;
  return {
    props: {
      info: data.info,
    },
  };
}

export default ComicDetailsPage;
