import { configuration } from "./config/appconfig";
import dotenv from "dotenv";
import https from 'https';

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const port = parseInt(configuration[nodeEnv as keyof IConfigurables].port)

import app from "./app";
import { IConfigurables } from "./database/types/models";

app.listen(port,  () => {
    console.log('Listening on port ' + port + '!!!');
})