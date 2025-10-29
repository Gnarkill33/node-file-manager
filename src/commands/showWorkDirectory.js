import { cwd } from "node:process";

export const showWorkDirectory = () => {
 console.log(`You are currently in ${cwd()}`);
};
