import { css } from '@emotion/react';
import { theme } from '@expo/styleguide';
import * as React from 'react';

import { paragraph } from './typography';

const attributes = {
  'data-text': true,
};

const STYLES_UNORDERED_LIST = css`
  ${paragraph}
  list-style: disc;
  margin-left: 1rem;
  margin-bottom: 1rem;

  .anchor-icon {
    display: none;
  }
`;

export const UL: React.FC = ({ children }) => (
  <ul {...attributes} css={STYLES_UNORDERED_LIST}>
    {children}
  </ul>
);

// TODO(jim): Get anchors working properly for ordered lists.
const STYLES_ORDERED_LIST = css`
  ${paragraph}
  list-style: decimal;
  margin-left: 1rem;
  margin-bottom: 1rem;

  .anchor-icon {
    display: none;
  }
`;

export const OL: React.FC = ({ children }) => (
  <ol {...attributes} css={STYLES_ORDERED_LIST}>
    {children}
  </ol>
);

const STYLES_LIST_ITEM = css`
  padding: 0.25rem 0;
  :before {
    font-size: 130%;
    line-height: 0;
    margin: 0 0.5rem 0 -1rem;
    position: relative;
    color: ${theme.text.default};
  }

  > div {
    display: inline;
  }
`;

const STYLE_RETURN_LIST = css`
  list-style-type: '⇒';
  padding-left: 0.5rem;
`;

type LIProps = {
  returnType?: boolean;
};

export const LI: React.FC<LIProps> = ({ children, returnType }) => {
  return (
    <li css={[STYLES_LIST_ITEM, returnType && STYLE_RETURN_LIST]} className="docs-list-item">
      {children}
    </li>
  );
};
