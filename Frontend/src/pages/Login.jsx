import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, CheckSquare, Square, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthLayout from "../components/auth/AuthLayout";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (loading) return;

    try {
      await login({
        email: data.email.trim(),
        password: data.password,
      });

      toast.success("Login successful");

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue shopping.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
            <input
              id="email"
              type="email"
              autoComplete="email"
              disabled={loading}
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-gray-900 outline-none transition-all duration-200
                ${errors.email
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-gray-300 focus:border-[#0A3D91] focus:ring-[#0A3D91]/20"
                }
                disabled:cursor-not-allowed disabled:bg-gray-100`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              disabled={loading}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-11 text-gray-900 outline-none transition-all duration-200
                ${errors.password
                  ? "border-red-500 focus:ring-red-500/30"
                  : "border-gray-300 focus:border-[#0A3D91] focus:ring-[#0A3D91]/20"
                }
                disabled:cursor-not-allowed disabled:bg-gray-100`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A3D91] py-2.5 font-semibold text-white shadow-sm transition-all cursor-pointer duration-200 hover:-translate-y-0.5 hover:bg-[#082f73] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Signing In..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register"
            state={{
              from: location.state?.from,
            }} 
            className="font-medium text-[#0A3D91] transition-colors hover:text-[#082f73]">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;