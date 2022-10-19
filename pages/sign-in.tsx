import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { IconFacebook, IconGoogle } from "components/icons";
import { Input, InputPassword } from "components/input";
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
    <>
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="auth">
        <form
          className="w-full z-10 mt-20 mx-auto bg-white rounded-xl p-10 max-w-[580px]"
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
          <span className="block my-3">Chưa có tài khoản? Đăng ký</span>
          <div className="grid grid-cols-2 gap-x-2">
            <Button className="flex items-center font-medium text-white border h-11 gap-x-2 bg-blue29">
              <IconGoogle />
              <span>Đăng nhập bằng Google</span>
            </Button>
            <Button className="flex items-center text-white gap-x-2 bg-[#385ca8]">
              <IconFacebook />
              <span>Đăng nhập bằng Facebook</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
