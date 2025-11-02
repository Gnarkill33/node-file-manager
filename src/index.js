import { farewellUser } from "./commands/farewellUser.js";
import { greetUser } from "./commands/greetUser.js";
import { startCommandLine } from "./commands/startCommandLine.js";
import { homedir } from "node:os";
import { chdir } from "node:process";

chdir(homedir());

greetUser();
startCommandLine();

process.on("exit", farewellUser);
