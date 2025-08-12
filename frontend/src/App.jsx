import { useState } from "react"
import Tasks from "./Tasks";
import LoginForm from "./components/LoginForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log({isAuthenticated});

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {!isAuthenticated ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                📝{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Task Evaluator
                </span>
              </h1>
              <p className="text-white/70 text-lg">
                Organize, track, and accomplish your goals
              </p>
            </div>
            <LoginForm onLogin={handleLogin} />
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                📝{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Task Evaluator
                </span>
              </h1>
              <div className="flex justify-center">
                <button
                  onClick={handleLogout}
                  className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Logout
                </button>
              </div>
            </div>
            <Tasks />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
