import readline from "node:readline";
import { stdout, stdin } from "node:process";
import { showWorkDirectory } from "./showWorkDirectory.js";
import { runCommand } from "./runCommand.js";

export const startCommandLine = () => {
 const commandLine = readline.createInterface({
  input: stdin,
  output: stdout,
 });

 commandLine.on("line", async (userInput) => {
  try {
   if (userInput.trim()) {
    await runCommand(userInput);
   }
  } catch {
   console.log("Something went wrong");
  } finally {
   showWorkDirectory();
  }
 });
};
