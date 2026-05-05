"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useLayoutEffect, type FormEvent } from "react";

const HOME_SCROLL_RESTORE_KEY = "espaciofreyja-home-scroll-y";

function saveHomeScrollPosition() {
  sessionStorage.setItem(HOME_SCROLL_RESTORE_KEY, String(window.scrollY));
}

type Toast = { id: number; type: "success" | "error"; message: string };

export default function FreyjaPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useLayoutEffect(() => {
    const raw = sessionStorage.getItem(HOME_SCROLL_RESTORE_KEY);
    if (raw == null) return;
    sessionStorage.removeItem(HOME_SCROLL_RESTORE_KEY);
    const y = Number.parseInt(raw, 10);
    if (!Number.isFinite(y) || y < 0) return;
    const apply = () => window.scrollTo({ top: y, left: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      apply();
      requestAnimationFrame(apply);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const showToast = (type: Toast["type"], message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("success", "Consulta enviada con éxito. Nos pondremos en contacto pronto.");
    e.currentTarget.reset();
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("error", "Credenciales inválidas. Contáctenos para obtener acceso.");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap');

        :root {
          --accent: #D6BA8A;
          --carbon: #333;
          --bg: #FAFAFA;
          --card: #FFFFFF;
          --section-alt: #F3F1ED;
          --border-soft: rgba(214, 186, 138, 0.2);
          --shadow: 0 20px 50px rgba(0,0,0,0.08);
        }

        html { scroll-behavior: smooth; }

        .serif {
          font-family: 'IM Fell English', 'Baskerville Old Face', 'Book Antiqua', Palatino, serif;
          font-weight: 400;
          font-synthesis: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Títulos: peso visible; font-synthesis permite negrita sintética solo aquí (IM Fell solo trae 400). */
        .serif-heading {
          font-weight: 700;
          font-synthesis: weight;
        }

        .card-top::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 4px;
          background: #D6BA8A;
        }

        .btn-main {
          background: #333;
          color: #D6BA8A;
          border: 1px solid #D6BA8A;
          padding: 18px;
          cursor: pointer;
          text-transform: uppercase;
          font-weight: bold;
          width: 100%;
          letter-spacing: 1px;
          transition: all 0.3s;
        }
        .btn-main:hover {
          background: #D6BA8A;
          color: #fff;
        }

        .slot {
          display: inline-block;
          padding: 10px;
          border: 1px solid rgba(214, 186, 138, 0.2);
          margin: 4px;
          cursor: pointer;
          min-width: 80px;
          text-align: center;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .slot:hover, .slot.active {
          background: #D6BA8A;
          color: white;
          border-color: #D6BA8A;
        }

        .toast-slide {
          animation: slideInBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes slideInBounce {
          from { transform: translateX(120%) scale(0.8); opacity: 0; }
          to   { transform: translateX(0) scale(1); opacity: 1; }
        }

        input, select, textarea {
          width: 100%;
          padding: 14px;
          margin: 8px 0;
          border: 1px solid rgba(0,0,0,0.1);
          background: #fff;
          color: #333;
          border-radius: 4px;
          font-family: 'Segoe UI', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        input:focus, textarea:focus {
          border-color: #D6BA8A;
        }

        .whatsapp-float {
          position: fixed;
          bottom: 30px; right: 30px;
          width: 60px; height: 60px;
          background: #25d366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          text-decoration: none;
          transition: transform 0.3s;
        }
        .whatsapp-float:hover { transform: scale(1.1); }

        .back-top {
          position: fixed;
          bottom: 105px; right: 38px;
          width: 45px; height: 45px;
          background: #D6BA8A;
          color: white;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9998;
          font-size: 0.85rem;
          transition: opacity 0.4s, visibility 0.4s;
        }

        .map-grayscale { filter: grayscale(1); }

        .hero-wrapper {
          width: 90%;
          margin: 20px auto;
          border: 2px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background-color: #f9f9f9;
          padding: 20px 0;
        }
        .hero-wrapper .hero-logo-img {
          width: 50%;
          height: auto;
          display: block;
        }
        @media (max-width: 768px) {
          .hero-wrapper .hero-logo-img { width: 80%; }
        }
      `}</style>

      <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#FAFAFA", color: "#333", lineHeight: 1.8, margin: 0 }}>

        <div style={{ position: "fixed", top: 25, right: 25, zIndex: 10000, width: 350, pointerEvents: "none" }}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="toast-slide"
              style={{
                position: "relative",
                padding: "18px 25px",
                marginBottom: 15,
                borderRadius: 12,
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 500,
                lineHeight: 1.4,
                display: "flex",
                alignItems: "center",
                gap: 12,
                pointerEvents: "auto",
                boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                backdropFilter: "blur(8px)",
                background: toast.type === "success" ? "rgba(46,204,113,0.95)" : "rgba(231,76,60,0.95)",
                borderLeft: toast.type === "success" ? "6px solid #1e8449" : "6px solid #922b21",
              }}
            >
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{toast.type === "success" ? "✓" : "✕"}</span>
              {toast.message}
            </div>
          ))}
        </div>

        <nav style={{
          padding: "15px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}>
          <a href="#" className="serif" style={{ fontSize: "1.5rem", textDecoration: "none", color: "inherit", letterSpacing: 2 }}>
            FREYJA
          </a>
          <div style={{ display: "flex", gap: 0 }}>
            {[["#filosofia", "Filosofía"], ["#carla", "BIO"], ["#agenda", "Citas"], ["#contacto", "Contacto"]].map(([href, label]) => (
              <a key={href} href={href} style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "0.75rem",
                fontWeight: "bold",
                marginLeft: 20,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}>
                {label}
              </a>
            ))}
          </div>
        </nav>

        <header className="hero-wrapper">
          <Image
            className="hero-logo-img"
            src="https://www.espaciofreyja.com.ar/vectorfreyja.png"
            alt="Freyja Logo"
            width={640}
            height={320}
            priority
            sizes="(max-width: 768px) 80vw, 50vw"
          />
        </header>

        <section id="filosofia" style={{ padding: "80px 8%", maxWidth: 1300, margin: "auto" }}>
          <div style={{ display: "flex", gap: 50, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <h2 className="serif serif-heading" style={{ fontSize: "2.5rem", color: "#D6BA8A", marginTop: 0 }}>
                Nuestra Filosofía
              </h2>
              <p>
                En <strong>Espacio Freyja</strong> cuidamos la piel desde el conocimiento, no desde la moda. Somos un skin bar especializado en análisis facial y acompañamiento consciente.
              </p>
              <div style={{ padding: 30, border: "1px solid #D6BA8A", textAlign: "center", margin: "30px 0" }}>
                <blockquote className="serif" style={{ fontSize: "1.3rem", margin: 0, color: "#D6BA8A" }}>
                  &quot;No tratamos pieles por tendencia. Las tratamos por necesidad real&quot;
                </blockquote>
              </div>
            </div>
            <div className="card-top" style={{
              flex: 1,
              minWidth: 300,
              background: "#fff",
              padding: 40,
              border: "1px solid rgba(214,186,138,0.2)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              borderRadius: 4,
              position: "relative",
            }}>
              <h4 style={{ marginTop: 0, letterSpacing: 2, fontWeight: 700 }}>SISTEMA FREYJA</h4>
              <p>• Análisis previo profundo.<br />• Respeto a la biología cutánea.<br />• Cuidado sostenido en el tiempo.</p>
            </div>
          </div>
        </section>

        <div style={{ backgroundColor: "#F3F1ED", width: "100%" }} id="carla">
          <section style={{ padding: "80px 8%", maxWidth: 1300, margin: "auto" }}>
            <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 300px" }}>
                <h3 className="serif serif-heading" style={{ fontSize: "3rem", margin: 0 }}>Carla Bruni</h3>
                <span style={{ color: "#D6BA8A", letterSpacing: 2, fontSize: "0.9rem" }}>Dermocosmiatra & Esteticista</span>
              </div>
              <div style={{ flex: 1, borderLeft: "2px solid #D6BA8A", paddingLeft: 40 }}>
                <p>Con más de 14 años de experiencia, Carla ha dedicado su carrera a la formación continua en técnicas no invasivas. Su compromiso es acompañar a cada paciente en la comprensión y el cuidado consciente de la salud de su tejido.</p>
                <p>Especializada en <strong>tecnología HIFU</strong> y regeneración, su enfoque busca que cada tratamiento sea una pausa necesaria para la salud cutánea.</p>
              </div>
            </div>
          </section>
        </div>

        <section id="agenda" style={{ padding: "80px 8%", maxWidth: 1300, margin: "auto" }}>
          <h2 className="serif serif-heading" style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: 16 }}>Reserva tu Turno</h2>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Link
              href="/reservar"
              onClick={saveHomeScrollPosition}
              style={{
                display: "inline-block",
                padding: "10px 22px",
                background: "#333",
                color: "#D6BA8A",
                border: "1px solid #D6BA8A",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Reservar turno
            </Link>
          </div>
          <div className="card-top" style={{
            maxWidth: 500,
            margin: "auto",
            background: "#fff",
            padding: 40,
            border: "1px solid rgba(214,186,138,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            borderRadius: 4,
            position: "relative",
          }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h3 className="serif" style={{ color: "#D6BA8A", margin: 0, fontSize: "1.45rem" }}>Acceso Clientes</h3>
              <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 1 }}>Gestione su cita premium</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Contraseña" required />
              <button type="submit" className="btn-main" style={{ marginTop: 10 }}>
                Ingresar al Sistema
              </button>
            </form>
            <p style={{ textAlign: "center", fontSize: "0.85rem", marginTop: 20 }}>
              ¿No tiene cuenta?{" "}
              <a href="#contacto" style={{ color: "#D6BA8A", fontWeight: "bold" }}>Contáctenos</a>{" "}
              para solicitar acceso exclusivo.
            </p>
          </div>
        </section>

        <div style={{ backgroundColor: "#F3F1ED", width: "100%" }} id="contacto">
          <section style={{ padding: "80px 8%", maxWidth: 1300, margin: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <Link
                href="/productos"
                onClick={saveHomeScrollPosition}
                style={{
                  display: "inline-block",
                  padding: "10px 22px",
                  background: "#fff",
                  color: "#333",
                  border: "1px solid rgba(214,186,138,0.5)",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                Ver productos
              </Link>
            </div>
            <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
              <div className="card-top" style={{
                flex: 1,
                minWidth: 300,
                background: "#fff",
                padding: 40,
                border: "1px solid rgba(214,186,138,0.2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
                borderRadius: 4,
                position: "relative",
              }}>
                <h3 className="serif" style={{ color: "#D6BA8A", marginTop: 0, fontSize: "1.45rem" }}>Formulario de Contacto</h3>
                <form onSubmit={handleContactSubmit}>
                  <input type="text" placeholder="Nombre Completo" required />
                  <input type="email" placeholder="Email de contacto" required />
                  <textarea rows={4} placeholder="Escriba su consulta o solicite su cuenta..." required style={{ resize: "vertical" }} />
                  <button type="submit" className="btn-main" style={{ marginTop: 10 }}>
                    Enviar Consulta
                  </button>
                </form>
              </div>

              <div style={{ flex: 1, minWidth: 300 }}>
                <h3 className="serif" style={{ color: "#D6BA8A", marginTop: 0, fontSize: "1.45rem" }}>Ubicación</h3>
                <p>Santiago del Estero 1741 piso 2 Oficina E, Mar del Plata. Atención exclusiva.</p>
                <div style={{ height: 350, background: "#ddd", border: "1px solid rgba(214,186,138,0.2)" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.49123456789!2d-57.548906!3d-37.999812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d94326555555%3A0x123456789abcdef!2sSantiago%20del%20Estero%201741%2C%20B7600%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1707500000000!5m2!1ses!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    className="map-grayscale"
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación Espacio Freyja"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section style={{ padding: "80px 8%", maxWidth: 1300, margin: "auto" }}>
          <div className="card-top" style={{
            border: "1px solid #D6BA8A",
            background: "rgba(214,186,138,0.05)",
            display: "flex",
            alignItems: "center",
            gap: 30,
            flexWrap: "wrap",
            padding: 40,
            boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
            borderRadius: 4,
            position: "relative",
          }}>
            <div style={{ fontSize: "3rem", color: "#D6BA8A" }}>🅿</div>
            <div>
              <h3 className="serif" style={{ margin: 0, color: "#D6BA8A", fontSize: "1.45rem" }}>Estacionamiento de cortesía</h3>
              <p style={{ margin: "5px 0" }}>
                Disponemos de estacionamiento gratuito incluido (60 min) en Belgrano 2641 para que su experiencia sea totalmente relajada.
              </p>
            </div>
          </div>
        </section>

        <footer style={{ background: "#111", color: "#D6BA8A", padding: "50px 8%", textAlign: "center" }}>
          <div className="serif" style={{ fontSize: "2rem", letterSpacing: 5 }}>FREYJA</div>
          <p style={{ textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: 2, marginTop: 10 }}>
            Skin Bar Studio | Mar del Plata | 2026
          </p>
          <div style={{ marginTop: 30 }}>
            <iframe src="https://mlmwebs.com.ar/piemlm.html" width="100%" height="60" style={{ border: "none" }} title="Créditos" />
          </div>
        </footer>

        <a href="https://wa.me/5492236164271" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16" aria-hidden>
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.322-5.607zM7.994 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.196.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </a>

        <button
          type="button"
          onClick={scrollToTop}
          className="back-top"
          aria-label="Subir"
          style={{ opacity: showBackToTop ? 1 : 0, visibility: showBackToTop ? "visible" : "hidden" }}
        >
          ▲
        </button>

      </div>
    </>
  );
}
