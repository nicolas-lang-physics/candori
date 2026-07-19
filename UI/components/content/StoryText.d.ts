export interface StoryWord { text: string; by: 'user' | 'ai'; pending?: boolean; }
export interface StoryTextProps {
  words?: StoryWord[];
  /** show a soft caret at the end while the story is alive */
  cursor?: boolean;
  style?: React.CSSProperties;
}
export declare function StoryText(props: StoryTextProps): JSX.Element;
