import { styled } from '@linaria/react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type DemoId = 'orders';

interface FrameOptions {
  filename: string;
  title: string;
  initialHeight: number;
  minimumHeight: number;
  eventType: string;
}

const DEMOS: Record<DemoId, FrameOptions> = {
  orders: {
    filename: 'orders.html',
    title: 'NAMI — интерактивная система заказов',
    initialHeight: 840,
    minimumHeight: 100,
    eventType: 'nami-preview-height',
  },

};

const Frame = styled.iframe`
  display: block;
  width: 100%;
  min-width: 0;
  border: 0;
  background: #fff;
`;

export interface NamiWidgetProps {
  /** URL prefix containing the orders demo HTML file. */
  assetBasePath?: string;
  className?: string;
  style?: CSSProperties;
}

interface NamiDemoFrameProps extends NamiWidgetProps {
  demo: DemoId;
}

/**
 * The supplied case embeds self-contained, already-built browser demos.
 * Keep them intact in sandboxed frames to preserve their interactions.
 */
export function NamiDemoFrame({
  demo,
  assetBasePath = '/nami-widgets',
  className,
  style,
}: NamiDemoFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const heightRef = useRef(DEMOS[demo].initialHeight);
  const [height, setHeight] = useState(DEMOS[demo].initialHeight);
  const options = DEMOS[demo];
  const src = assetBasePath.replace(/\/$/, '') + '/' + options.filename;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onMessage = (event: MessageEvent) => {
      // The sandbox origin is opaque. Compare the exact contentWindow
      // and validate the expected message type and finite numeric height.
      if (event.source !== frame.contentWindow || event.data?.type !== options.eventType) return;
      const measured = Number(event.data?.height);
      if (!Number.isFinite(measured) || measured < 100) return;
      const next = Math.min(6000, Math.max(options.minimumHeight, Math.ceil(measured)));
      if (Math.abs(next - heightRef.current) > 2) {
        heightRef.current = next;
        setHeight(next);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [options.eventType, options.minimumHeight]);

  useEffect(() => {
    heightRef.current = options.initialHeight;
    setHeight(options.initialHeight);
  }, [demo, options.initialHeight]);

  useEffect(() => {
    if (demo !== 'orders') return;
    const frame = frameRef.current;
    if (!frame) return;
    let raf = 0;

    const sendVisibleViewport = () => {
      raf = 0;
      if (!frame.contentWindow) return;
      const rect = frame.getBoundingClientRect();
      const top = Math.max(0, -rect.top);
      const bottom = Math.min(rect.height, window.innerHeight - rect.top);
      if (bottom > top) {
        frame.contentWindow.postMessage(
          { type: 'nami-visible-viewport', top, height: bottom - top }, '*',
        );
      }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(sendVisibleViewport); };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(frame);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    frame.addEventListener('load', schedule);
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      frame.removeEventListener('load', schedule);
    };
  }, [demo]);

  return (
    <Frame
      key={demo}
      ref={frameRef}
      src={src}
      title={options.title}
      className={className}
      style={{ ...style, height }}
      loading="eager"
      sandbox="allow-scripts allow-forms allow-downloads"
      referrerPolicy="no-referrer"
    />
  );
}

export function OrdersWidget(props: NamiWidgetProps) {
  return <NamiDemoFrame demo="orders" {...props} />;
}

