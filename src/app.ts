import express from "express";
import usersModule from "./modules/users/users.module";
import { modules } from "./modules/main";

export function createApp() {
  const app = express();

  app.use(express.json());

  // Register modules (each is a Router with prefix from @Controller)
  for (const module of modules) {
    app.use(module);
  }

  return app;
}
