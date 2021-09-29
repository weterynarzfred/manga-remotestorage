/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

function deepClone<T>(source: T): T {
  if (!source || ["string", "boolean", "number"].includes(typeof source))
    return source;
  const result: any = Array.isArray(source) ? [] : {};
  for (const key in source) {
    result[key] =
      typeof source[key] === "object" ? deepClone(source[key]) : source[key];
  }
  return result;
}

export { deepClone };
