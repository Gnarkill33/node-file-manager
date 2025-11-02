import { homedir } from "node:os";

export const runOsCommand = (arg) => {
 const [command] = arg;
 const osCommand = command.replace(/^--/, "");

 switch (osCommand) {
  case "homedir": {
   const homeDir = homedir();
   console.log(homeDir);
   break;
  }

  default: {
   console.log("Invalid input");
  }
 }
};
