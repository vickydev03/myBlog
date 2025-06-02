// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";

import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Tags } from "./collections/Tags";
import { Articles } from "./collections/Articles";
import { Categories } from "./collections/Categories";
import { seoPlugin } from "@payloadcms/plugin-seo";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {},
  },
  collections: [Users, Media, Categories, Tags, Articles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ["articles"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.description,
      tabbedUI: true,
    }),
  ],
});
