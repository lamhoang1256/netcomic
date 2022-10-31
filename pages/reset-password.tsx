import { CheckLoggedIn } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { IconHome } from "components/icons";
import { Input } from "components/input";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { PATH } from "constants/path";
import { sendLinkResetPassword } from "libs/firebase/firebase-helper";
import { FormEvent, useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSendResetLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendLinkResetPassword(email);
  };
  return (
    <>
      <Meta title="Đổi mật khẩu - NetComic" description="Đổi mật khẩu" />
      <CheckLoggedIn>
        <div className="auth">
          <form
            className="w-full z-10 mt-20 mx-auto dark:bg-dark26 bg-white rounded-xl p-10 max-w-[580px]"
            onSubmit={(e) => handleSendResetLink(e)}
            autoComplete="off"
          >
            <h1 className="text-xl font-bold text-center">Quên mật khẩu</h1>
            <FormGroup>
              <Label htmlFor="email">Địa chỉ email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Tài khoản/email của bạn"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" className="w-full h-10 mt-1 text-base text-white bg-blue29">
              Gửi link reset
            </Button>
            <div className="flex items-center justify-between my-3">
              <CustomLink href={PATH.home} className="flex items-center dark:text-white gap-x-1">
                <IconHome className="!w-[14px] !h-[14px]" />
                <span>Về trang chủ</span>
              </CustomLink>
              <span>
                Đã có tài khoản?
                <CustomLink href={PATH.signIn}> Đăng nhập</CustomLink>
              </span>
            </div>
          </form>
        </div>
      </CheckLoggedIn>
    </>
  );
};

export default ResetPasswordPage;
