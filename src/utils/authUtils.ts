// TODO: Przenieść to do serwisu auth

export const setAuthSession = (): void => {
  sessionStorage.setItem("tt_isAuth", "true");
};

export const closeAuthSession = (): void => {
  sessionStorage.removeItem("tt_isAuth");
};

export const isAuthSession = (): boolean => {
  return sessionStorage.getItem("tt_isAuth") === "true";
};
