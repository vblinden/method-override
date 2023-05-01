import { MiddlewareHandlerContext } from "./deps.ts";

export async function methodOverride(
  request: Request,
  context: MiddlewareHandlerContext,
) {
  const clone = request.clone();

  const { pathname } = new URL(clone.url);
  if (["_frsh", ".ico"].some((part) => pathname.includes(part))) {
    return await context.next();
  }

  try {
    const form = await clone.formData();
    if (!form.has("_method")) return await context.next();

    const method = form.get("_method")!.toString().toUpperCase();
    const headers: Record<string, string> = {};
    clone.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const body: Record<string, string> = {};
    form.forEach((value, key) => {
      if (key === "_method") return;
      body[key] = value.toString();
    });

    return await fetch(clone.url, {
      headers: {
        ...headers,
      },
      method: method,
      body: new URLSearchParams(body),
    });
  } catch {
    return await context.next();
  }
}
