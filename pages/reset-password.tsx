import { CheckLoggedIn } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { server } from "configs/server";
import { PATH } from "constants/path";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "libs/firebase/firebase-config";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const handleSendResetLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Đã gửi link reset password tới email của bạn!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <CheckLoggedIn>
      <Head>
        <title>Quên mật khẩu</title>
        <meta name="description" content="Quên mật khẩu" />
        <link rel="icon" href="/favicon.ico" />
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
