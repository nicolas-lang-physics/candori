export interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  /** called on Enter */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}
export declare function TextInput(props: TextInputProps): JSX.Element;
