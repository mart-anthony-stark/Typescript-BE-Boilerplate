import { modules } from "@modules/main";
import config from "config";
import express from "express";

export function createApp() {
  const app = express();

  // Register global middlewares
  for (const middleware of config.middlewares) {
    app.use(middleware);
  }

  // Register modules (each is a Router with prefix from @Controller)
  for (const module of modules) {
    app.use(module);
  }

  return app;
}
