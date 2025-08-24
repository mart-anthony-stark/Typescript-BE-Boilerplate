import "reflect-metadata";
import { RequestHandler } from "express";

export function Use(
  middleware: RequestHandler
): MethodDecorator & ClassDecorator {
  return (target: any, propertyKey?: string | symbol) => {
    if (propertyKey) {
      // Route-level middleware
      const middlewares =
        Reflect.getMetadata("middlewares", target.constructor, propertyKey) ||
        [];

      middlewares.push(middleware);
      Reflect.defineMetadata(
        "middlewares",
        middlewares,
        target.constructor,
        propertyKey
      );
    } else {
      // Controller-level middleware
      const middlewares = Reflect.getMetadata("middlewares", target) || [];
      middlewares.push(middleware);
      Reflect.defineMetadata("middlewares", middlewares, target);
    }
  };
}
