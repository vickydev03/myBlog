import { isAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

// 👇 Define the correct type manually
const uploadConfig = {
  staticDir: "media",
  staticURL: "/media",
  maxFileSize: 1024 * 1024 * 2,
  imageSizes: [
    {
      name: "og",
      width: 1200,
      height: 630,
      crop: "center",
    },
  ],
} as unknown as NonNullable<CollectionConfig["upload"]>;

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    delete: ({ req }) => isAdmin(req.user),
  },
  upload: uploadConfig,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
