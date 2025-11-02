import { basename, dirname, isAbsolute, resolve } from "node:path";
import { chdir, cwd, stdout } from "node:process";
import {
 readdir,
 writeFile,
 mkdir,
 rename,
 access,
 rm,
} from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { runOsCommand } from "./runOsCommand.js";
import { availableOsCommands, checkType } from "../utils.js";
import { calculateHash } from "./calculateHash.js";

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
   if (arg.length !== 0) {
    console.log("Invalid input");
    break;
   }

   const currentDir = cwd();

   const dirContent = await readdir(currentDir);

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

  case "rn": {
   if (arg.length !== 2) {
    console.log("Invalid input");
    break;
   }

   const sourceName = resolve(cwd(), arg[0]);
   const targetName = resolve(cwd(), arg[1]);

   await rename(sourceName, targetName);

   break;
  }

  case "cp": {
   if (arg.length !== 2) {
    console.log("Invalid input");
    break;
   }

   const sourceFileName = resolve(cwd(), arg[0]);
   const targetDirName = resolve(cwd(), arg[1]);
   const targetFileName = resolve(targetDirName, basename(sourceFileName));

   await access(sourceFileName);
   await access(targetDirName);

   const readStream = createReadStream(sourceFileName);
   const writeStream = createWriteStream(targetFileName);

   await pipeline(readStream, writeStream);

   break;
  }

  case "rm": {
   if (arg.length !== 1) console.log("Invalid input");

   const filename = resolve(cwd(), arg[0]);

   await access(filename);

   await rm(filename);

   break;
  }

  case "mv": {
   if (arg.length !== 2) console.log("Invalid input");

   const sourceFileName = resolve(cwd(), arg[0]);
   const targetDirName = resolve(cwd(), arg[1]);
   const targetFileName = resolve(targetDirName, basename(sourceFileName));

   await access(sourceFileName);
   await access(targetDirName);

   const readStream = createReadStream(sourceFileName);
   const writeStream = createWriteStream(targetFileName);
   await pipeline(readStream, writeStream);

   await rm(sourceFileName);

   break;
  }

  case "os": {
   if (arg.length !== 1 || !availableOsCommands.includes(arg[0])) {
    console.log("Invalid input");
   }

   runOsCommand(arg[0]);

   break;
  }

  case "hash": {
   if (arg.length !== 1) console.log("Invalid input");

   const sourceFileName = resolve(cwd(), arg[0]);

   await calculateHash(sourceFileName);

   break;
  }

  case "compress": {
   if (arg.length !== 2) console.log("Invalid input");

   const [source, destination] = arg;
   const sourceFileName = resolve(cwd(), source);
   const targetDirName = resolve(cwd(), destination, basename(sourceFileName));

   const readableStream = createReadStream(sourceFileName);
   const writableStream = createWriteStream(targetDirName);

   await pipeline(readableStream, createBrotliCompress(), writableStream);
   break;
  }

  case "decompress": {
   if (arg.length !== 2) console.log("Invalid input");

   const [source, destination] = arg;
   const sourceFileName = resolve(cwd(), source);
   const targetDirName = resolve(cwd(), destination, basename(sourceFileName));

   const readableStream = createReadStream(sourceFileName);
   const writableStream = createWriteStream(targetDirName);

   await pipeline(readableStream, createBrotliDecompress(), writableStream);
   break;
  }

  case ".exit": {
   process.exit();
  }

  default: {
   console.log("Invalid input");
  }
 }
};
