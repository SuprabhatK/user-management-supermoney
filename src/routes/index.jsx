import { createBrowserRouter } from "react-router-dom";
import { AddUser, UserList } from "../pages";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App /> ,
        children: [
            { path: "/", element: <UserList /> },
            { path: "/add-user", element: <AddUser /> }
        ]
    }
])

export default router;