import type { User } from "@/payload-types";
import { ClientUser } from "payload";

export const isAdmin = (user: User | ClientUser | null) => {
  return Boolean(user?.roles?.includes("admin"));
};
