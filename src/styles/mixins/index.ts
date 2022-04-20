import { css } from '@emotion/react';
import { Property } from 'csstype';

// https://allyjs.io/tutorials/hiding-elements.html#2017-edition-of-visuallyhidden
export const visuallyHidden = css`
  &:not(:focus):not(:active) {
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;

    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`;

export const flexbox = (options: {
  display?: Property.Display;
  direction?: Property.FlexDirection;
  placeContent?: Property.PlaceContent;
  placeItems?: Property.PlaceItems;
  wrap?: Property.FlexWrap;
  shrink?: Property.FlexShrink;
  grow?: Property.FlexGrow;
  alignContent?: Property.AlignContent;
  justifyContent?: Property.JustifyContent;
  alignItems?: Property.AlignItems;
  justifyItems?: Property.JustifyItems;
  gap?: Property.Gap;
}) => css`
  display: ${options.display || 'flex'};
  flex-direction: ${options.direction || 'row'};

  ${options.placeContent
    ? css`
        place-content: ${options.placeContent};
      `
    : css`
        align-content: ${options.alignContent};
        justify-content: ${options.justifyContent};
      `}

  ${options.placeItems
    ? css`
        place-items: ${options.placeContent};
      `
    : css`
        align-items: ${options.alignItems};
        justify-items: ${options.justifyItems};
      `}

  flex-wrap: ${options.wrap || 'nowrap'};
  flex-shrink: ${options.shrink};
  flex-grow: ${options.grow};
  gap: ${options.gap};
`;
