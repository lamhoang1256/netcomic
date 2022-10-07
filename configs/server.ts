const dev = process.env.NODE_ENV !== "production";
export const server = dev ? "http://localhost:3000" : process.env.SERVER;
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("dev: ", dev);
console.log("server: ", server);
console.log("SERVER: ", process.env.SERVER);
