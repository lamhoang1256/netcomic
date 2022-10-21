import { CheckLoggedIn } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { IconFacebook, IconGoogle } from "components/icons";
import { Input, InputPassword } from "components/input";
import { userRole, userStatus } from "constants/global";
import { defaultAvatar } from "constants/image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import { auth, db } from "libs/firebase/firebase-config";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((value) => value !== "");
    if (!isAllInputFilled) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Xác nhận mật khẩu không trùng khớp!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (!auth.currentUser) return;
      await updateProfile(auth.currentUser, {
        photoURL: defaultAvatar,
      });
      await setDoc(doc(db, "users", auth?.currentUser?.uid as string), {
        avatar: defaultAvatar,
        uid: auth?.currentUser?.uid,
        email: values.email,
        password: values.password,
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
        score: 0,
      });
      toast.success("Đăng ký tài khoản thành công!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <CheckLoggedIn>
      <Head>
        <title>Đăng ký</title>
        <meta name="description" content="Đăng ký" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        className="w-full mt-20 mx-auto bg-white rounded-xl p-10 max-w-[580px]"
        onSubmit={(e) => handleSignUp(e)}
        autoComplete="off"
      >
        <h1 className="text-xl font-bold text-center">Đăng ký</h1>
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
        <FormGroup>
          <Label htmlFor="confirmPassword">Xác nhận Mật khẩu</Label>
          <InputPassword
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            onChange={onChange}
            required
          />
        </FormGroup>
        <Button type="submit" className="w-full h-10 mt-1 text-base text-white bg-blue29">
          Đăng ký
        </Button>
        <span className="block my-3">Đã có tài khoản? Đăng nhập</span>
        <div className="grid grid-cols-2 gap-x-2">
          <Button className="flex items-center font-medium text-white border h-11 gap-x-2 bg-blue29">
            <IconGoogle />
            <span>Đăng ký bằng Google</span>
          </Button>
          <Button className="flex items-center text-white gap-x-2 bg-[#385ca8]">
            <IconFacebook />
            <span>Đăng ký bằng Facebook</span>
          </Button>
        </div>
      </form>
    </CheckLoggedIn>
  );
};

export default SignUpPage;
