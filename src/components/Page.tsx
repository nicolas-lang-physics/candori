import {Button} from "./Button.tsx";
import {PageContent} from "./PageContent.tsx";

export interface InstructionCardProps {
  title?: string;
  text?: string;
  header?: string;
  onNext?: () => void;
  buttonText?: string;
}

export function Page({ title, text, header, onNext, buttonText = "Next" }: InstructionCardProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0 0" }}>
                {/*<span style={{ font: "500 20px/1 var(--font-sans)", letterSpacing: "-0.01em", color: "var(--ink)" }}>
                  candori
                </span>*/}
                <span
                    style={{
                        font: "var(--type-meta)",
                        letterSpacing: "var(--tracking-meta)",
                        textTransform: "uppercase",
                        color: "var(--text-meta)",
                        marginTop: "5px",
                    }}
                >
                {header}
                </span>
            </div>
            <PageContent title={title} text={text} />
            <div style={{ padding: "0 0 20px" /*padding: "0 0 40px", display: "flex", flexDirection: "column", gap: 20*/ }}>

                <Button variant="primary" size="lg" onClick={onNext} style={{ width: "100%", justifyContent: "center" }}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}
