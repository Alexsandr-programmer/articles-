import { headers } from "next/headers";
import { auth, Session } from "./auth";
import { cache } from "react";

export const getServerSession = cache(async (): Promise<Session | null> => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});
