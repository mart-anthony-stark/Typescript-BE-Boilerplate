import "reflect-metadata";
import { NextFunction, Request, Response, Router } from "express";
import { resolve } from "../di/container";

type HttpMethod = "get" | "post" | "put" | "delete";

interface RouteDefinition {
  path: string;
  requestMethod: HttpMethod;
  methodName: string;
}

// Factory for decorators
function createMethodDecorator(method: HttpMethod) {
  return (path: string = "/"): MethodDecorator => {
    return (target, propertyKey) => {
      const routes: RouteDefinition[] =
        Reflect.getMetadata("routes", target.constructor) || [];

      routes.push({
        requestMethod: method,
        path,
        methodName: propertyKey as string,
      });

      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };
}

export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Delete = createMethodDecorator("delete");

export function createRouter(ControllerClass: any): Router {
  const router = Router();

  const controller = resolve(ControllerClass);

  const prefix = Reflect.getMetadata("prefix", ControllerClass) || "";
  const routes: RouteDefinition[] =
    Reflect.getMetadata("routes", ControllerClass) || [];

  for (const route of routes) {
    const { requestMethod, path, methodName } = route;

    (router as any)[requestMethod](
      prefix + path,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const result = await (controller as any)[methodName](req, res, next);

          if (result !== undefined && !res.headersSent) {
            res.json(result);
          }
        } catch (error) {
          next(error);
        }
      }
    );
  }

  return router;
}
