import { ProtectedRoute } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { InputPassword } from "components/input";
import { Meta } from "components/meta";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import useInputChange from "hooks/useInputChange";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { auth } from "libs/firebase/firebase-config";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAllInputFilled = Object.values(values).every((value) => value !== "");
    if (!isAllInputFilled) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      if (!auth?.currentUser) return;
      const credential = EmailAuthProvider.credential(
        auth?.currentUser.email as string,
        values.password
      );
      await reauthenticateWithCredential(auth?.currentUser, credential);
      await updatePassword(auth?.currentUser, values.newPassword);
      toast.success("Đổi mật khẩu thành công!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <ProtectedRoute>
      <Meta
        title="Đổi mật khẩu - NetComic"
        description="Đổi thông tin mật khẩu của người dùng"
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <LayoutUser>
        <Template title="Đổi mật khẩu" desc="Cập nhật mật khẩu của bạn">
          <form
            className="w-full mt-3 max-w-[500px]"
            autoComplete="off"
            onSubmit={(e) => handleChangePassword(e)}
          >
            <FormGroup>
              <Label htmlFor="password">Mật khẩu cũ</Label>
              <InputPassword
                name="password"
                placeholder="Nhập mật khẩu cũ"
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <InputPassword
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <InputPassword
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                onChange={onChange}
                required
              />
            </FormGroup>
            <Button type="submit" className="w-full h-10 mt-1 text-white bg-blue00">
              Đổi mật khẩu
            </Button>
          </form>
        </Template>
      </LayoutUser>
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;
