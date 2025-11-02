import { homedir, EOL, userInfo } from "node:os";

export const runOsCommand = (osCommand) => {
 switch (osCommand) {
  case "--homedir": {
   const homeDir = homedir();
   console.log(homeDir);
   break;
  }

  case "--EOL": {
   console.log(JSON.stringify(EOL));
   break;
  }

  case "--username": {
   const { username } = userInfo();

   console.log(username);
   break;
  }

  default: {
   console.log("Invalid input");
  }
 }
};
