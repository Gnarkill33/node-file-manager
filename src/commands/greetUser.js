import { getUsername } from "../utils.js";

const username = getUsername();

export const greetUser = () => {
 console.log(`Welcome to the File Manager, ${username}!`);
};
