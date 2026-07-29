import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthLayout from "../components/auth/AuthLayout";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { register: registerUser, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    if (loading) return;

    try {
      await registerUser({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      toast.success("Welcome to Trendify!");
      const from = location.state?.from?.pathname || "/";
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join Trendify and start shopping today.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User size={19} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              disabled={loading}
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
              aria-invalid={errors.name ? "true" : "false"}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-gray-900 outline-none transition-all duration-200
                ${errors.name
                  ? "border-red-500  focus:ring-red-500/30"
                  : "border-gray-300 focus:border-[#0A3D91]  focus:ring-[#0A3D91]/20"
                }
                disabled:cursor-not-allowed disabled:bg-gray-100`}
            />
          </div>
          {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail size={19} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                  ? "border-red-500  focus:ring-red-500/30"
                  : "border-gray-300 focus:border-[#0A3D91]  focus:ring-[#0A3D91]/20"
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
            <Lock size={19} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              disabled={loading}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-11 text-gray-900 outline-none transition-all duration-200
                ${errors.password
                  ? "border-red-500  focus:ring-red-500/30"
                  : "border-gray-300 focus:border-[#0A3D91]  focus:ring-[#0A3D91]/20"
                }
                disabled:cursor-not-allowed disabled:bg-gray-100`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock size={19} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              disabled={loading}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              className={`w-full rounded-xl border py-2.5 pl-10 pr-11 text-gray-900 outline-none transition-all duration-200
                ${errors.confirmPassword
                  ? "border-red-500  focus:ring-red-500/30"
                  : "border-gray-300 focus:border-[#0A3D91]  focus:ring-[#0A3D91]/20"
                }
                disabled:cursor-not-allowed disabled:bg-gray-100`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A3D91] py-2.5 font-semibold text-white shadow-sm transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:bg-[#082f73] hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login"
            state={{
              from: location.state?.from,
            }}
            className="font-medium text-[#0A3D91] transition-colors hover:text-[#082f73]">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;