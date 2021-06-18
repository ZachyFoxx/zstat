import styled from "styled-components";

import { Centered } from "../../layout/grid";
import { device } from "../../styles";

export const NavigationContainer = styled.div`
	display: grid;
	height: 50px;

	grid-template: 50px / 50px auto auto auto 50px;

	@media ${device.tablet} {
		grid-template: 50px / 100px auto auto;
	}

	@media ${device.desktop} {
		height: 100px;
		grid-template: 100px / 150px auto auto;
	}
`;

export const NavBrand = styled.div`
	grid-area: 1 / 3 / 1 / 3;
	align-self: center;
	justify-self: center;

	@media ${device.tablet} {
		grid-area: 1 / 1 / 1 / 1;
	}

	@media ${device.desktop} {
		font-size: 24px;
	}
`;

export const NavLeft = styled.div`
	grid-row: 1;
	grid-column: 1;
	justify-self: center;
	align-self: center;
`;

export const NavRight = styled.div``;
