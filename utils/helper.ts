export const createUsernameFromEmail = (email: string) => email?.split("@")?.[0] || "User";
export const formatView = (num: number) => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return num.toString();
};
export const checkWindow = (action: any) => (typeof window !== undefined ? action : null);
export const checkLevel = (score: number) => {
  if (score <= 10) return { level: 1, percent: (score / 10) * 100 };
  const level = score.toString().length;
  const percentPrevLevel = Math.pow(10, level - 1);
  const percentNextLevel = Math.pow(10, level);
  const percent = Math.floor(((score - percentPrevLevel) / percentNextLevel) * 100);
  return { level, percent };
};
export const checkTimeAgo = (timeCreated: number) => {
  const labels: { [key: string]: string } = {
    year: "năm",
    month: "tháng",
    week: "tuần",
    day: "ngày",
    hour: "giờ",
    minute: "phút",
  };
  let periods: { [key: string]: number } = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };
  let diff = Date.now() - timeCreated;
  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${labels[key]} trước`;
    }
  }
  return "Vừa xong";
};
export const formatCreatedAt = (createdAt: number) => {
  return new Date(createdAt).toLocaleDateString("vi-VI");
};
export const createOptions = (obj: { [key: string]: string }) => {
  return Object.entries(obj).map(([key, value]) => ({
    label: value,
    value: value,
  }));
};
