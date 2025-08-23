import { Injectable } from "../../common/decorators/injectable";

@Injectable()
export class UsersService {
  findAll() {
    return {
      data: [{ firstName: "Mart", lastName: "Salazar" }],
    };
  }
}
