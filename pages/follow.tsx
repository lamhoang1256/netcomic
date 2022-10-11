import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import Head from "next/head";

interface FollowPageProps {}

const FollowPage = ({}: FollowPageProps) => {
  return (
    <>
      <Head>
        <title>Truyện đang theo dõi - NetComic</title>
        <meta name="description" content="Truyện đang theo dõi - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template title="Truyện đang theo dõi" desc="Danh sách truyện đang theo dõi của bạn">
          Follow
        </Template>
      </LayoutUser>
    </>
  );
};

export default FollowPage;
