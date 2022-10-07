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
import { Heading } from "components/text";
import { server } from "configs/server";
import { PATH } from "constants/path";
import useModal from "hooks/useModal";
import LayoutHome from "layouts/LayoutHome";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

interface ReadComicPageProps {}

const ReadComicPage = ({}: ReadComicPageProps) => {
  const { isShow, toggleModal } = useModal();
  return (
    <>
      <Head>
        <title>ĐỌC</title>
        <meta name="description" content="Trang chi tiết truyện" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutHome>
        <section className="bg-[#f9f9f9] layout-container">
          <div className="flex items-center pt-4 pb-2 gap-x-2">
            <h1 className="text-xl transition-all duration-200 text-[#0073f4]  hover:text-purpleae">
              Võ Luyện Đỉnh Phong
            </h1>
            <span className="text-xl font-medium">- Chapter 1209</span>
            <span className="italic text-gray8a">[Cập nhật lúc: 18:46 06/10/2022]</span>
          </div>
          <div className="flex items-center pb-4 gap-x-3">
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
            <div className="flex items-center w-1/3 gap-x-1">
              <button className="w-[34px] h-[34px] flex items-center justify-center bg-black opacity-30 rounded-l">
                <IconChevronLeft fill="#fff" />
              </button>
              <div
                onClick={toggleModal}
                className="h-9 cursor-pointer px-2 rounded-sm flex items-center justify-between border border-[#ccc] flex-1"
              >
                <span>Chapter 123</span>
                <IconDown />
              </div>
              <button className="w-[34px] h-[34px] flex items-center justify-center bg-black opacity-30 rounded-r">
                <IconChevronRight fill="#fff" />
              </button>
            </div>
            <button className="px-[14px] py-[6px] bg-[#5cb85c] hover:opacity-80 transition-all duration-200 flex items-center gap-x-1 text-white rounded">
              <IconHeart className="w-4 h-4" />
              Theo dõi
            </button>
          </div>
          <ModalChapterList isShow={isShow} toggleModal={toggleModal} />
        </section>
      </LayoutHome>
    </>
  );
};

// export async function getServerSideProps({ query }: GetServerSidePropsContext) {
//   const { slug, chapter, id } = query;
//   const { imageUrls, detailsChapter, comments } = (await axios.get(`${server}/api/comic/${slug}/${chapter}/${id}`)).data.data;
//   return {
//     props: {
//       imageUrls, detailsChapter, comments
//     },
//   };
// }

export default ReadComicPage;
