import { isAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
    create: ({ req }) => isAdmin(req.user),
    delete: ({ req }) => isAdmin(req.user),
    update: ({ req }) => isAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    hidden: ({ user }) => !isAdmin(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
   
  ],
};
