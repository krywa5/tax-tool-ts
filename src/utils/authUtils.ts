const SESSION_STORAGE_ITEM_NAME = "tt_isAuth" as const;

export const setAuthSession = (): void => {
  sessionStorage.setItem(SESSION_STORAGE_ITEM_NAME, "true");
};

export const closeAuthSession = (): void => {
  sessionStorage.removeItem(SESSION_STORAGE_ITEM_NAME);
};

export const isAuthSession = (): boolean => {
  return sessionStorage.getItem(SESSION_STORAGE_ITEM_NAME) === "true";
};
