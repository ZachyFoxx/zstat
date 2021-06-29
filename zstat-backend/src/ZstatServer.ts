import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import { buildSchema } from "type-graphql";
import { createLogger, Logger } from "winston";
import { Console } from "winston/lib/winston/transports";

import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Partional } from "@zstat/types";

import { DEFAULT_MIDDLEWARE, defaultNotFoundHandler } from "./middleware";

/**
 * An interface of available server options.
 */
export interface ServerOptions {
	level: string;
	port: number;
	enablePlayground: boolean;
}

/**
 * The default server options.
 */
export const DEFAULT_OPTIONS: ServerOptions = {
	port: 8080,
	level: "http",
	enablePlayground: false,
};

/**
 * A generic HTTP server implementation.
 */
export class ZstatServer {
	/**
	 * The server options. Used when creating the HTTP listener.
	 */
	readonly options: ServerOptions;

	/**
	 * The Express application used for handling requests.
	 */
	readonly express = express();

	/**
	 * The HTTP server used for serving requests.
	 */
	readonly http = createServer(this.express);

	/**
	 * The prisma database backend.
	 */
	readonly prisma = new PrismaClient();

	/**
	 * The winston logger used for logging to console.
	 */
	readonly logger: Logger;

	constructor(options: Partional<ServerOptions>) {
		// configure default options.
		this.options = { ...DEFAULT_OPTIONS, ...options };
		// create the winston logger
		this.logger = createLogger({ transports: [new Console()], level: this.options.level });
	}

	/**
	 * Set up the express application, plus any extra middleware.
	 */
	useDefaultMiddleware() {
		// add middleware
		DEFAULT_MIDDLEWARE.forEach((v) => v(this));
		return this;
	}

	/**
	 * Set up the prisma database backend.
	 */
	async setupPrisma() {
		this.logger.verbose("Setting up Prisma database...");
		// connect to database
		await this.prisma.$connect();
		// build the schema
		this.logger.debug("Building GraphQL schema...");
		const schema = await buildSchema({
			resolvers,
			validate: false,
		});
		// create the apollo server
		this.logger.debug("Attaching GraphQL middleware...");
		const server = new ApolloServer({
			schema,
			playground: this.options.enablePlayground,
			introspection: this.options.enablePlayground,
			// declare prisma as context
			context: () => ({ prisma: this.prisma }),
		});
		server.applyMiddleware({ app: this.express });
	}

	/**
	 * Start the server listening on the target port.
	 */
	async listen() {
		// add default not found handler
		defaultNotFoundHandler(this);

		// start listening on port specified in options.
		this.logger.info("Listening on port " + this.options.port);
		this.http.listen(this.options.port);
	}
}
