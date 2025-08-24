import { Controller } from "@common/decorators/controller";
import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { Get } from "@common/factories/route";
import { Use } from "@common/decorators/middleware";

@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/")
  findAll(req: Request, res: Response) {
    return this.usersService.findAll();
  }
}
