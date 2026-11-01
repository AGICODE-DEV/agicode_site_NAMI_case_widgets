import { styled } from '@linaria/react';
import type { PropsWithChildren } from 'react';

const Root = styled.div`
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
`;

/** Neutral slot for a case widget; deliberately contains no demo UI. */
export function WidgetRoot({ children }: PropsWithChildren) {
  return <Root>{children}</Root>;
}
