// "use client";

// import React, { memo, useState } from "react";
// import { createUser } from "@/app/lib/api";
// import {
//   User,
//   Lock,
//   Shield,
//   UserPlus,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   XCircle,
//   Users,
//   Mail,
//   Phone,
//   CreditCard,
//   Crown,
//   Sparkles,
// } from "lucide-react";

// /* =========================================================
//    InputField (fuera + memo) — evita remount y pérdida de foco
//    ========================================================= */
// type IconType = React.ComponentType<{ size?: number; className?: string }>;

// type Status = { valid: boolean; message: string } | null;

// type InputFieldProps = {
//   icon: IconType;
//   label: string;
//   placeholder: string;
//   value: string;
//   onChange: (value: string) => void;
//   type?: string;
//   status?: Status;
//   isFocused: boolean;
//   onFocus: () => void;
//   onBlur: () => void;
//   autoComplete?: string;
//   requiredMark?: boolean;
// };

// const InputField = memo(function InputField({
//   icon: Icon,
//   label,
//   placeholder,
//   value,
//   onChange,
//   type = "text",
//   status = null,
//   isFocused,
//   onFocus,
//   onBlur,
//   autoComplete = "off",
//   requiredMark = true,
// }: InputFieldProps) {
//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-semibold text-gray-700">
//         {label} {requiredMark && <span className="text-blue-500">*</span>}
//       </label>
//       <div className="relative group">
//         <div
//           className={`
//             absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 z-10
//             ${isFocused ? "text-indigo-500 scale-110" : "text-gray-400 group-hover:text-gray-600"}
//             ${status && !status.valid ? "text-blue-500" : ""}
//           `}
//         >
//           <Icon size={18} />
//         </div>

//         <input
//           className={`
//             w-full pl-11 pr-12 py-4 rounded-2xl border-2 text-sm font-medium
//             transition-all duration-300 ease-out
//             placeholder:text-gray-400 placeholder:font-normal
//             focus:outline-none focus:ring-0
//             ${isFocused
//               ? status && !status.valid
//                 ? "border-blue-400 bg-red-50/50 shadow-lg shadow-red-100/50"
//                 : "border-indigo-400 bg-indigo-50/50 shadow-lg shadow-indigo-100/50 scale-[1.02]"
//               : status && !status.valid
//                 ? "border-blue-300 hover:border-black-400"
//                 : status && status.valid
//                   ? "border-green-300 bg-green-50/30 hover:border-green-400"
//                   : "border-gray-200 hover:border-gray-300 hover:shadow-md"
//             }
//           `}
//           placeholder={placeholder}
//           type={type}
//           value={value ?? ""}
//           onChange={(e) => onChange(e.target.value)}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           autoComplete={autoComplete}
//         />

//       </div>

//       {status && (
//         <p
//           className={`ml-1 text-xs font-medium ${
//             status.valid ? "text-green-600" : "text-blue-600"
//           }`}
//         >
//           {status.message}
//         </p>
//       )}
//     </div>
//   );
// });

// /* =========================================================
//    Formulario
//    ========================================================= */
// type CreatedPayload = {
//   username: string;
//   role?: string;
//   roleText?: string;
// };

// export default function UserForm({
//   onCreated,
// }: {
//   onCreated?: (created: CreatedPayload) => void;
// }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [gender, setGender] = useState<"F" | "M" | "Prefiero no decir">(
//     "Prefiero no decir"
//   );
//   const [phone, setPhone] = useState("");
//   const [idNumber, setIdNumber] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState<"user" | "admin">("user");
//   const [showPassword, setShowPassword] = useState(false);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [msg, setMsg] = useState<{ text: string; ok: boolean | null }>({
//     text: "",
//     ok: null,
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const isF = (name: string) => focusedField === name;
//   const focus = (name: string) => () => setFocusedField(name);
//   const blur = () => setFocusedField(null);

//   // Validaciones
//   const getFullNameStatus = (): Status => {
//     if (!fullName) return null;
//     if (fullName.length < 2) return { valid: false, message: "Mínimo 2 caracteres" };
//     if (fullName.length > 100) return { valid: false, message: "Máximo 100 caracteres" };
//     return { valid: true, message: "Nombre válido" };
//   };
//   const getEmailStatus = (): Status => {
//     if (!email) return null;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return { valid: false, message: "Formato de email inválido" };
//     return { valid: true, message: "Email válido" };
//   };
//   const getPhoneStatus = (): Status => {
//     if (!phone) return null;
//     if (phone.length < 10) return { valid: false, message: "Mínimo 10 dígitos" };
//     if (!/^\d+$/.test(phone)) return { valid: false, message: "Solo números" };
//     return { valid: true, message: "Teléfono válido" };
//   };
//   const getIdNumberStatus = (): Status => {
//     if (!idNumber) return null;
//     if (idNumber.length < 5) return { valid: false, message: "Mínimo 5 caracteres" };
//     if (!/^\d+$/.test(idNumber)) return { valid: false, message: "Solo números" };
//     return { valid: true, message: "Identificación válida" };
//   };
//   const getPasswordStatus = (): Status => {
//     if (!password) return null;
//     if (password.length < 6) return { valid: false, message: "Mínimo 6 caracteres" };
//     if (password.length > 50) return { valid: false, message: "Máximo 50 caracteres" };
//     return { valid: true, message: "Contraseña válida" };
//   };

//   const fullNameStatus = getFullNameStatus();
//   const emailStatus = getEmailStatus();
//   const phoneStatus = getPhoneStatus();
//   const idNumberStatus = getIdNumberStatus();
//   const passwordStatus = getPasswordStatus();

//   const isFormValid = [fullNameStatus, emailStatus, phoneStatus, idNumberStatus,  passwordStatus]
//     .every((s) => s?.valid);

//   const handleCreate = async () => {
//     if (!fullName.trim() || !email.trim() || !phone.trim() || !idNumber.trim() || !password.trim()) {
//       setMsg({ text: "Todos los campos son obligatorios.", ok: false });
//       return;
//     }
//     if (!isFormValid) {
//       setMsg({ text: "Por favor corrige los errores en el formulario.", ok: false });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       // Solo enviamos username, password y role (según tu endpoint actual)
//       const nuevo = await createUser(username.trim(), password.trim(), role);

//       const roleText = Array.isArray(nuevo?.roles)
//         ? nuevo.roles.join(", ")
//         : nuevo?.rol ?? nuevo?.role ?? role;

//       setMsg({ text: `Usuario ${nuevo.username} creado exitosamente`, ok: true });
//       onCreated?.({ username: nuevo.username, roleText });

//       clearForm();
//     } catch (err: any) {
//       setMsg({ text: err?.message || "Error al crear usuario.", ok: false });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const clearForm = () => {
//     setFullName("");
//     setEmail("");
//     setGender("Prefiero no decir");
//     setPhone("");
//     setIdNumber("");
//     setUsername("");
//     setPassword("");
//     setRole("user");
//     setMsg({ text: "", ok: null });
//     setShowPassword(false);
//   };

//   return (
//     <div className="relative mx-auto max-w-2xl">
//       {/* Fondo decorativo */}
//       <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-pink-50 opacity-60" />
//       <div className="relative rounded-3xl border border-white/50 bg-white/80 p-8 shadow-xl shadow-indigo-100/20 backdrop-blur-sm">
//         {/* Header */}
//         <div className="mb-8 flex items-center gap-4">
//           <div>
//             <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
//               Crear Usuario
//             </h2>
//             <p className="text-sm text-gray-600">Completa la información del nuevo usuario</p>
//           </div>
//         </div>

//         {/* —— Todo en su propio renglón —— */}
//         <div className="space-y-6">
//           {/* Datos personales */}
//           <InputField
//             icon={User}
//             label="Nombre Completo"
//             placeholder="Ingresa el nombre completo"
//             value={fullName}
//             onChange={setFullName}
//             status={fullNameStatus}
//             isFocused={isF("fullName")}
//             onFocus={focus("fullName")}
//             onBlur={blur}
//             autoComplete="name"
//           />

//           <InputField
//             icon={Mail}
//             label="Correo Electrónico"
//             placeholder="ejemplo@correo.com"
//             value={email}
//             onChange={setEmail}
//             type="email"
//             status={emailStatus}
//             isFocused={isF("email")}
//             onFocus={focus("email")}
//             onBlur={blur}
//             autoComplete="email"
//           />

//           {/* Género */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Género <span className="text-blue-500">*</span>
//             </label>
//             <div className="relative group">
//               <div
//                 className={`
//                   absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-all duration-200
//                   ${isF("gender") ? "text-indigo-500 scale-110" : "text-gray-400 group-hover:text-gray-600"}
//                 `}
//               >
//                 <Users size={18} />
//               </div>
//               <select
//                 className={`
//                   w-full appearance-none bg-white pl-11 pr-4 py-4 rounded-2xl border-2 text-sm font-medium
//                   transition-all duration-300 focus:outline-none focus:ring-0
//                   ${isF("gender")
//                     ? "border-indigo-400 bg-indigo-50/50 shadow-lg shadow-indigo-100/50 scale-[1.02]"
//                     : "border-gray-200 hover:border-gray-300 hover:shadow-md"}
//                 `}
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value as "F" | "M" | "Prefiero no decir")}
//                 onFocus={focus("gender")}
//                 onBlur={blur}
//               >
//                 <option value="F">Femenino</option>
//                 <option value="M">Masculino</option>
//                 <option value="Prefiero no decir">Prefiero no decir</option>
//               </select>
//             </div>
//           </div>

//           <InputField
//             icon={Phone}
//             label="Teléfono"
//             placeholder="3001234567"
//             value={phone}
//             onChange={setPhone}
//             type="tel"
//             status={phoneStatus}
//             isFocused={isF("phone")}
//             onFocus={focus("phone")}
//             onBlur={blur}
//             autoComplete="tel"
//           />

//           <InputField
//             icon={CreditCard}
//             label="Número de Identificación"
//             placeholder="12345678"
//             value={idNumber}
//             onChange={setIdNumber}
//             status={idNumberStatus}
//             isFocused={isF("idNumber")}
//             onFocus={focus("idNumber")}
//             onBlur={blur}
//           />



//           {/* Password con toggle */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Contraseña <span className="text-blue-500">*</span>
//             </label>
//             <div className="relative group">
//               <div
//                 className={`
//                   absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-all duration-200
//                   ${isF("password") ? "text-indigo-500 scale-110" : "text-gray-400 group-hover:text-gray-600"}
//                   ${passwordStatus && !passwordStatus.valid ? "text-red-500" : ""}
//                 `}
//               >
//                 <Lock size={18} />
//               </div>

//               <input
//                 className={`
//                   w-full pl-11 pr-12 py-4 rounded-2xl border-2 text-sm font-medium
//                   transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-0
//                   ${isF("password")
//                     ? passwordStatus && !passwordStatus.valid
//                       ? "border-blue-400 bg-red-50/50 shadow-lg shadow-red-100/50"
//                       : "border-indigo-400 bg-indigo-50/50 shadow-lg shadow-indigo-100/50 scale-[1.02]"
//                     : passwordStatus && !passwordStatus.valid
//                       ? "border-indigo-300 hover:border-blue-400"
//                       : passwordStatus && passwordStatus.valid
//                         ? "border-green-300 bg-green-50/30 hover:border-green-400"
//                         : "border-gray-200 hover:border-gray-300 hover:shadow-md"}
//                 `}
//                 placeholder="••••••••"
//                 type={showPassword ? "text" : "password"}
//                 value={password ?? ""}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onFocus={focus("password")}
//                 onBlur={blur}
//                 autoComplete="new-password"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword((s) => !s)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                 aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {passwordStatus && (
//               <p
//                 className={`ml-1 text-xs font-medium ${
//                   passwordStatus.valid ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {passwordStatus.message}
//               </p>
//             )}
//           </div>

//           {/* Rol */}
//           <div className="space-y-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Rol del usuario <span className="text-blue-500">*</span>
//             </label>
//             <div className="relative group">
//               <div
//                 className={`
//                   absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-all duration-200
//                   ${isF("role") ? "text-indigo-500 scale-110" : "text-gray-400 group-hover:text-gray-600"}
//                 `}
//               >
//                 <Shield size={18} />
//               </div>

//               <select
//                 className={`
//                   w-full appearance-none bg-white pl-11 pr-4 py-4 rounded-2xl border-2 text-sm font-medium
//                   transition-all duration-300 focus:outline-none focus:ring-0
//                   ${isF("role")
//                     ? "border-indigo-400 bg-indigo-50/50 shadow-lg shadow-indigo-100/50 scale-[1.02]"
//                     : "border-gray-200 hover:border-gray-300 hover:shadow-md"}
//                 `}
//                 value={role}
//                 onChange={(e) => setRole(e.target.value as "user" | "admin")}
//                 onFocus={focus("role")}
//                 onBlur={blur}
//               >
//                 <option value="user">Usuario estándar</option>
//                 <option value="admin">Administrador</option>
//               </select>
//             </div>

//           </div>

//           {/* Vista previa (opcional) */}
//           {fullName && (
//             <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 toblue-50 p-4">
//               <div className="mb-3 flex items-center gap-3">
//                 <Sparkles className="h-4 w-4 text-indigo-500" />
//                 <h4 className="text-sm font-semibold text-gray-800">Vista previa del usuario</h4>
//               </div>
//               <div className="grid grid-cols-1 gap-2 text-xs">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Nombre:</span>
//                   <span className="font-semibold text-gray-800">{fullName}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Email:</span>
//                   <span className="font-semibold text-gray-800">{email || "No especificado"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Rol:</span>
//                   <span
//                     className={`flex items-center gap-1 font-semibold ${
//                       role === "admin" ? "text-yellow-600" : "text-blue-600"
//                     }`}
//                   >
//                     {role === "admin" ? <Crown size={12} /> : <Users size={12} />}
//                     {role === "admin" ? "Administrador" : "Usuario"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Botones */}
//           <div className="flex gap-3 pt-2">
//             <button
//               onClick={handleCreate}
//               disabled={submitting || !isFormValid}
//               className={`
//                 flex-1 transform rounded-2xl bg-gradient-to-r from-blue-300 to-indigo-600 px-6 py-4
//                 font-semibold text-white shadow transition-all duration-300 hover:scale-[1.02]
//                 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl
//                 disabled:cursor-not-allowed disabled:bg-gray-400
//               `}
//             >
//               {submitting ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                   Creando...
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-3">
//                   <UserPlus className="h-5 w-5" />
//                   Crear Usuario
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={() => {
//                 setFullName("");
//                 setEmail("");
//                 setGender("Prefiero no decir");
//                 setPhone("");
//                 setIdNumber("");
//                 setUsername("");
//                 setPassword("");
//                 setRole("user");
//                 setMsg({ text: "", ok: null });
//                 setShowPassword(false);
//               }}
//               disabled={submitting}
//               className="rounded-2xl bg-gray-100 px-6 py-4 font-semibold text-gray-700 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-200"
//             >
//               Limpiar
//             </button>
//           </div>

//           {/* Mensaje */}
//           {msg.text && (
//             <p className={`pt-2 text-sm ${msg.ok ? "text-emerald-600" : "text-red-600"}`}>
//               {msg.text}
//             </p>
//           )}

//           {/* Nota endpoint */}
//           <p className="border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
//             Nota: Actualmente solo se envían usuario, contraseña y rol al servidor. Los demás datos se pueden integrar si el
//             endpoint lo soporta.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




// // "use client";

// // import { useState } from "react";
// // import { createUser } from "@/app/lib/api";

// // type CreatedPayload = {
// //   username: string;
// //   role?: string;
// //   roleText?: string; // por si tu backend devuelve roles en otro campo
// // };

// // export default function UserForm({
// //   onCreated,
// // }: {
// //   onCreated?: (created: CreatedPayload) => void;
// // }) {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [role, setRole] = useState<"user" | "admin">("user");
// //   const [msg, setMsg] = useState<{ text: string; ok: boolean | null }>({
// //     text: "",
// //     ok: null,
// //   });
// //   const [submitting, setSubmitting] = useState(false);

// //   const handleCreate = async () => {
// //     if (!username.trim() || !password.trim()) {
// //       setMsg({ text: "Todos los campos son obligatorios.", ok: false });
// //       return;
// //     }
// //     try {
// //       setSubmitting(true);

// //       // POST /auth/users
// //       const nuevo = await createUser(username.trim(), password.trim(), role);

// //       // Normalizamos lo que mostramos como rol en la tabla local:
// //       const roleText = Array.isArray(nuevo?.roles)
// //         ? nuevo.roles.join(", ")
// //         : nuevo?.rol ?? nuevo?.role ?? role;

// //       setMsg({ text: `Usuario ${nuevo.username} creado `, ok: true });

// //       // Notificar arriba (para tabla local, opcional)
// //       onCreated?.({ username: nuevo.username, roleText });

// //       // Limpiar form
// //       setUsername("");
// //       setPassword("");
// //       setRole("user");
// //     } catch (err: any) {
// //       setMsg({ text: err?.message || "Error al crear usuario.", ok: false });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-3">
// //       <div className="grid grid-cols-1 gap-3">
// //         <input
// //           className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
// //           placeholder="Nombre de usuario"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           autoComplete="off"
// //         />
// //         <input
// //           className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
// //           placeholder="Contraseña"
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           autoComplete="new-password"
// //         />
// //         <select
// //           className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
// //           value={role}
// //           onChange={(e) => setRole(e.target.value as "user" | "admin")}
// //         >
// //           <option value="user">user</option>
// //           <option value="admin">admin</option>
// //         </select>
// //       </div>

// //       {msg.text && (
// //         <p className={`text-sm ${msg.ok ? "text-emerald-600" : "text-red-600"}`}>
// //           {msg.text}
// //         </p>
// //       )}

// //       <div className="flex gap-2">
// //         <button
// //           onClick={handleCreate}
// //           disabled={submitting}
// //           className="rounded-lg bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-700 disabled:opacity-60"
// //         >
// //           {submitting ? "Creando..." : "Crear usuario"}
// //         </button>
// //         <button
// //           onClick={() => {
// //             setUsername("");
// //             setPassword("");
// //             setRole("user");
// //             setMsg({ text: "", ok: null });
// //           }}
// //           className="rounded-lg bg-slate-200 px-4 py-2 text-slate-700 shadow hover:bg-slate-300"
// //         >
// //           Limpiar
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

"use client";

import React, { memo, useState } from "react";
import { createUser } from "@/app/lib/api";
import {
  User,
  Lock,
  Shield,
  UserPlus,
  Eye,
  EyeOff,
  Users,
  Mail,
  BookOpen,
  IdCard,
  Briefcase,
  Sparkles,
  Crown,
} from "lucide-react";

/* =========================================================
   InputField (fuera + memo) — evita remount y pérdida de foco
   ========================================================= */
type IconType = React.ComponentType<{ size?: number; className?: string }>;

type Status = { valid: boolean; message: string } | null;

type InputFieldProps = {
  icon: IconType;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  status?: Status;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  autoComplete?: string;
  requiredMark?: boolean;
};

const InputField = memo(function InputField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  status = null,
  isFocused,
  onFocus,
  onBlur,
  autoComplete = "off",
  requiredMark = true,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {requiredMark && <span className="text-gray-500">*</span>}
      </label>
      <div className="relative group">
        <div
          className={`
            absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 z-10
            ${isFocused ? "text-indigo-500 scale-110" : "text-gray-400 group-hover:text-gray-600"}
            ${status && !status.valid ? "text-gray-500" : ""}
          `}
        >
          <Icon size={18} />
        </div>

        <input
          className={`
            w-full pl-11 pr-12 py-4 rounded-2xl border-2 text-sm font-medium
            transition-all duration-300 ease-out
            placeholder:text-gray-400 placeholder:font-normal
            focus:outline-none focus:ring-0
            ${isFocused
              ? status && !status.valid
                ? "border-gray-400 bg-gray-50/50 shadow-lg shadow-gray-100/50"
                : "border-indigo-400 bg-indigo-50/50 shadow-lg shadow-indigo-100/50 scale-[1.02]"
              : status && !status.valid
                ? "border-gray-300 hover:border-gray-400"
                : status && status.valid
                  ? "border-green-300 bg-green-50/30 hover:border-green-400"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }
          `}
          placeholder={placeholder}
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />
      </div>

      {status && (
        <p
          className={`ml-1 text-xs font-medium ${
            status.valid ? "text-green-600" : "text-gray-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  );
});

/* =========================================================
   Formulario
   ========================================================= */
type CreatedPayload = {
  username: string;
  role?: string;
  roleText?: string;
};

export default function UserForm({
  onCreated,
}: {
  onCreated?: (created: CreatedPayload) => void;
}) {
  // Estado para el tipo de usuario
  const [userType, setUserType] = useState<"user" | "admin">("user");

  // Campos para Usuario Estándar
  const [fullName, setFullName] = useState("");
  const [institutionalEmail, setInstitutionalEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [studentCode, setStudentCode] = useState("");

  // Campos para Administrador
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminRole, setAdminRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean | null }>({
    text: "",
    ok: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const isF = (name: string) => focusedField === name;
  const focus = (name: string) => () => setFocusedField(name);
  const blur = () => setFocusedField(null);

  // Validaciones para Usuario Estándar
  const getFullNameStatus = (): Status => {
    if (!fullName) return null;
    if (fullName.length < 2) return { valid: false, message: "Mínimo 2 caracteres" };
    if (fullName.length > 100) return { valid: false, message: "Máximo 100 caracteres" };
    return { valid: true, message: "Nombre válido" };
  };

  const getInstitutionalEmailStatus = (): Status => {
    if (!institutionalEmail) return null;
    const emailRegex = /^[^\s@]+@javerianacali\.edu\.co$/;
    if (!emailRegex.test(institutionalEmail)) {
      return { valid: false, message: "Debe ser un correo institucional (@javerianacali.edu.co)" };
    }
    return { valid: true, message: "Correo institucional válido" };
  };

  const getFacultyStatus = (): Status => {
    if (!faculty) return null;
    if (faculty.length < 3) return { valid: false, message: "Mínimo 3 caracteres" };
    return { valid: true, message: "Facultad válida" };
  };

  const getStudentCodeStatus = (): Status => {
    if (!studentCode) return null;
    if (studentCode.length < 5) return { valid: false, message: "Mínimo 5 caracteres" };
    if (!/^\d+$/.test(studentCode)) return { valid: false, message: "Solo números" };
    return { valid: true, message: "Código válido" };
  };

  // Validaciones para Administrador
  const getAdminNameStatus = (): Status => {
    if (!adminName) return null;
    if (adminName.length < 2) return { valid: false, message: "Mínimo 2 caracteres" };
    if (adminName.length > 100) return { valid: false, message: "Máximo 100 caracteres" };
    return { valid: true, message: "Nombre válido" };
  };

  const getAdminEmailStatus = (): Status => {
    if (!adminEmail) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminEmail)) return { valid: false, message: "Formato de email inválido" };
    return { valid: true, message: "Email válido" };
  };

  const getPasswordStatus = (): Status => {
    if (!password) return null;
    if (password.length < 6) return { valid: false, message: "Mínimo 6 caracteres" };
    if (password.length > 50) return { valid: false, message: "Máximo 50 caracteres" };
    return { valid: true, message: "Contraseña válida" };
  };

  const getAdminRoleStatus = (): Status => {
    if (!adminRole) return null;
    if (adminRole.length < 3) return { valid: false, message: "Mínimo 3 caracteres" };
    return { valid: true, message: "Rol válido" };
  };

  const fullNameStatus = getFullNameStatus();
  const institutionalEmailStatus = getInstitutionalEmailStatus();
  const facultyStatus = getFacultyStatus();
  const studentCodeStatus = getStudentCodeStatus();

  const adminNameStatus = getAdminNameStatus();
  const adminEmailStatus = getAdminEmailStatus();
  const passwordStatus = getPasswordStatus();
  const adminRoleStatus = getAdminRoleStatus();

  const isUserFormValid = userType === "user"
    ? [fullNameStatus, institutionalEmailStatus, facultyStatus, studentCodeStatus].every((s) => s?.valid)
    : [adminNameStatus, adminEmailStatus, passwordStatus, adminRoleStatus].every((s) => s?.valid);

  const handleCreate = async () => {
    if (userType === "user") {
      if (!fullName.trim() || !institutionalEmail.trim() || !faculty.trim() || !studentCode.trim()) {
        setMsg({ text: "Todos los campos son obligatorios.", ok: false });
        return;
      }
    } else {
      if (!adminName.trim() || !adminEmail.trim() || !password.trim() || !adminRole.trim()) {
        setMsg({ text: "Todos los campos son obligatorios.", ok: false });
        return;
      }
    }

    if (!isUserFormValid) {
      setMsg({ text: "Por favor corrige los errores en el formulario.", ok: false });
      return;
    }

    try {
      setSubmitting(true);
      
      // Adapta según tu API - aquí uso el email como username
      const username = userType === "user" ? institutionalEmail : adminEmail;
      const pass = userType === "user" ? studentCode : password;
      
      const nuevo = await createUser(username.trim(), pass.trim(), userType);

      const roleText = Array.isArray(nuevo?.roles)
        ? nuevo.roles.join(", ")
        : nuevo?.rol ?? nuevo?.role ?? userType;

      setMsg({ text: `Usuario creado exitosamente`, ok: true });
      onCreated?.({ username: nuevo.username, roleText });

      clearForm();
    } catch (err: any) {
      setMsg({ text: err?.message || "Error al crear usuario.", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setFullName("");
    setInstitutionalEmail("");
    setFaculty("");
    setStudentCode("");
    setAdminName("");
    setAdminEmail("");
    setPassword("");
    setAdminRole("");
    setMsg({ text: "", ok: null });
    setShowPassword(false);
  };

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-pink-50 opacity-60" />
      <div className="relative rounded-3xl border border-white/50 bg-white/80 p-8 shadow-xl shadow-indigo-100/20 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div>
            <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
              Crear Usuario
            </h2>
            <p className="text-sm text-gray-600">Completa la información del nuevo usuario</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Selector de tipo de usuario */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Tipo de Usuario <span className="text-gray-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setUserType("user");
                  clearForm();
                }}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  userType === "user"
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Users size={20} />
                  <span className="font-semibold">Usuario Estándar</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserType("admin");
                  clearForm();
                }}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  userType === "admin"
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Crown size={20} />
                  <span className="font-semibold">Administrador</span>
                </div>
              </button>
            </div>
          </div>

          {/* Formulario para Usuario Estándar */}
          {userType === "user" && (
            <>
              <InputField
                icon={User}
                label="Nombre Completo"
                placeholder="Ingresa el nombre completo"
                value={fullName}
                onChange={setFullName}
                status={fullNameStatus}
                isFocused={isF("fullName")}
                onFocus={focus("fullName")}
                onBlur={blur}
                autoComplete="name"
              />

              <InputField
                icon={Mail}
                label="Correo Institucional"
                placeholder="nombre@javerianacali.edu.co"
                value={institutionalEmail}
                onChange={setInstitutionalEmail}
                type="email"
                status={institutionalEmailStatus}
                isFocused={isF("institutionalEmail")}
                onFocus={focus("institutionalEmail")}
                onBlur={blur}
                autoComplete="email"
              />

              <InputField
                icon={BookOpen}
                label="Facultad"
                placeholder="Ingeniería, Ciencias Sociales, etc."
                value={faculty}
                onChange={setFaculty}
                status={facultyStatus}
                isFocused={isF("faculty")}
                onFocus={focus("faculty")}
                onBlur={blur}
              />

              <InputField
                icon={IdCard}
                label="Código Estudiantil"
                placeholder="12345678"
                value={studentCode}
                onChange={setStudentCode}
                status={studentCodeStatus}
                isFocused={isF("studentCode")}
                onFocus={focus("studentCode")}
                onBlur={blur}
              />

              {/* Vista previa Usuario Estándar */}
              {fullName && (
                <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <h4 className="text-sm font-semibold text-gray-800">Vista previa del usuario</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre:</span>
                      <span className="font-semibold text-gray-800">{fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-800">{institutionalEmail || "No especificado"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Facultad:</span>
                      <span className="font-semibold text-gray-800">{faculty || "No especificado"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Código:</span>
                      <span className="font-semibold text-gray-800">{studentCode || "No especificado"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="flex items-center gap-1 font-semibold text-blue-600">
                        <Users size={12} />
                        Usuario Estándar
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Formulario para Administrador */}
          {userType === "admin" && (
            <>
              <InputField
                icon={User}
                label="Nombre"
                placeholder="Ingresa el nombre"
                value={adminName}
                onChange={setAdminName}
                status={adminNameStatus}
                isFocused={isF("adminName")}
                onFocus={focus("adminName")}
                onBlur={blur}
                autoComplete="name"
              />

              <InputField
                icon={Mail}
                label="Correo Electrónico"
                placeholder="ejemplo@correo.com"
                value={adminEmail}
                onChange={setAdminEmail}
                type="email"
                status={adminEmailStatus}
                isFocused={isF("adminEmail")}
                onFocus={focus("adminEmail")}
                onBlur={blur}
                autoComplete="email"
              />

              {/* Password con toggle */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Contraseña <span className="text-gray-500">*</span>
                </label>
                <div className="relative group">
                  <div
                    className={`
                      absolute left-3 top-1/2 -translate-y-1/2 z-10 transition-all duration-200
                      ${isF("password") ? "text-indigo-500 scale-110" : "text-gray-400 group-hover:text-gray-600"}
                      ${passwordStatus && !passwordStatus.valid ? "text-gray-500" : ""}
                    `}
                  >
                    <Lock size={18} />
                  </div>

                  <input
                    className={`
                      w-full pl-11 pr-12 py-4 rounded-2xl border-2 text-sm font-medium
                      transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-0
                      ${isF("password")
                        ? passwordStatus && !passwordStatus.valid
                          ? "border-gray-400 bg-gray-50/50 shadow-lg shadow-gray-100/50"
                          : "border-indigo-400 bg-indigo-50/50 shadow-lg shadow-indigo-100/50 scale-[1.02]"
                        : passwordStatus && !passwordStatus.valid
                          ? "border-gray-300 hover:border-gray-400"
                          : passwordStatus && passwordStatus.valid
                            ? "border-green-300 bg-green-50/30 hover:border-green-400"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"}
                    `}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password ?? ""}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={focus("password")}
                    onBlur={blur}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {passwordStatus && (
                  <p
                    className={`ml-1 text-xs font-medium ${
                      passwordStatus.valid ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {passwordStatus.message}
                  </p>
                )}
              </div>

              <InputField
                icon={Briefcase}
                label="Rol que Desempeña"
                placeholder="Coordinador, Director, etc."
                value={adminRole}
                onChange={setAdminRole}
                status={adminRoleStatus}
                isFocused={isF("adminRole")}
                onFocus={focus("adminRole")}
                onBlur={blur}
              />

              {/* Vista previa Administrador */}
              {adminName && (
                <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <h4 className="text-sm font-semibold text-gray-800">Vista previa del usuario</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre:</span>
                      <span className="font-semibold text-gray-800">{adminName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-800">{adminEmail || "No especificado"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rol:</span>
                      <span className="font-semibold text-gray-800">{adminRole || "No especificado"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="flex items-center gap-1 font-semibold text-yellow-600">
                        <Crown size={12} />
                        Administrador
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCreate}
              disabled={submitting || !isUserFormValid}
              className={`
                flex-1 transform rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4
                font-semibold text-white shadow transition-all duration-300 hover:scale-[1.02]
                hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl
                disabled:cursor-not-allowed disabled:bg-gray-400
              `}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <UserPlus className="h-5 w-5" />
                  Crear Usuario
                </span>
              )}
            </button>

            <button
              onClick={clearForm}
              disabled={submitting}
              className="rounded-2xl bg-gray-100 px-6 py-4 font-semibold text-gray-700 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-200"
            >
              Limpiar
            </button>
          </div>

          {/* Mensaje */}
          {msg.text && (
            <p className={`pt-2 text-sm ${msg.ok ? "text-emerald-600" : "text-red-600"}`}>
              {msg.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}