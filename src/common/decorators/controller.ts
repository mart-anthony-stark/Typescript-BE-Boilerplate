import "reflect-metadata";

export function Controller(prefix: string = "/"): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata("prefix", prefix, target);
    // Ensure routes metadata exists (even if no methods decorated yet)
    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
}
