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

// "use client";

// import React, { memo, useState } from "react";
// import { useRouter } from "next/navigation";
// // ⬇️ Ajusta esta ruta si tu api.js está en otra carpeta.
// import { login, getMe, createUser } from "@/app/lib/api";
// import {
//   User, Lock, Eye, EyeOff, LogIn, UserPlus, Shield, CheckCircle2, AlertCircle
// } from "lucide-react";

// /* ----------------- Input reutilizable (fuera + memo: no pierde foco) ----------------- */
// type IconType = React.ComponentType<{ size?: number; className?: string }>;
// const Input = memo(function Input({
//   icon: Icon,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   autoComplete,
//   isPasswordToggle,
//   showPassword,
//   setShowPassword,
// }: {
//   icon: IconType;
//   type?: string;
//   placeholder: string;
//   value: string;
//   onChange: (v: string) => void;
//   autoComplete?: string;
//   isPasswordToggle?: boolean;
//   showPassword?: boolean;
//   setShowPassword?: (v: boolean) => void;
// }) {
//   return (
//     <div className="relative group">
//       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">
//         <Icon size={18} />
//       </div>
//       <input
//         className="w-full pl-11 pr-11 py-3 rounded-2xl border-2 text-sm font-medium
//                    border-gray-200 hover:border-gray-300 focus:border-indigo-400
//                    focus:outline-none transition-colors"
//         type={isPasswordToggle ? (showPassword ? "text" : "password") : type}
//         placeholder={placeholder}
//         value={value ?? ""}          /* siempre string */
//         onChange={(e) => onChange(e.target.value)}
//         autoComplete={autoComplete}
//       />
//       {isPasswordToggle && setShowPassword && (
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//           aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//         >
//           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//         </button>
//       )}
//     </div>
//   );
// });

// /* --------------------------------- Página --------------------------------- */
// export default function AuthPage() {
//   const router = useRouter();
//   const [mode, setMode] = useState<"signin" | "signup">("signin");

//   // Sign in
//   const [siUser, setSiUser] = useState("");
//   const [siPass, setSiPass] = useState("");
//   const [siShow, setSiShow] = useState(false);
//   const [busyIn, setBusyIn] = useState(false);
//   const [msgIn, setMsgIn] = useState<{ ok: boolean; text: string } | null>(null);

//   // Sign up
//   const [suUser, setSuUser] = useState("");
//   const [suPass, setSuPass] = useState("");
//   const [suShow, setSuShow] = useState(false);
//   const [role, setRole] = useState<"user" | "admin">("user");
//   const [busyUp, setBusyUp] = useState(false);
//   const [msgUp, setMsgUp] = useState<{ ok: boolean; text: string } | null>(null);

//   const handleSignIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMsgIn(null);

//     if (!siUser.trim() || !siPass.trim()) {
//       setMsgIn({ ok: false, text: "Completa usuario y contraseña." });
//       return;
//     }

//     try {
//       setBusyIn(true);
//       // POST /auth/login
//       const data = await login(siUser.trim(), siPass.trim());
//       const token = data?.token || data?.access_token;
//       if (!token) throw new Error("Credenciales incorrectas.");

//       // Guarda token y consulta /auth/me
//       localStorage.setItem("token", token);
//       const user = await getMe();
//       localStorage.setItem("userName", user?.username || siUser.trim());
//       localStorage.setItem("userRole", user?.rol ?? user?.role ?? "user");

//       setMsgIn({ ok: true, text: `Bienvenido ${user?.username || siUser.trim()} ✅` });
//       router.replace("/dashboard");
//     } catch (err: any) {
//       setMsgIn({ ok: false, text: err?.message || "Error de conexión." });
//     } finally {
//       setBusyIn(false);
//     }
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMsgUp(null);

//     if (!suUser.trim() || !suPass.trim()) {
//       setMsgUp({ ok: false, text: "Completa usuario y contraseña." });
//       return;
//     }

//     try {
//       setBusyUp(true);
//       // POST /auth/users
//       const nuevo = await createUser(suUser.trim(), suPass.trim(), role);
//       setMsgUp({ ok: true, text: `Usuario ${nuevo?.username || suUser.trim()} creado ✅` });

//       // Prefill y cambia a login
//       setSiUser(suUser.trim());
//       setSuUser(""); setSuPass(""); setRole("user");
//       setTimeout(() => setMode("signin"), 300);
//     } catch (err: any) {
//       setMsgUp({ ok: false, text: err?.message || "Error creando usuario." });
//     } finally {
//       setBusyUp(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100dvh)] w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <div className="relative w-full max-w-xl">
//         {/* Card */}
//         <div className="relative rounded-3xl border border-white/60 bg-white/80 shadow-xl shadow-indigo-100/30 backdrop-blur p-6 md:p-8">
//           {/* Tabs */}
//           <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
//             <button
//               onClick={() => setMode("signin")}
//               className={`py-2 rounded-lg text-sm font-semibold transition-all ${
//                 mode === "signin" ? "bg-white shadow text-indigo-700" : "text-slate-600 hover:text-slate-800"
//               }`}
//             >
//               Iniciar sesión
//             </button>
//             <button
//               onClick={() => setMode("signup")}
//               className={`py-2 rounded-lg text-sm font-semibold transition-all ${
//                 mode === "signup" ? "bg-white shadow text-indigo-700" : "text-slate-600 hover:text-slate-800"
//               }`}
//             >
//               Registrarse
//             </button>
//           </div>

//           {/* Sign In */}
//           {mode === "signin" && (
//             <form onSubmit={handleSignIn} className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">Usuario</label>
//                 <Input
//                   icon={User}
//                   placeholder="Tu usuario"
//                   value={siUser}
//                   onChange={setSiUser}
//                   autoComplete="username"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">Contraseña</label>
//                 <Input
//                   icon={Lock}
//                   placeholder="••••••••"
//                   value={siPass}
//                   onChange={setSiPass}
//                   isPasswordToggle
//                   showPassword={siShow}
//                   setShowPassword={setSiShow}
//                   autoComplete="current-password"
//                 />
//               </div>

//               {msgIn && (
//                 <p className={`text-sm flex items-center gap-2 ${
//                   msgIn.ok ? "text-emerald-600" : "text-red-600"
//                 }`}>
//                   {msgIn.ok ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>} {msgIn.text}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={busyIn}
//                 className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600
//                            px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
//               >
//                 {busyIn ? "Entrando…" : (<><LogIn size={18}/> Entrar</>)}
//               </button>
//             </form>
//           )}

//           {/* Sign Up */}
//           {mode === "signup" && (
//             <form onSubmit={handleSignUp} className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">Usuario</label>
//                 <Input
//                   icon={User}
//                   placeholder="Elige un usuario"
//                   value={suUser}
//                   onChange={setSuUser}
//                   autoComplete="off"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">Contraseña</label>
//                 <Input
//                   icon={Lock}
//                   placeholder="••••••••"
//                   value={suPass}
//                   onChange={setSuPass}
//                   isPasswordToggle
//                   showPassword={suShow}
//                   setShowPassword={setSuShow}
//                   autoComplete="new-password"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700">Rol</label>
//                 <div className="relative">
//                   <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                     <Shield size={18}/>
//                   </div>
//                   <select
//                     className="w-full appearance-none rounded-2xl border-2 border-gray-200
//                                pl-11 pr-4 py-3 text-sm font-medium hover:border-gray-300
//                                focus:border-indigo-400 focus:outline-none transition-colors"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value as "user" | "admin")}
//                   >
//                     <option value="user">Usuario</option>
//                     <option value="admin">Administrador</option>
//                   </select>
//                 </div>
//               </div>

//               {msgUp && (
//                 <p className={`text-sm flex items-center gap-2 ${
//                   msgUp.ok ? "text-emerald-600" : "text-red-600"
//                 }`}>
//                   {msgUp.ok ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>} {msgUp.text}
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 disabled={busyUp}
//                 className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600
//                            px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
//               >
//                 {busyUp ? "Creando…" : (<><UserPlus size={18}/> Crear cuenta</>)}
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Pie */}
//         <p className="mt-4 text-center text-xs text-slate-500">
//           Este acceso usa tus microservicios: <b>POST /auth/login</b>, <b>GET /auth/me</b>, <b>POST /auth/users</b>.
//         </p>
//       </div>
//     </div>
//   );
// }
