import React from "react";

const FormHeader = ({ view }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
        📝{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Task Evaluator
        </span>
      </h1>
      <p className="text-white/70">Sign in to access your tasks</p>
    </div>
  );
};

export default FormHeader;
