export const getTokenAccess = (token) => {
  const result = token.match(new RegExp("=" + "(.*)" + "&s"));
  console.log(result);

  return result[1];
};
