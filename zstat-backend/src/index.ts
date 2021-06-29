import "reflect-metadata";

import { config } from "dotenv";

import { ZstatServer } from "./ZstatServer";

// load environment configuration
config();

new ZstatServer().listen();
