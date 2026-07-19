/** @startingPoint section="Content" subtitle="Philosophy provocation card" viewport="700x260" */
export interface LessonCardProps {
  /** small uppercase label above the text */
  kicker?: string;
  /** the 3–4 sentence provocation */
  text?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function LessonCard(props: LessonCardProps): JSX.Element;
