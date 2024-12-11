import { variants, ElementStyled } from './style';
import "../../index.css";

interface TypographyInterface {
  propsElement?: React.HTMLAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLParagraphElement> & React.HTMLAttributes<HTMLSpanElement>;
  typeElement: "TitleLarge" | "SubtitleLarge" | "SubtitleMedium" | "Body" | "Caption";
  htmlElement: 'h2' | 'h4' | 'p' | 'span';
}


enum htmlElementType {
  TitleLarge = "h2",
  SubtitleLarge = "h3",
  SubtitleMedium = "h4",
  Body = "p",
  Caption = "p",
}

const Typography = (props: TypographyInterface) => {
  const { typeElement, htmlElement, propsElement } = props;

  const variant = { html: htmlElementType[typeElement], css: variants[typeElement] };

  const ElementHtml = ElementStyled(variant);

  return <ElementHtml {...props} {...propsElement} />;
};


export default Typography;