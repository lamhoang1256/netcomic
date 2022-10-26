import { CheckAdmin } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Image } from "components/image";
import { Input } from "components/input";
import { Select } from "components/select";
import { userGender, userRole, userStatus } from "constants/global";
import { defaultAvatar } from "constants/image";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import useSelectChange from "hooks/useSelectChange";
import { LayoutDashboard } from "layouts";
import { db } from "libs/firebase/firebase-config";
import { sendLinkResetPassword } from "libs/firebase/firebase-helper";
import useFirebaseImage from "libs/firebase/useFirebaseImage";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createOptions } from "utils";

const UserUpdate = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const [values, setValues] = useState({
    fullname: "",
    gender: "",
    score: 0,
    role: "USER",
    avatar: "",
    status: "ACTIVE",
    email: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const { onChangeSelect } = useSelectChange(values, setValues);
  const { handleUploadImage } = useFirebaseImage();
  const handleUpdateAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newAvatar = await handleUploadImage(e.target.files?.[0]);
      if (!id) return;
      const colRef = doc(db, "users", id);
      await updateDoc(colRef, { avatar: newAvatar });
      toast.success("Cập nhật ảnh đại diện thành công!");
      setValues({ ...values, avatar: newAvatar });
    } catch (error) {
      toast.error("Cập nhật ảnh đại diện thất bại!");
    }
  };
  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!id) return;
      const colRef = doc(db, "users", id);
      await updateDoc(colRef, { ...values });
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!");
    }
  };
  useEffect(() => {
    async function fetchUser() {
      if (!id) return;
      const colRef = doc(db, "users", id);
      const docData = await getDoc(colRef);
      const data = docData.data();
      setValues({ ...values, ...data });
    }
    fetchUser();
  }, [id]);
  return (
    <CheckAdmin>
      <LayoutDashboard
        title="Cập nhật thông tin người dùng"
        desc={`Cập nhật thông tin của ${values.email}`}
      >
        <form
          autoComplete="off"
          onSubmit={handleUpdateUser}
          className="flex flex-col-reverse gap-5 gap-x-16 lg:flex-row"
        >
          <div className="w-full mt-3 max-w-[500px]">
            <FormGroup>
              <Label htmlFor="email">Địa chỉ email</Label>
              <Input name="email" defaultValue={values?.email || ""} onChange={onChange} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input
                name="fullname"
                placeholder="Nhập họ và tên"
                defaultValue={values?.fullname as string}
                onChange={onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                options={createOptions(userGender)}
                defaultValue={{ label: values?.gender, value: values?.gender }}
                callback={(option) => onChangeSelect("gender", option)}
                placeholder="Chọn giới tính"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                options={createOptions(userStatus)}
                defaultValue={{ label: values?.status, value: values?.status }}
                placeholder="Chọn trạng thái user"
                callback={(option) => onChangeSelect("status", option)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="role">Quyền</Label>
              <Select
                options={createOptions(userRole)}
                defaultValue={{
                  label: values?.role as string,
                  value: values?.role as string,
                }}
                callback={(option) => onChangeSelect("role", option)}
                placeholder="Chọn quyền"
              />
            </FormGroup>
            <Button type="submit" className="w-full h-10 mt-1 text-white bg-blue33">
              Cập nhật
            </Button>
          </div>
          <div>
            <div className="flex flex-col items-center mt-3">
              <Label>Ảnh đại diện</Label>
              <Image
                alt="avatar"
                src={values?.avatar || defaultAvatar}
                className="w-[100px] h-[100px] mt-1 rounded-full"
              />
              <div className="relative">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="absolute inset-0 opacity-0"
                  onChange={handleUpdateAvatar}
                />
                <Button className="bg-[#c9302c] text-white my-2 inline-block">Upload ảnh</Button>
              </div>
              <span>jpg,jpeg,gif,png nhỏ hơn 2MB</span>
              <span className="italic font-light text-red-500">
                Avatar tục tĩu sẽ bị khóa vĩnh viễn
              </span>
            </div>
            <Button
              type="button"
              className="block mx-auto mt-4 text-white bg-blue33"
              onClick={() => sendLinkResetPassword(values.email)}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </LayoutDashboard>
    </CheckAdmin>
  );
};

export default UserUpdate;
