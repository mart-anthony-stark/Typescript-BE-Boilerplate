import { Request, Response } from "express";
import { Get } from "../../common/factories/route";
import { Controller } from "../../common/decorators/controller";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("/")
  getUsers(req: Request, res: Response) {
    return this.usersService.findAll();
  }
}
