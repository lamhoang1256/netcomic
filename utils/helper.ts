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
