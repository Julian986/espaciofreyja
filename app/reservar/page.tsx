import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar turno | Espacio Freyja",
  description: "Próximamente: reserva de turnos online.",
};

export default function ReservarPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 5%",
        fontFamily: "'Segoe UI', sans-serif",
        background: "#FAFAFA",
        color: "#333",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#333",
          textDecoration: "none",
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        <span aria-hidden style={{ fontSize: "1.25rem", lineHeight: 1 }}>
          ←
        </span>
        Volver al inicio
      </Link>
      <p style={{ marginTop: "3rem", maxWidth: 520, lineHeight: 1.7, fontSize: "1.05rem" }}>
        Esta página es un adelanto: aquí irá la sección para <strong>reservar turnos</strong>. Por ahora no hay
        funcionalidad; sirve para visualizar la futura navegación del sitio.
      </p>
    </div>
  );
}
