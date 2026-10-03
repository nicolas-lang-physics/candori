
export interface PageContentProps {
  title?: string;
  text?: string;
}

export function PageContent({ title, text }: PageContentProps) {
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32, padding: "48px 0" }}>
            <div style={{ font: "var(--type-display)", letterSpacing: "var(--tracking-display)", color: "var(--ink)" }}>
                {title}
            </div>
            <div style={{ font: "var(--type-body)", color: "var(--text-secondary)", maxWidth: "26rem" }}>{text}</div>
        </div>
    );
}
