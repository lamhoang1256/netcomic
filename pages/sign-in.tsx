import { CheckLoggedIn } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { IconFacebook, IconGoogle, IconHome } from "components/icons";
import { Input, InputPassword } from "components/input";
import { CustomLink } from "components/link";
import { PATH } from "constants/path";
import { signInWithEmailAndPassword } from "firebase/auth";
import useInputChange from "hooks/useInputChange";
import { auth } from "libs/firebase/firebase-config";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((value) => value !== "");
    if (!isAllInputFilled) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Đăng nhập thành công!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <CheckLoggedIn>
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="auth">
        <form
          className="w-full z-10 mt-20 mx-auto bg-white dark:bg-dark26 rounded-xl p-10 max-w-[580px]"
          onSubmit={(e) => handleSignIn(e)}
          autoComplete="off"
        >
          <h1 className="text-xl font-bold text-center">Đăng nhập</h1>
          <FormGroup>
            <Label htmlFor="email">Địa chỉ email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Tài khoản/email của bạn"
              onChange={onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Mật khẩu</Label>
            <InputPassword
              name="password"
              placeholder="Mật khẩu của bạn"
              onChange={onChange}
              required
            />
          </FormGroup>
          <Button type="submit" className="w-full h-10 mt-1 text-base text-white bg-blue29">
            Đăng nhập
          </Button>
          <div className="flex items-center justify-between my-3">
            <CustomLink href={PATH.home} className="flex items-center dark:text-white gap-x-1">
              <IconHome className="!w-[14px] !h-[14px]" />
              <span>Về trang chủ</span>
            </CustomLink>
            <span>
              Chưa có tài khoản? <CustomLink href={PATH.signUp}>Đăng ký</CustomLink>
            </span>
          </div>
        </form>
      </div>
    </CheckLoggedIn>
  );
};

export default SignInPage;
