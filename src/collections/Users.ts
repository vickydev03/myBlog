import { isAdmin } from '@/lib/access';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => !isAdmin(user),
  },
  auth: {
    cookies: {
      ...(process.env.NODE_ENV !== "development" && {
        sameSite: "None",
        domain: process.env.NEXT_PUBLIC_APP_URL,
        secure: true,
      }),
    },
    maxLoginAttempts: 20, 
    lockTime: 0,           
  },access: {
    read: () => true,
    create: ({ req }) => isAdmin(req.user),
    delete: ({ req }) => isAdmin(req.user),
    update: ({ req, id }) => {
      if (isAdmin(req.user)) return true;

      // it will allow the user to update theier info themself
      return req.user?.id === id;
    },
  },
  fields: [
    {
      admin: {
        position: "sidebar",
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["admin", "user"],
      access: {
        update: ({ req }) => isAdmin(req.user),
      },
    },
    {
      name: "image",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "name",
      type: "text",
    },
  ],
};
