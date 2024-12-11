import styled from "styled-components";

const margin = `margin: 0`;

const variants = {
  TitleLarge: `
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
  `,
  SubtitleLarge: `
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
  `,
  SubtitleMedium: `
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17.5px;
  `,
  Body: `
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17.5px;
  `,
  Caption: `
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
  `,
};

const ElementStyled = (props: { html: string; css: string }) => {
  const { html, css } = props;
  console.log(html);
  console.log(css);

  const component = styled(html as "h2" | "h4" | "p" | "span")`
    font-family: "Open Sans";
    font: inherit;
    width: fit-content;
    color: ${({ theme }) => `#262626`};
    ${css};
  `;

  return component;
};

export { variants, ElementStyled };
