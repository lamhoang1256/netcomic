import { CheckLoggedIn } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { sendLinkResetPassword } from "libs/firebase/firebase-helper";
import Head from "next/head";
import { FormEvent, useState } from "react";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSendResetLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendLinkResetPassword(email);
  };
  return (
    <CheckLoggedIn>
      <Head>
        <title>Quên mật khẩu</title>
        <meta name="description" content="Quên mật khẩu" />
      </Head>
      <div className="auth">
        <form
          className="w-full z-10 mt-20 mx-auto bg-white rounded-xl p-10 max-w-[580px]"
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
            Gửi
          </Button>
        </form>
      </div>
    </CheckLoggedIn>
  );
};

export default ResetPasswordPage;
