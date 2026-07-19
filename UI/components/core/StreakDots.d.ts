export interface StreakDotsProps {
  /** current streak day count */
  day?: number;
  /** last 7 days, oldest first — true = practiced */
  week?: boolean[];
  style?: React.CSSProperties;
}
export declare function StreakDots(props: StreakDotsProps): JSX.Element;
