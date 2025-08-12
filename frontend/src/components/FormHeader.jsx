import React from "react";
import { ArrowLeft } from "lucide-react";

const FormHeader = ({ arrowAction, view }) => {
  return (
    <div className="text-center mb-8">
      {view === "signup" && (
        <div className="flex items-center mb-6">
          <button
            onClick={arrowAction}
            className="mr-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
        📝
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Task Evaluator
        </span>
      </h1>

      <p className="text-white/70">
        {view === "signin" && "Sign in to access your tasks"}
        {view === "signup" && "Join us to start managing your tasks"}
        {view === "forgotPass" && "Sign in to access your tasks"}
      </p>
    </div>
  );
};

export default FormHeader;
