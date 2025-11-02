import { homedir, EOL, userInfo, arch } from "node:os";

export const runOsCommand = (osCommand) => {
 switch (osCommand) {
  case "--homedir": {
   console.log(homedir());
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

  case "--architecture": {
   console.log(arch());
   break;
  }

  default: {
   console.log("Invalid input");
  }
 }
};
