import "reflect-metadata";
import { getService, registerService } from "../di/container";

export function Injectable(token?: string): ClassDecorator {
  return (target: any) => {
    const serviceToken = token || target.name;
    // Register as singleton
    registerService(serviceToken, new target());
  };
}

export function Inject(token?: string): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    const serviceToken = token || type.name;

    Object.defineProperty(target, propertyKey, {
      get: () => getService(serviceToken),
      enumerable: true,
      configurable: true,
    });
  };
}
