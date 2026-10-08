import type { CSSProperties, ReactNode, Ref } from "react";

export interface ScreenProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  /** For screens that scroll the body programmatically */
  bodyRef?: Ref<HTMLDivElement>;
  bodyStyle?: CSSProperties;
}

/**
 * The page layout every screen shares: header on top, footer pinned to the
 * bottom, and a body between them that centers its content and scrolls when
 * it doesn't fit. Adjust page margins and spacing here only.
 */
export function Screen({ header, footer, children, bodyRef, bodyStyle }: ScreenProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 6px" }}>
      {header}
      <div
        ref={bodyRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          justifyContent: "center",
          padding: "32px 0px",
          ...bodyStyle,
        }}
      >
        {children}
      </div>
      {footer}
    </div>
  );
}

export function ScreenHeader({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "28px 0 0" }}>
      {left}
      {right}
    </div>
  );
}

/** Bottom action area. `row` lays buttons out side by side, right-aligned. */
export function ScreenFooter({ children, row, style }: { children: ReactNode; row?: boolean; style?: CSSProperties }) {
  return (
    <div
      style={{
        padding: "0 0 20px",
        ...(row ? { display: "flex", gap: 16, justifyContent: "flex-end" } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
