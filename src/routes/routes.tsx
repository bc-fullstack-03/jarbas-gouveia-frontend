import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorBoundary from "../services/ErrorBoundary";
import FeedView from "../views/Feed/FeedView";
import LoginView from "../views/Login/LoginView";
import MomentDetailsView from "../views/MomentDetails/MomentDetailsView";
import NewMoment from "../views/NewMoment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: "/", element: <FeedView />},
            { path: "/moment/:id", element: <MomentDetailsView /> },
            { path:"/new-moment", element: <NewMoment />},
        ],
    },
    {
        path: "/login",
        element: <LoginView />,
    }
]);



export default router;