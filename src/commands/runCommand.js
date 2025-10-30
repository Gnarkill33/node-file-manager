import { dirname } from "node:path";
import { currentPath, setCurrentPath } from "../utils.js";

export const runCommand = (userInput) => {
 const [command, ...arg] = userInput.trim().split(" ");

 switch (command) {
  case "up": {
   const parentDir = dirname(currentPath);

   if (parentDir === currentPath) {
    console.log("You are already at the root directory");
    break;
   }

   setCurrentPath(parentDir);
   break;
  }
 }
};
