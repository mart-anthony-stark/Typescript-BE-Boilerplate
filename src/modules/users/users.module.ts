import { registerService } from "@common/di/container";
import { createRouter } from "@common/factories/route";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

// Make sure the service is registered in the container
registerService(UsersService.name, new UsersService());

// Export the router
export default createRouter(UsersController);
