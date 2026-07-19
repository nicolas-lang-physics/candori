export interface SoftTimerProps {
  /** 0..1 elapsed fraction */
  progress?: number;
  /** framing text — anti-self-censorship, never competitive */
  label?: string;
  style?: React.CSSProperties;
}
export declare function SoftTimer(props: SoftTimerProps): JSX.Element;
