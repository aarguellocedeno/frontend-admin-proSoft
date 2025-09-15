import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ProSoft — Admin Panel",
    template: "ProSoft — %s",
  },
  description: "Panel de administrador para la tienda ProSoft",
  applicationName: "ProSoft Admin",
  icons: {
    icon: "/logo-main.png",
    shortcut: "/logo-main.png",
    apple: "/logo-main.png",
  },
  themeColor: "#FAA091",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-app text-slate-900 antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow"
        >
          Ir al contenido
        </a>

        <div
          aria-hidden
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, var(--brand-2), var(--brand-1), var(--brand-2))",
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Contenedor principal */}
        <main id="content" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 print:px-0">
          {children}
        </main>

        {/* Footer sencillo */}
        <footer className="mt-auto border-t bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-slate-500 sm:px-6">
            <span>© {year} ProSoft. Todos los derechos reservados.</span>
            <span>
              Panel •{" "}
              <span className="font-medium" style={{ color: "var(--brand-1)" }}>
                v1.0
              </span>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
