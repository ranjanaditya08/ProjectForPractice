import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import MenPage from "../components/MenPage";
import WomenPage from "../components/WomenPage";
import KidsPage from "../components/KidsPage";
import Cart from "../components/Cart";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/men",
        element: <MenPage />,
      },
      {
        path: "/women",
        element: <WomenPage />,
      },
      {
        path: "/kids",
        element: <KidsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default appRouter;
