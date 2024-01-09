import { createBrowserRouter } from "react-router-dom";
import DetailsPage from "../pages/DetailsPage";
import AdminPage from "../pages/AdminPage";
import Form from "./Form";
import Signin from "./Signin";
import Layout from "./Layout";
import Register from "./Register";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/detail/:id",
                element: <DetailsPage />,
            },
            {
                path: "/form",
                element: <Form />,
            },
            {
                path: "/",
                element: <Signin />,
            },
            {
                path: "/register",
                element: <Register />,
            },

        ],
    },
]);