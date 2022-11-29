import { useState } from "react";

export default function useModal() {
  const [isShow, setShow] = useState(false);
  function toggleModal() {
    setShow((prevIsShow) => !prevIsShow);
  }
  return {
    isShow,
    toggleModal
  };
}
