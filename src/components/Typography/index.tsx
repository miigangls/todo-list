import type { HTMLAttributes } from "react";
import { variants, ElementStyled } from './style';
import "../../index.css";

interface TypographyInterface extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
  "type-element": "TitleLarge" | "SubtitleLarge" | "SubtitleMedium" | "Body" | "Caption";
}

const htmlElementType: Record<TypographyInterface["type-element"], string> = {
  TitleLarge: "h2",
  SubtitleLarge: "h3",
  SubtitleMedium: "h4",
  Body: "p",
  Caption: "p",
};

const Typography = (props: TypographyInterface) => {
  const variant = { html: htmlElementType[props["type-element"]], css: variants[props["type-element"]] };

  const ElementHtml = ElementStyled(variant);

  return <ElementHtml {...props} />;
};


export default Typography;