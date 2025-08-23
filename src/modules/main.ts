import { Router } from "express";
import usersModule from "./users/users.module";

// Explicitly type it as an array of Routers
export const modules: Router[] = [usersModule];
