import React from "react";
import { ArrowLeft } from "lucide-react";

const viewData = {
  signin: {
    subtitle: "Sign in to access your tasks",
    showBack: false,
  },
  signup: {
    subtitle: "Join us to start managing your tasks",
    showBack: true,
    backTo: "signin",
    backLabel: "Create Account",
  },
  forgotPass: {
    subtitle: "Enter your email and we'll send you a reset link",
    showBack: true,
    backTo: "signin",
    backLabel: "Forgot Password",
  },
};

const FormHeader = ({ currentView, setCurrentView }) => {
  const { subtitle, showBack, backTo, backLabel } = viewData[currentView] || {};

  return (
    <div className="text-center mb-8">
      {showBack && (
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentView(backTo)}
            className="mr-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white">{backLabel}</h2>
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
        📝
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Task Evaluator
        </span>
      </h1>

      {subtitle && <p className="text-white/70">{subtitle}</p>}
    </div>
  );
};

export default FormHeader;
