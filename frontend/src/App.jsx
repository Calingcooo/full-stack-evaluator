import { createBrowserRouter, RouterProvider } from "react-router";
import { ErrorProvider } from "./context/ErrorContext";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./guards/AuthGuard";
import Login from "./modules/login/Login";
import Dashboard from "./modules/task_dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorProvider>
        <AuthProvider>
          <AuthGuard />
        </AuthProvider>
      </ErrorProvider>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
