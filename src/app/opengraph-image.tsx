import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.name} — auto center e troca de óleo em Montes Claros`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#15191f",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          borderLeft: "16px solid #d72828",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", background: "#d72828", padding: "10px 18px", fontSize: 40, fontWeight: 900 }}>CM</div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, letterSpacing: 4 }}>MULTI LUBRIFICANTES</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>Seu auto center</div>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.05, textTransform: "uppercase", color: "#f05252" }}>em Montes Claros.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.7)", letterSpacing: 3 }}>
          TROCA DE ÓLEO · LUBRIFICANTES · FILTROS · AR-CONDICIONADO
        </div>
      </div>
    ),
    size,
  );
}
