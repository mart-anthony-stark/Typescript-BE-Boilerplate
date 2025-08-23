import "reflect-metadata";

const container = new Map<string, any>();

export function registerService<T>(token: string, instance: T) {
  if (!container.has(token)) {
    container.set(token, instance);
  }
}

export function getService<T>(token: string): T {
  const instance = container.get(token);
  if (!instance) {
    throw new Error(`Service ${token} not found`);
  }
  return instance as T;
}

export function resolve<T>(target: new (...args: any[]) => T): T {
  const paramTypes: any[] =
    Reflect.getMetadata("design:paramtypes", target) || [];
  const params = paramTypes.map((param) => getService(param.name));
  return new target(...params);
}
