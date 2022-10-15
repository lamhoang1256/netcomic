export const createUsernameFromEmail = (email: string) => email?.split("@")?.[0] || "User";
