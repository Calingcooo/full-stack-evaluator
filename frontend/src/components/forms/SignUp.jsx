import React, { useState, useEffect } from "react";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";

const SignUp = ({ setCurrentView }) => {
  const { handleSignup } = useAuth();
  const { registerError, setRegisterError, clearRegisterError, clearGlobalError } = useError();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setRegisterError((prev) => ({
          ...prev,
          password: "Passwords do not match",
        }));
      } else {
        setRegisterError((prev) => ({
          ...prev,
          password: false,
        }));
      }
    }

    clearRegisterError(null)
    clearGlobalError(null)
  }, [formData.password, formData.confirmPassword]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <label className="text-white/90 text-sm font-medium block">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-white/90 text-sm font-medium block">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-white/50  transition-all duration-300 ${registerError?.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"}`}            
            placeholder="Enter your email"
            required
          />
        </div>
        {registerError?.email && (
          <p className="text-red-500">{registerError?.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-white/90 text-sm font-medium block">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-white/50  transition-all duration-300 ${registerError?.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"}`}
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {registerError?.password && (
          <p className="text-red-500">{registerError?.password}</p>
        )}

      </div>

      <div className="space-y-1">
        <label className="text-white/90 text-sm font-medium block">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-white/50  transition-all duration-300 ${registerError?.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-white/20 focus:outline-none  focus:ring-2 focus:ring-green-400 focus:border-transparent"}`}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm">
        <label className="flex items-start text-white/70">
          <input type="checkbox" className="mr-3 mt-1 rounded" required />
          <span>
            I agree to the{" "}
            <a href="#" className="text-green-400 hover:text-green-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-400 hover:text-green-300">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      <button
        onClick={(e) => handleSignup(e, formData, setIsLoading, setCurrentView)}
        disabled={isLoading || registerError?.email || registerError?.password}
        className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </button>
    </div>
  );
};

export default SignUp;
