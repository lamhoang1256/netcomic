import { CheckLoggedIn } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { IconHome } from "components/icons";
import { Input, InputPassword } from "components/input";
import { CustomLink } from "components/link";
import { Meta } from "components/meta";
import { userRole, userStatus } from "constants/global";
import { defaultAvatar } from "constants/image";
import { PATH } from "constants/path";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import { auth, db } from "libs/firebase/firebase-config";

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
        follows: [],
        gender: {
          disabled: false,
          label: "Nam",
          value: "boy",
        },
      });
      toast.success("Đăng ký tài khoản thành công!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      <Meta title="Đăng ký - NetComic" description="NetComic Trang đăng ký tài khoản" />
      <CheckLoggedIn>
        <div className="auth">
          <form
            className="w-full z-10 dark:bg-dark26 mt-20 mx-auto bg-white rounded-xl p-10 max-w-[580px]"
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

export default SignUpPage;
