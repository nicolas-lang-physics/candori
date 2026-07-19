export interface GlowSurfaceProps {
  /** 0 (calm) to 1 (full flow) — typically driven by typing WPM */
  heat?: number;
  radius?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function GlowSurface(props: GlowSurfaceProps): JSX.Element;
