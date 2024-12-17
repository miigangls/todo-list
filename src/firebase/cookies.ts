export const COOKIE_NAME = "local";

export type CookieOptions = {
  path: string;
  expires: Date;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
};

export const COOKIE_OPTIONS: CookieOptions = {
  path: "/",
  expires: new Date("Tue, 19 Jan 2038 03:14:07 UTC"),
  secure: import.meta.env.PROD,
  sameSite: "strict",
};
