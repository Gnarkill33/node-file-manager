import { dirname, isAbsolute, join } from "node:path";
import { chdir, cwd } from "node:process";

export const runCommand = (userInput) => {
 const [command, ...arg] = userInput.trim().split(" ");

 switch (command) {
  case "up": {
   const parentDir = dirname(cwd());

   chdir(parentDir);
   break;
  }
  case "cd": {
   if (arg.length === 0) return;
   const targetDir = arg[0];
   let newPath;
   if (isAbsolute(targetDir)) {
    newPath = targetDir;
   } else {
    newPath = resolve(currentPath, targetDir);
   }
   setCurrentPath(newPath);
   break;
  }
  default: {
   console.log("Invalid input");
  }
 }
};
