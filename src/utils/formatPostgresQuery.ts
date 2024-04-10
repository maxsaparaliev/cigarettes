export const formatPostgresQuery = (arr: Array<string>) => {
  return arr.map((item) => `"${item}"`).join(",");
};
