/** Marca claramente uma informação que ainda precisa ser confirmada pela empresa. */
export function Pending({ children = "a confirmar", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <span className={`pending ${className}`}>{children}</span>;
}
