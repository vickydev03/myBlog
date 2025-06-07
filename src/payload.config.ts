// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { s3Storage } from "@payloadcms/storage-s3";
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
    livePreview: {
      collections: ["articles"],
      url: ({ data }) => {
        return `${process.env.NEXT_PUBLIC_APP_URL}/post/${data.slug}`; // Adjust based on your frontend route
      },
      breakpoints: [
        {
          name: "desktop",
          label: "desktop",
          width: 1440,
          height: 1080,
        },
        {
          name: "mobile",
          label: "mobile",
          width: 375,
          height: 667,
        },
        {
          name: "ipad",
          label: "iPad",
          width: 768,
          height: 1024,
        },
      ],
    },
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
    s3Storage({
      collections: { media: true },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECREAT || "",
        },
        region: "auto",
        endpoint:process.env.S3_ENDPOINT||''
      },
    }),
    payloadCloudPlugin(),
    seoPlugin({
      collections: ["articles", "categories"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.description,
      generateURL: ({ doc, collectionSlug }) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        if (collectionSlug === "articles") {
          return `${baseUrl}/post/${doc.slug}`;
        }

        if (collectionSlug === "categories") {
          return `${baseUrl}/category/${doc.slug}`;
        }

        return baseUrl;
      },
      tabbedUI: true,
    }),
  ],

  // onInit: async (payload) => {
  //   await payload.update({
  //     collection: "articles",
  //     where: {},
  //     data: { _status: "published" },
  //   });
  // },
});
