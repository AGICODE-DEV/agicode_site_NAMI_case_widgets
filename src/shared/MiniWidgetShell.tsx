import type { CSSProperties, ComponentType } from "react";
import { WidgetSurface } from "./WidgetParts";
import type { ContentProps } from "./WidgetParts";

export interface MiniWidgetProps {
  assetBasePath?: string;
  className?: string;
  style?: CSSProperties;
}

export function MiniWidgetShell({
  Content,
  assetBasePath = "/nami-widgets",
  className,
  style,
}: MiniWidgetProps & { Content: ComponentType<ContentProps> }) {
  const background = `url("${assetBasePath.replace(/\/$/, "")}/images/e6d8202f305842f0.svg")`;
  return (
    <WidgetSurface
      className={className}
      style={
        { ...style, "--nami-chat-background": background } as CSSProperties
      }
    >
      <Content assetBasePath={assetBasePath} />
    </WidgetSurface>
  );
}
