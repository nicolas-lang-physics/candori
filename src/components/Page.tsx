import {Button} from "./Button.tsx";
import {PageContent} from "./PageContent.tsx";

export interface InstructionCardProps {
  title?: string;
  text?: string;
  onNext?: () => void;
}

export function Page({ title, text, onNext }: InstructionCardProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: "0 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0 0" }}>
        <span style={{ font: "500 20px/1 var(--font-sans)", letterSpacing: "-0.01em", color: "var(--ink)" }}>
          candori
        </span>
                Here could be something.
            </div>
            <PageContent title={title} text={text} />
            <div style={{ padding: "0 0 40px", display: "flex", flexDirection: "column", gap: 20 }}>
                <Button variant="primary" size="lg" onClick={onNext} style={{ width: "100%", justifyContent: "center" }}>
                    {"Next"}
                </Button>
            </div>
        </div>
    );
}
