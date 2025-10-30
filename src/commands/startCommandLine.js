import readline from "node:readline";
import { stdout, stdin } from "node:process";
import { showWorkDirectory } from "./showWorkDirectory.js";

export const startCommandLine = () => {
 const commandLine = readline.createInterface({
  input: stdin,
  output: stdout,
 });

 commandLine.on("line", async (userInput) => {
  try {
   await runCommand(userInput);
  } catch {
   console.log("Something went wrong");
  } finally {
   showWorkDirectory();
  }
 });
};
