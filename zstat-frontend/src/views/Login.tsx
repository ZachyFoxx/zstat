import React from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, logout } from "../redux/slices/auth";

/**
 * The login component
 */
export const Login: React.FC = () => {
	// access state
	const auth = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	// render
	return auth.loggedIn ? (
		<button onClick={() => dispatch(logout())}>log out!</button>
	) : (
		<button onClick={() => dispatch(login("token"))}>log in!</button>
	);
};
