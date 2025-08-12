import React, { useState } from "react";
import SignIn from "../../components/forms/SignIn";
import SignUp from "../../components/forms/SignUp"
import ForgotPassword from "../../components/forms/ForgotPassword"
import FormHeader from "../../components/FormHeader";
import FormFooter from "../../components/FormFooter";

const Login = () => {
  const [currentView, setCurrentView] = useState("signin");

  console.log({ currentView });

  return (
    <div className="min-w-svw min-h-svh flex flex-col justify-center items-center px-5 md:px-0">
      <div className="flex flex-col w-full md:max-w-[30%] bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <FormHeader currentView={currentView} setCurrentView={setCurrentView} />

        {currentView === "signin" && <SignIn setCurrentView={setCurrentView} />}

        {currentView === "signup" && <SignUp setCurrentView={setCurrentView} />}

        {currentView === "forgotPass" && <ForgotPassword />}

        <FormFooter currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default Login;
