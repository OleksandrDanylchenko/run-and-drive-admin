import { css } from '@emotion/react';
import { flexbox, pxToRem } from 'run-and-drive-lib/styles';

export const SignInWrapper = css`
  display: flex;
  align-items: center;
  height: 100vh;
`;

export const FormWrapper = css`
  padding: ${pxToRem('20px')};
`;

export const Title = css`
  font-size: ${pxToRem('27px')};
  font-weight: 500;
`;

export const Form = css`
  ${flexbox({ direction: 'column' })}
`;
