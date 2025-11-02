import { getUsername } from "../utils.js";
import { homedir } from "node:os";

const username = getUsername();

export const greetUser = () => {
 console.log(`Welcome to the File Manager, ${username}!`);
 console.log(`You are currently in ${homedir()}`);
};
