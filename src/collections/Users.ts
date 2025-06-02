import { isAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
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
    },{
      name:"image",
      relationTo:"media",
      type:"upload"
    },{
      name:"name",
      type:"text"
    }
  ],
}
