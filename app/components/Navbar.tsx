"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/", Icon: Home },
  { label: "Facturas", href: "/facturas", Icon: FileText },
  { label: "Ventas", href: "/ventas", Icon: ShoppingCart },
  { label: "Clientes", href: "/clientes", Icon: Users },
  { label: "Inventario", href: "/inventario", Icon: Package },
  { label: "Reportes", href: "/reportes", Icon: BarChart3 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--card) 90%, transparent)",
        borderColor: "var(--border)",
      }}
      aria-label="Barra de navegación principal"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Enhanced Logo */}
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
          aria-label="Ir al inicio - Tienda Admin"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.08, 
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Glow effect background */}
            <motion.div
              className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo container with enhanced styling */}
            <div className="relative flex items-center justify-center">
              {/* Background with gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)"
                }}
              />
              
              {/* Border with subtle gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(59, 130, 246, 0.1) 100%)",
                  padding: "1px"
                }}
              >
                <div 
                  className="h-full w-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)"
                  }}
                />
              </div>
              
              {/* Logo image */}
              <div className="relative h-16 w-16 z-10 p-2">
                <Image
                  src="/logo-main.png"
                  alt="Tienda Admin Logo"
                  fill
                  sizes="64px"
                  priority
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop nav with enhanced styling */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ label, href, Icon }) => {
            const isActive = pathname === href;
            return (
              <motion.div
                key={href}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[var(--brand-2)] to-[var(--brand-2)]/80 text-[var(--brand-contrast)] shadow-sm"
                        : "text-slate-700 hover:bg-[var(--brand-2)]/30 hover:text-slate-900 hover:shadow-sm"
                    }`}
                  style={{
                    ...(isActive && {
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)"
                    })
                  }}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                  <span>{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -bottom-1 left-1/2 h-0.5 w-6 rounded-full"
                      style={{ 
                        background: "linear-gradient(90deg, transparent 0%, var(--brand-1) 50%, transparent 100%)",
                        x: "-50%"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Mobile toggle */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center rounded-xl p-2.5 md:hidden focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--ring)] transition-colors duration-200"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{ 
            color: "var(--fg)",
            backgroundColor: open ? "var(--brand-2)" : "transparent"
          }}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </motion.button>
      </div>

      {/* Enhanced Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              borderTop: "1px solid var(--border)",
              background: "linear-gradient(180deg, var(--card) 0%, rgba(var(--card-rgb), 0.98) 100%)",
              backdropFilter: "blur(12px)"
            }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_ITEMS.map(({ label, href, Icon }, index) => {
                const isActive = pathname === href;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <Link
                      href={href}
                      className={`inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-[var(--brand-2)] to-[var(--brand-2)]/80 text-[var(--brand-contrast)] shadow-sm"
                            : "text-slate-700 hover:bg-[var(--brand-2)]/30 hover:text-slate-900 hover:translate-x-1"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto h-2 w-2 rounded-full"
                          style={{ background: "var(--brand-1)" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}