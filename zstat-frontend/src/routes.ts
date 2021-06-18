import { RouteConfig } from "react-router-config";

import { Landing } from "./views/Landing";
import { Login } from "./views/Login";

export const routes: RouteConfig[] = [
	{ component: Landing, path: "/", exact: true },
	{ component: Login, path: "/login" },
];
