import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { Select } from "components/select";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import Head from "next/head";
import { useAuthContext } from "store/auth-context";

const options = [
  { value: "boy", label: "Nam" },
  { value: "girl", label: "Nữ" },
];

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  const { currentUser } = useAuthContext();
  console.log("email: ", currentUser.email);
  console.log("currentUser: ", currentUser);
  return (
    <>
      <Head>
        <title>Tài khoản</title>
        <meta name="description" content="Tài khoản" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template
          title="Thông tin tài khoản"
          desc="Cập nhật đầy đủ thông tin của bạn để hoạt động tốt hơn trên NetComic"
        >
          <form className="w-full mt-3 max-w-[500px]" autoComplete="off">
            <FormGroup>
              <Label htmlFor="email">Địa chỉ email</Label>
              <Input name="email" disabled defaultValue={currentUser?.email || "user@gmail.com"} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input name="fullname" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Giới tính</Label>
              <Select options={options} placeholder="Chọn giới tính" />
            </FormGroup>
            <Button type="submit" className="w-full h-10 mt-1 text-white bg-blue33">
              Cập nhật
            </Button>
          </form>
        </Template>
      </LayoutUser>
    </>
  );
};

export default ProfilePage;
