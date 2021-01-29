import { Client } from "./lib/client";
import { TOKEN } from "./secret";

const BOT = new Client(TOKEN);
BOT.login();