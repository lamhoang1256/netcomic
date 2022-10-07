const dev = process.env.NEXT_PUBLIC_NODE_ENV !== "production";
console.log("env: ", process.env);
export const server = dev ? "http://localhost:3000" : process.env.NEXT_PUBLIC_SERVER;
console.log("NEXT_PUBLIC_NODE_ENV: ", process.env.NEXT_PUBLIC_NODE_ENV);
console.log("dev: ", dev);
console.log("server: ", server);
console.log("SERVER: ", process.env.NEXT_PUBLIC_SERVER);
