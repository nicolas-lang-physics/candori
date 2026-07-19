/** @startingPoint section="Core" subtitle="Pill button — primary, quiet, ghost" viewport="700x180" */
export interface ButtonProps {
  variant?: 'primary' | 'quiet' | 'ghost';
  size?: 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
