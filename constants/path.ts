export const PATH = {
  home: "/",
  topComic: "/top-comic",
  comic: "/comic",
  search: "/search",
  filter: "/filter",
  category: "/category",
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/profile",
  comment: "/comment",
  follow: "/follow",
  history: "/history",
  changePassword: "/change-password",
  netTruyen: process.env.NEXT_PUBLIC_NHATTRUYEN as string,
  netTruyenComic: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/truyen-tranh`,
  netTruyenSearch: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/tim-truyen`,
  netTruyenFull: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/truyen-full`,
  netTruyenGirl: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/truyen-con-gai`,
  netTruyenCategory: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/the-loai`,
  netTruyenBoy: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/truyen-con-trai`,
  netTruyenFilter: `${process.env.NEXT_PUBLIC_NHATTRUYEN}/tim-truyen-nang-cao`,
  projectGithub: "https://github.com/lamhoang1256/netcomic",
};
