import { USERNAME_PREFIX, ANONYMOUS } from "./constants.js";

export const getUsername = () => {
 const [, , ...arrOfArgs] = process.argv;
 const username = arrOfArgs.find((arg) => arg.startsWith(USERNAME_PREFIX));

 if (!username) return ANONYMOUS;

 return username.replace(USERNAME_PREFIX, "") || ANONYMOUS;
};
