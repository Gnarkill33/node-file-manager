import { homedir } from "node:os";

export const showWorkDirectory = () => {
 console.log(`You are currently in ${homedir()}`);
};
