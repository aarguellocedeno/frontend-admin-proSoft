"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import {
  FileText,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  ArrowRight,
  Sparkles,
  TrendingUp
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const features: Array<{
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    gradient: string;
  }> = [
    {
      title: "Registro y Generación de Factura",
      description:
        "Crea facturas profesionales con datos del cliente, items y totales automáticos.",
      href: "/facturas",
      icon: FileText,
      color: "text-blue-600",
      gradient: "from-blue-500/10 to-indigo-500/10"
    },
    {
      title: "Registro de Ventas",
      description:
        "Sistema de caja rápido con múltiples métodos de pago y tickets automáticos.",
      href: "/ventas",
      icon: ShoppingCart,
      color: "text-emerald-600",
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      title: "Gestión de Clientes",
      description:
        "Directorio completo con historial de compras, preferencias y análisis detallado.",
      href: "/clientes",
      icon: Users,
      color: "text-purple-600",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "Control de Inventario",
      description:
        "Monitoreo en tiempo real del stock con alertas automáticas y control de existencias.",
      href: "/inventario",
      icon: Package,
      color: "text-orange-600",
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      title: "Análisis y Reportes",
      description:
        "Dashboard interactivo con métricas clave, tendencias y pronósticos de venta.",
      href: "/reportes",
      icon: BarChart3,
      color: "text-cyan-600",
      gradient: "from-cyan-500/10 to-blue-500/10"
    },
  ];

  return (
    <main className={`${inter.className} min-h-screen relative overflow-hidden`}>
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Enhanced Header */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 --brand-1 to-slate-900 bg-clip-text text-transparent">
              Panel Admin - ProSoft Store
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Centro de control integral para tu negocio. Gestiona ventas, inventario y clientes desde un solo lugar.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-full text-sm text-emerald-700 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Configura tus productos e información Corporativa</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </motion.div>
        </header>

        {/* Enhanced Grid of feature cards */}
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </section>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
            <Package className="h-4 w-4" />
            <span>Sistema completo para la administración de tu tienda</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  href,
  icon: Icon,
  index,
  color,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
  color: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 * index,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <Link
        href={href}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-3xl"
        aria-label={title}
      >
        {/* Card with enhanced styling */}
        <div className="relative h-full p-8 bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-xl shadow-slate-200/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-slate-300/30 group-hover:bg-white/90">
          
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Icon with enhanced styling */}
            <div className="mb-6">
              <div className={`inline-flex p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300 ${color}`}>
                <Icon className="h-7 w-7" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-slate-800 transition-colors">
              {title}
            </h2>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors">
              {description}
            </p>

            {/* CTA with enhanced animation */}
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-center gap-3 text-slate-700 font-semibold group-hover:text-slate-900 transition-colors"
            >
              <span>Acceder al módulo</span>
              <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-all duration-200 group-hover:shadow-sm">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          </div>

          {/* Decorative corner element */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-transparent via-slate-100/20 to-slate-200/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}