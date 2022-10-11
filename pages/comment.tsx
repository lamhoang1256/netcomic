import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { InputPassword } from "components/input";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import Head from "next/head";

interface CommentPageProps {}

const CommentPage = ({}: CommentPageProps) => {
  return (
    <>
      <Head>
        <title>Bình luận của tôi - NetComic</title>
        <meta name="description" content="Bình luận của tôi - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template title="Bình luận của tôi" desc="Danh sách bình luận của bạn">
          Bình luận của tôi
        </Template>
      </LayoutUser>
    </>
  );
};

export default CommentPage;
