import { CheckAdmin } from "components/auth";
import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { Select } from "components/select";
import { optionsGender, userGender, userRole, userStatus } from "constants/global";
import { doc, getDoc } from "firebase/firestore";
import useInputChange from "hooks/useInputChange";
import useSelectChange from "hooks/useSelectChange";
import { LayoutDashboard } from "layouts";
import { db, handleUpdateUser, sendLinkResetPassword } from "libs/firebase-app";
import { UserUploadAvatar } from "modules/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createOptions } from "utils";

const UserUpdate = () => {
  const { query } = useRouter();
  const id = query?.id as string;
  const [values, setValues] = useState({
    fullname: "",
    gender: optionsGender[0],
    score: 0,
    role: "USER",
    avatar: "",
    status: "ACTIVE",
    email: "",
  });
  const { onChange } = useInputChange(values, setValues);
  const { onChangeSelect } = useSelectChange(values, setValues);
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
          onSubmit={(e) => handleUpdateUser(e, id, values)}
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
                defaultValue={values.gender}
                callback={(option) => setValues({ ...values, gender: option })}
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
                defaultValue={{ label: values?.role, value: values?.role }}
                callback={(option) => onChangeSelect("role", option)}
                placeholder="Chọn quyền"
              />
            </FormGroup>
            <Button type="submit" className="w-full h-10 mt-1 text-white bg-blue33">
              Cập nhật
            </Button>
          </div>
          <div>
            <UserUploadAvatar
              avatar={values?.avatar as string}
              userId={id as string}
              values={values}
              setValues={setValues}
            />
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
