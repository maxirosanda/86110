import dotenv from "dotenv";
import { options } from "./commander.config.js";

dotenv.config({ path: options.mode === 'production' ? '.env' : '.env.dev'});
