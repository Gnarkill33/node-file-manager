import { stat } from "node:fs/promises";
import { USERNAME_PREFIX, ANONYMOUS } from "./constants.js";

export const getUsername = () => {
 const [, , ...arrOfArgs] = process.argv;
 const username = arrOfArgs.find((arg) => arg.startsWith(USERNAME_PREFIX));

 if (!username) return ANONYMOUS;

 return username.replace(USERNAME_PREFIX, "") || ANONYMOUS;
};

export const checkType = async (path) => {
 try {
  const stats = await stat(path);

  if (stats.isFile()) {
   return "file";
  } else if (stats.isDirectory()) {
   return "directory";
  } else {
   return "other";
  }
 } catch (err) {
  console.error(err);
 }
};

export const availableOsCommands = [
 "--EOL",
 "--cpus",
 "--homedir",
 "--username",
 "--architecture",
];
