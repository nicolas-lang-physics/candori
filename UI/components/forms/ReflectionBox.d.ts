export interface ReflectionBoxProps {
  /** the single reflection question */
  prompt?: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function ReflectionBox(props: ReflectionBoxProps): JSX.Element;
