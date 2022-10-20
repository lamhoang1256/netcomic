const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";
export const server = dev ? process.env.NEXT_PUBLIC_LOCALHOST : process.env.NEXT_PUBLIC_SERVER;
