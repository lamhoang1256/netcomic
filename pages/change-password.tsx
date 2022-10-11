import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { InputPassword } from "components/input";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import Head from "next/head";

interface ChangePasswordPageProps {}

const ChangePasswordPage = ({}: ChangePasswordPageProps) => {
  return (
    <>
      <Head>
        <title>Đổi mật khẩu - NetComic</title>
        <meta name="description" content="Đổi mật khẩu - NetComic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template title="Đổi mật khẩu" desc="Cập nhật mật khẩu của bạn">
          <form className="w-full mt-3 max-w-[500px]" autoComplete="off">
            <FormGroup>
              <Label htmlFor="oldPassword">Mật khẩu cũ</Label>
              <InputPassword name="oldPassword" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <InputPassword name="newPassword" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <InputPassword name="confirmPassword" />
            </FormGroup>
            <Button type="submit" className="w-full h-10 text-white bg-blue33">
              Cập nhật
            </Button>
          </form>
        </Template>
      </LayoutUser>
    </>
  );
};

export default ChangePasswordPage;
