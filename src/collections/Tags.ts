import { isAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
    hidden: ({ user }) => !isAdmin(user),
  },
  access: {
    read: () => true,
    create: ({ req }) => isAdmin(req.user),
    delete: ({ req }) => isAdmin(req.user),
    update: ({ req }) => isAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "article",
      type: "relationship",
      relationTo: "articles",
      hasMany: true,
    },
  ],
};
