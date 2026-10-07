import type { ReactNode } from "react";
import { Button } from "./Button";
import { MetaLabel } from "./MetaLabel";
import { Screen, ScreenFooter, ScreenHeader } from "./Screen";
import { Wordmark } from "./Wordmark";

export interface IntroPageProps {
  title: ReactNode;
  text: string | ReactNode;
  /** Small label at the top right */
  header?: string;
  buttonText: string;
  narrowBody?: boolean;
  showWordMark?: boolean;
  onNext: () => void;
}

/** Title + paragraph + one big button. Used by Home and the instructions. */
export function IntroPage({ title, text, header, buttonText, narrowBody, showWordMark, onNext }: IntroPageProps) {
  return (
    <Screen
      header={<ScreenHeader left={showWordMark ? <Wordmark /> : null} right={header ? <MetaLabel>{header}</MetaLabel> : null} />}
      bodyStyle={{ gap: 32, padding: "48px 0" }}
      footer={
        <ScreenFooter>
          <Button variant="primary" size="lg" fullWidth onClick={onNext}>
            {buttonText}
          </Button>
        </ScreenFooter>
      }
    >
      <div style={{ font: "var(--type-display)", letterSpacing: "var(--tracking-display)", color: "var(--ink)" }}>
        {title}
      </div>
      <div style={{ ...(narrowBody ? { maxWidth: "26rem" } : {} ), font: "var(--type-body)", color: "var(--text-secondary)" }}>{text}</div>
    </Screen>
  );
}
