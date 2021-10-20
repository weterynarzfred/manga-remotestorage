/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

async function electronFetch(url: string, options: any): Promise<any> {
  const id = Math.random().toString(36).substr(2);
  console.log("renderer fetch", id);

  const promise = new Promise((resolve) => {
    const unsubscribe = (window as any).api.subscribe(
      "fetch-done",
      (data: any) => {
        if (data.id !== id) return;
        unsubscribe();
        resolve(data.data);
      }
    );
  });

  (window as any).api.send("fetch", {
    url,
    options,
    id,
  });

  return promise;
}

export { electronFetch };
