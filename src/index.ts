import { configuration } from "./config/appconfig";
import dotenv from "dotenv";
import {IConfigurables} from "./database/types/type"

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const port = parseInt(configuration[nodeEnv as keyof IConfigurables].port)

import app from "./app";

app.listen(port)