export const createUsernameFromEmail = (email: string) => email?.split("@")?.[0] || "User";

export const formatView = (num: number) => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return num.toString();
};

export const checkWindow = (action: any) => (typeof window !== undefined ? action : null);
