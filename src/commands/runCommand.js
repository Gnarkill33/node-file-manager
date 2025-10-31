import { dirname, isAbsolute, resolve } from "node:path";
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

   const newPath = isAbsolute(targetDir)
    ? targetDir
    : resolve(cwd(), targetDir);

   chdir(newPath);
   break;
  }
  default: {
   console.log("Invalid input");
  }
 }
};
