import { S3_ENDPOINT } from "@/constant";
import { Media, Article, User } from "@/payload-types";

export const ArticleSchema = (props: Article) => {
  const image = props.meta?.image as Media;
  const author = props.author as User;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: props.title,
    datePublished: new Date(props.createdAt).toISOString(),
    dateModified: new Date(props.updatedAt).toISOString(),
    image: [`${S3_ENDPOINT}/${image.filename}`],
    author: {
      "@type": "Person",
      name: author.name,
      sameAs: [
        "https://x.com/FinoBlitz?t=p5qiLi_RN1qqUOyeas5mFA&s=09"
      ]
    },
    publisher: {
      "@type": "Organization",
      name: "FinoBlitz",
      logo: {
        "@type": "ImageObject",
        url: "https://finoblitz.com/assets/logo.png" 
      }
    }
  };
};

/**
 * Schema for image objects (used in articles or galleries)
 */
export const imageSchema = (props: Media) => {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${S3_ENDPOINT}/${props.filename}`,
    description: props.alt || ""
  };
};

/**
 * Global Logo/Organization schema (for homepage)
 */
export const LogoSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FinoBlitz",
  url: "https://finoblitz.com",
  logo: "https://finoblitz.com/assets/logo.png", 
  sameAs: [
    "https://x.com/FinoBlitz",
  ]
};
