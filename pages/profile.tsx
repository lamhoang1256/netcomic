import { Button } from "components/button";
import { FormGroup, Label } from "components/form";
import { Input } from "components/input";
import { Select } from "components/select";
import { Template } from "layouts";
import LayoutUser from "layouts/LayoutUser";
import Head from "next/head";

const options = [
  { value: "boy", label: "Nam" },
  { value: "girl", label: "Nữ" },
];

interface ProfilePageProps {}

const ProfilePage = ({}: ProfilePageProps) => {
  return (
    <>
      <Head>
        <title>Tài khoản</title>
        <meta name="description" content="Tài khoản" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutUser>
        <Template title="Thông tin tài khoản" desc="Cập nhật thông tin tài khoản">
          <form className="w-full mt-3 max-w-[500px]" autoComplete="off">
            <FormGroup>
              <Label htmlFor="email">Địa chỉ email</Label>
              <span>lamhoang1256@gmail.com</span>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input name="fullname" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Giới tính</Label>
              <Select options={options} placeholder="Chọn giới tính" />
            </FormGroup>
            <Button type="submit" className="w-full h-10 text-white bg-blue33">
              Cập nhật
            </Button>
          </form>
        </Template>
      </LayoutUser>
    </>
  );
};

export default ProfilePage;
