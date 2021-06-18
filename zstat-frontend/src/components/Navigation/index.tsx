import React from "react";

import { Centered } from "../../layout/grid";
import { Brand } from "../Brand";
import { NavBrand, NavigationContainer, NavLeft } from "./styles";

export const Navigation: React.FC = () => (
	<NavigationContainer>
		<NavBrand>
			<Brand />
		</NavBrand>
	</NavigationContainer>
);
