import { getUsername } from "../utils.js";

const username = getUsername();

export const farewellUser = () => {
 console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};
