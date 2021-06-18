import React, { ReactNode } from "react";

import { Navigation } from "../../components/Navigation";
import { Content } from "./styles";

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<>
		<Navigation></Navigation>
		<Content>{children}</Content>
	</>
);
