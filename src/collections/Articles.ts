import { isAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",

  access: {
    read: ({ req }) => {
      if (isAdmin(req.user)) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
    create: ({ req }) => isAdmin(req.user),
    delete: ({ req }) => isAdmin(req.user),
    update: ({ req }) => isAdmin(req.user),
  },

  admin: {
    useAsTitle: "title",
    hidden: ({ user }) => !isAdmin(user),
    defaultColumns: ["title", "author", "_status", "read-time", "isTrending"],
  },

  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
      schedulePublish: false,
      validate: false,
    },
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 60,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      maxLength: 40,
      admin: {
        position: "sidebar",
        description:
          'URL-friendly version of the title (e.g., "my-article-title")',
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      maxLength: 150,
    },
    {
      name: "poster",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "isPrivate",
      label: "Private",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "If checked, this article will be private and not show to anyone",
      },
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description: "Write the article content here",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "isTrending",
      type: "checkbox",
      defaultValue: false,
      label: "Trending",
    },
    {
      name: "read-time",
      label: "Time to read this post (min)",
      type: "number",
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (typeof data !== "object") return data;

        // Use title as slug if slug is missing
        if (!data.slug && data.title) {
          data.slug = data.title;
        }

        // Replace spaces with hyphens
        if (data.slug) {
          data.slug = data.slug
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
        }

        return data;
      },
    ],
  },
};
