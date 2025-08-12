import React from "react";

const viewTexts = {
  signin: {
    message: "Don't have an account?",
    action: "Sign up",
    nextView: "signup",
  },
  signup: {
    message: "Already have an account?",
    action: "Sign in",
    nextView: "signin",
  },
  forgotPass: {
    message: "Remember your password?",
    action: "Sign in",
    nextView: "signin",
  },
};

const FormFooter = ({ currentView, setCurrentView }) => {
  const { message, action, nextView } = viewTexts[currentView] || {};

  const handleClick = () => {
    // if (currentView === "forgotPass") {
    //   console.log("forgot password");
    //   return;
    // }
    if (nextView) setCurrentView(nextView);
  };

  return (
    <div className="mt-6 text-center">
      {message && (
        <p className="text-white/60 text-sm">
          {message}{" "}
          <a
            onClick={handleClick}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
          >
            {action}
          </a>
        </p>
      )}
    </div>
  );
};

export default FormFooter;
