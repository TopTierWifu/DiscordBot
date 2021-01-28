import { Client } from "./lib/client";
import { TOKEN } from "./secret.json";

const BOT = new Client(TOKEN);
BOT.login();