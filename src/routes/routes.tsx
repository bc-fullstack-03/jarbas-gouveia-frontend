import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../services/ErrorBoundary";
import FeedView from "../views/Feed/FeedView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: "/",
                element: <FeedView />,
            }
        ]
    },

]);



export default router;