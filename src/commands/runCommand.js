import { dirname, isAbsolute, resolve } from "node:path";
import { chdir, cwd, stdout } from "node:process";
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { checkType } from "../utils.js";

export const runCommand = async (userInput) => {
 const [command, ...arg] = userInput.trim().split(" ");

 switch (command) {
  case "up": {
   if (arg.length !== 0) console.log("Invalid input");

   const parentDir = dirname(cwd());

   chdir(parentDir);
   break;
  }

  case "cd": {
   if (arg.length !== 1) console.log("Invalid input");

   const targetDir = arg[0];

   const newPath = isAbsolute(targetDir)
    ? targetDir
    : resolve(cwd(), targetDir);

   chdir(newPath);
   break;
  }

  case "ls": {
   if (arg.length !== 0) console.log("Invalid input");

   const currentDir = cwd();

   const dirContent = await readdir(currentDir, { withFileTypes: true });

   const filesToShow = await Promise.all(
    dirContent.map(async (item) => {
     const itemPath = resolve(currentDir, item);
     const itemType = await checkType(itemPath);
     return { Name: item, Type: itemType };
    })
   );

   const sortedFiles = filesToShow.sort((a, b) => a.Type.localeCompare(b.Type));

   console.table(sortedFiles);
   break;
  }

  case "cat": {
   if (arg.length !== 1) console.log("Invalid input");

   const targetFile = resolve(cwd(), arg[0]);

   const readableStream = createReadStream(targetFile, { encoding: "utf8" });
   readableStream.on("data", (chunk) => {
    stdout.write(chunk);
   });

   readableStream.on("end", () => {
    console.log();
   });

   readableStream.on("error", () => {
    console.log("Operation failed");
   });

   break;
  }

  case "add": {
   if (arg.length !== 1) console.log("Invalid input");

   const filePath = resolve(cwd(), arg[0]);

   try {
    await writeFile(filePath, "", { flag: "wx" });
   } catch {
    console.log("Operation failed");
   }
   break;
  }

  case "mkdir": {
   if (arg.length !== 1) console.log("Invalid input");

   const dirPath = resolve(cwd(), arg[0]);

   await mkdir(dirPath, { recursive: false });
   break;
  }

  default: {
   console.log("Invalid input");
  }
 }
};
