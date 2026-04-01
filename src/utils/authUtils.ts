const COOKIE_NAME = "tt_isAuth" as const;

export const setAuthSession = (): void => {
  // 86400 seconds = 24 hours
  document.cookie = `${COOKIE_NAME}=true; max-age=86400; path=/`;
};

export const closeAuthSession = (): void => {
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
};

export const isAuthSession = (): boolean => {
  const match = document.cookie.match(
    new RegExp("(^| )" + COOKIE_NAME + "=([^;]+)"),
  );
  return match ? match[2] === "true" : false;
};
