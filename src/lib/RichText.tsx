// import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";

// interface RichTextProps {
//   data: SerializedEditorState;
//   className?: string;
// }

// export function RichText({ data, className, ...rest }: RichTextProps) {
//   return <RichTextConverter data={data} className={className} {...rest} />;
// }

"use client";
import { useEffect, useRef } from "react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";

interface RichTextProps {
  data: SerializedEditorState;
  className?: string;
}

export function RichText({ data, className }: RichTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images = containerRef.current?.querySelectorAll("img");
    images?.forEach((img) => {
      img.classList.add("shadow-lg,rounded-lg")
      
      img.setAttribute("loading", "lazy");
    });
  }, [data]);

  return (
    <div ref={containerRef} className={className}>
      <RichTextConverter data={data} />
    </div>
  );
}
