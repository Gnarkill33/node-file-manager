import { homedir, EOL, userInfo, arch, cpus } from "node:os";

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

  case "--cpus": {
   const cpuInfo = cpus();

   console.log(`Overall amount of CPUs: ${cpuInfo.length}`);

   cpuInfo.forEach((cpu, index) => {
    console.log(
     `CPU ${index + 1}: ${cpu.model.trim()} — ${cpu.speed / 1000} GHz`
    );
   });
   break;
  }

  default: {
   console.log("Invalid input");
  }
 }
};
