export default function classNames(...args: any[]) {
  return args
    .reduce((acc, val) => {
      if (!val) return acc;
      if (typeof val === "string") return acc.concat(val.split(" "));
      return acc.concat(Object.values(val));
    }, [])
    .join(" ");
}
