export interface WordChipProps {
  word: string;
  /** who said it — colors the word */
  by?: 'user' | 'ai';
  /** streaming / not yet settled */
  pending?: boolean;
  style?: React.CSSProperties;
}
export declare function WordChip(props: WordChipProps): JSX.Element;
