import { ProtectedRoute } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { IconQuestion } from "components/icons";
import { Image } from "components/image";
import { Input } from "components/input";
import { Meta } from "components/meta";
import { ModalLevel } from "components/modal";
import { Select } from "components/select";
import { defaultAvatar } from "constants/image";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import useModal from "hooks/useModal";
import useSelectChange from "hooks/useSelectChange";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { auth, db } from "libs/firebase/firebase-config";
import useFirebaseImage from "libs/firebase/useFirebaseImage";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useGlobalStore from "store/global-store";
import { checkLevel } from "utils";

const options = [
  { value: "boy", label: "Nam" },
  { value: "girl", label: "Nữ" },
];

const ProfilePage = () => {
  const { currentUser } = useGlobalStore();
  const [values, setValues] = useState({
    fullname: "",
    gender: "",
    avatar: defaultAvatar,
  });
  const { isShow, toggleModal } = useModal();
  const { onChange } = useInputChange(values, setValues);
  const { handleUploadImage } = useFirebaseImage();
  const { level, percent } = checkLevel(currentUser?.score || 0);
  const { onChangeSelect } = useSelectChange(values, setValues);
  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!currentUser) return;
      const colRef = doc(db, "users", currentUser.uid);
      await updateDoc(colRef, { ...values });
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thông tin thất bại!");
    }
  };
  const handleUpdateAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newAvatar = await handleUploadImage(e.target.files?.[0]);
      if (!currentUser || !auth.currentUser) return;
      const colRef = doc(db, "users", currentUser?.uid);
      await updateProfile(auth.currentUser, {
        photoURL: newAvatar,
      });
      await updateDoc(colRef, { avatar: newAvatar });
      toast.success("Cập nhật ảnh đại diện thành công!");
      setValues({ ...values, avatar: newAvatar });
    } catch (error) {
      toast.error("Cập nhật ảnh đại diện thất bại!");
    }
  };
  useEffect(() => {
    if (!currentUser) return;
    setValues({
      fullname: currentUser?.fullname || "",
      gender: currentUser?.gender || "",
      avatar: currentUser?.photoURL || defaultAvatar,
    });
  }, [currentUser]);

  return (
    <>
      <Meta
        title="Thông tin chung - NetComic"
        description="Thông tin chung"
        image="https://raw.githubusercontent.com/lamhoang1256/shopbee/main/screenshots/thumbnail-youtube.png"
      />
      <ProtectedRoute>
        <LayoutUser>
          <Template
            title="Thông tin tài khoản"
            desc="Cập nhật đầy đủ thông tin của bạn để hoạt động tốt hơn trên NetComic"
          >
            <form
              autoComplete="off"
              onSubmit={handleUpdateProfile}
              className="flex flex-col-reverse gap-5 lg:flex-row"
            >
              <div className="w-full mt-3 max-w-[500px]">
                <FormGroup>
                  <div className="flex items-end gap-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs">
                        <span>Cấp {level}</span>
                        <span>Cấp {level + 1}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-level" style={{ width: `${percent}%` }}>
                          {percent}%
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={toggleModal}>
                      <IconQuestion />
                    </button>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Địa chỉ email</Label>
                  <Input
                    name="email"
                    disabled={currentUser?.email ? true : false}
                    defaultValue={currentUser?.email || ""}
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <Input
                    name="fullname"
                    placeholder="Nhập họ và tên"
                    defaultValue={currentUser?.fullname as string}
                    onChange={onChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="gender">Giới tính</Label>
                  <Select
                    options={options}
                    defaultValue={{
                      label: currentUser?.gender as string,
                      value: currentUser?.gender as string,
                    }}
                    callback={(option) => onChangeSelect("gender", option)}
                    placeholder="Chọn giới tính"
                  />
                </FormGroup>
                <Button type="submit" className="w-full h-10 mt-1 text-white bg-blue33">
                  Cập nhật
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex flex-col items-center mt-3">
                  <Label>Ảnh đại diện</Label>
                  <Image
                    alt="avatar"
                    src={currentUser?.photoURL || defaultAvatar}
                    className="w-[100px] h-[100px] mt-1 rounded-full"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="absolute inset-0 opacity-0"
                      onChange={handleUpdateAvatar}
                    />
                    <Button className="bg-[#c9302c] text-white my-2 inline-block">
                      Upload ảnh
                    </Button>
                  </div>
                  <span>jpg,jpeg,gif,png nhỏ hơn 2MB</span>
                  <span className="italic font-light text-red-500">
                    Avatar tục tĩu sẽ bị khóa vĩnh viễn
                  </span>
                </div>
              </div>
            </form>
          </Template>
        </LayoutUser>
        <ModalLevel isShow={isShow} toggleModal={toggleModal} />
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;
