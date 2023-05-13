import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../services/ErrorBoundary";
import FeedView from "../views/Feed/FeedView";
import LoginView from "../views/Login/LoginView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                element: <FeedView />,
            },

        ],
    },
    {
        path: "/login",
        element: <LoginView />,
    }
]);



export default router;