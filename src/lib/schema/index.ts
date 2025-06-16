import { Media, Article, User } from "@/payload-types";

// import type{} from ""

export const ArticleSchema = (props: Article) => {
    
  const image = props.meta?.image as Media;
  const author = props.author as User;
  return {
    "@context": "https://finoblitz.com",
    "@type": "BlogPosting",
    headline: props.title,
    datePublished: new Date(props.createdAt),
    dateModified: new Date(props.updatedAt),
    image: [`${process.env.S3_ENDPOINT}/${image.filename}`],
    author: {
        "@type": "Person",
        name: author.name,
        sameAs: ['https://x.com/FinoBlitz?t=p5qiLi_RN1qqUOyeas5mFA&s=09'],
    },
  };
};


export const imageSchema = (props: Media) => {
    return {
      "@context": "https://finoblitz.com",
      "@type": "ImageObject",
      contentUrl: `${process.env.S3_ENDPOINT}/${props.filename}`,
      alt:props.alt
    }
  }
