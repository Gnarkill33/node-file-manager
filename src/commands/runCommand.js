import { dirname, isAbsolute, resolve } from "node:path";
import { chdir, cwd } from "node:process";
import { readdir } from "node:fs/promises";
import { checkType } from "../utils.js";

export const runCommand = async (userInput) => {
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

  case "ls": {
   const currentDir = cwd();

   const dirContent = await readdir(currentDir);

   const filesToShow = await Promise.all(
    dirContent.map(async (item) => {
     const itemPath = resolve(currentDir, item);
     const itemType = await checkType(itemPath);
     return { Name: item, Type: itemType };
    })
   );

   console.table(filesToShow);
   break;
  }

  default: {
   console.log("Invalid input");
  }
 }
};
