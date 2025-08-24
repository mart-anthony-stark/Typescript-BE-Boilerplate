import { loggerMiddleware } from "@common/middlewares/logger.middleware";
import express, { RequestHandler } from "express";

const config: {
  middlewares: RequestHandler[];
} = {
  middlewares: [express.json(), loggerMiddleware],
};

export default config;
