import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./guards/AuthGuard";
import Login from "./modules/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <AuthGuard />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Login />,
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
