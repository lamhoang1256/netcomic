import { ProtectedRoute } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { Meta } from "components/meta";
import { Select } from "components/select";
import { optionsGender } from "constants/global";
import { defaultAvatar } from "constants/image";
import useInputChange from "hooks/useInputChange";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import { handleUpdateUser } from "libs/firebase";
import { UserLevelProgress, UserUploadAvatar } from "modules/user";
import { useEffect, useState } from "react";
import useGlobalStore from "store/global-store";

const ProfilePage = () => {
  const { currentUser } = useGlobalStore();
  const [values, setValues] = useState({
    fullname: "",
    gender: optionsGender[0],
    avatar: defaultAvatar,
  });
  const { onChange } = useInputChange(values, setValues);
  useEffect(() => {
    if (!currentUser) return;
    setValues({ ...values, ...currentUser });
  }, [currentUser]);
  return (
    <>
      <Meta title="Thông tin chung - NetComic" description="Thông tin chung" />
      <ProtectedRoute>
        <LayoutUser>
          <Template
            title="Thông tin tài khoản"
            desc="Cập nhật đầy đủ thông tin của bạn để hoạt động tốt hơn trên NetComic"
          >
            <form
              autoComplete="off"
              onSubmit={(e) => handleUpdateUser(e, currentUser?.uid as string, values)}
              className="flex flex-col-reverse gap-5 lg:flex-row"
            >
              <div className="w-full mt-3 max-w-[500px]">
                <FormGroup>
                  <UserLevelProgress />
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
                    options={optionsGender}
                    defaultValue={currentUser?.gender}
                    callback={(option) => setValues({ ...values, gender: option })}
                    placeholder="Chọn giới tính"
                  />
                </FormGroup>
                <Button type="submit" className="w-full h-10 mt-1 text-white bg-blue33">
                  Cập nhật
                </Button>
              </div>
              <div className="flex-1">
                <UserUploadAvatar
                  avatar={currentUser?.avatar as string}
                  userId={currentUser?.uid as string}
                  values={values}
                  setValues={setValues}
                />
              </div>
            </form>
          </Template>
        </LayoutUser>
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;
