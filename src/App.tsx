import React from 'react';
import './App.css';

import { StyleSheet, css } from 'aphrodite/no-important';

import {
	Theme,
	makeTheme,
	Navbar,
	NavItem,
	NavButton,
	Bold,
} from 'rykan-web-framework';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { initializeIcons } from '@uifabric/icons';

import { MotionDurations, MotionTimings } from '@uifabric/fluent-theme/lib/fluent/FluentMotion';

import { Folders, Files } from './components/Tiles';

import theme_config from './constants/theme';

import allStyles from './styles';

initializeIcons();

const theme = makeTheme({ theme: theme_config.theme, accent: theme_config.accent });

const MenuButton: React.FunctionComponent<{ icon?: string, children: string, onClick: React.MouseEventHandler }> = (props) => {
	return (
		<button onClick={props.onClick} className={css(allStyles.button, menuStyles.menu_button)}><Icon className={css(menuStyles.menu_button_icon)} iconName={props.icon} /><label className={css(menuStyles.menu_button_label)}>{props.children}</label></button>
	)
}

const menuStyles = StyleSheet.create({
	menu_button: {
		//width: "100%",
		height: 32,
		display: "flex",
		appearance: "none",
		//border: 0,
		outline: 0,
		padding: 4,
		fontSize: 16,
		marginLeft: 16,
		marginRight: 16,
		background: "none",
		color: "inherit",
		boxSizing: "border-box",
		border: "2px solid transparent",
		transitionDuration: MotionDurations.duration3,
		transitionTimingFunction: MotionTimings.standard,

		':hover': {
			//background: theme.baseLow,
			//boxShadow: Depths.depth64,
			boxShadow: `0 0 2px 0 ${theme.accent}, inset 0 0 2px 0 ${theme.accent}`,
			border: `2px solid ${theme.accent}`
		},

		':first-child': {
			marginTop: 16
		},

		':last-child': {
			marginBottom: 16
		}
	},

	menu_button_icon: {
		fontSize: 16,
		width: 16,
		height: 16,
		margin: "auto 8px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},

	menu_button_label: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginLeft: 8,
	},
});

interface State {
	folders: string[],
	files: Array<{ name: string, ext: string }>
}

export default class App extends React.Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			folders: [],
			files: [],
		}
	}

	async componentWillMount() {
		const res = await fetch('/drive.json')
		
		const drive = await res.json();

		this.setState({
			folders: drive.folders,
			files: drive.files,
		});
	}

	render() {
		return (
			<Theme theme={theme} style={{
				display: "flex", backgroundColor: theme.background.high, backgroundImage: `url(${require('./texture/dark-wall.png')})`, backgroundRepeat: "repeat", backgroundSize: "initial" }}>
				<Navbar logo={require('./logo_final_' + theme.theme + '.png')} style={{
					backgroundImage: `url(${require('./texture/black-felt.png')}), ${theme.background.metal}`,
					boxShadow: Depths.depth8,
					position: "fixed",
					minWidth: "100vw",
					width: "auto", flexGrow: 1
				}} outerStyle={{ justifyContent: "initial" }}>
					<NavItem link="/"><Bold>Drive</Bold></NavItem>
					<div className={css(styles.line)} style={{ margin: 8 }} />
					<NavItem link="/Manage/">Manage</NavItem>
					<NavItem link="https://account.rykan.tech/" right>Account</NavItem>
					<NavButton><Icon iconName="Help" /></NavButton>
					<NavButton><Icon iconName="Settings" /></NavButton>
				</Navbar>
				<div style={{ perspective: 320, display: "flex", perspectiveOrigin: 0, zIndex: 100, }}>
					<div className={css(styles.sidebar)} id="file_menu">
						<MenuButton onClick={() => console.log("Button clicked")} icon="FabricFolder">Files</MenuButton>
						<MenuButton onClick={() => console.log("Button clicked")} icon="Recent">Recent</MenuButton>
						<MenuButton onClick={() => console.log("Button clicked")} icon="Photo2">Photos</MenuButton>
						<MenuButton onClick={() => console.log("Button clicked")} icon="TextDocumentShared">Shared</MenuButton>
						<div style={{ display: "flex", margin: "7px 32px 8px", height: 2, background: theme.altMediumLow }} />
						<MenuButton onClick={() => console.log("Button clicked")} icon="PC1">PCs</MenuButton>
						<MenuButton onClick={() => console.log("Button clicked")} icon="CellPhone">Phones</MenuButton>
						<div style={{ display: "flex", margin: "7px 32px 8px", height: 2, background: theme.altMediumLow }} />
						<MenuButton onClick={() => console.log("Button clicked")} icon="RecycleBin">Recycle Bin</MenuButton>
						<div style={{ flexGrow: 1 }} />
						<div style={{ display: "flex", margin: "7px 32px 8px", height: 2, background: theme.altMediumLow }} />
						<MenuButton onClick={() => console.log("Button clicked")} icon="Feedback">Feedback</MenuButton>
					</div>
				</div>
				<div style={{ paddingTop: 42, margin: 0, flexGrow: 1 }}>
					<Folders folders={this.state.folders} />
					<Files files={this.state.files} />
				</div>
			</Theme>
		)
	}
}

const styles = StyleSheet.create({
	line: {
		margin: 4,
		//margin: "4px 0px",
		background: theme.altMediumLow,
		display: "flex",
		width: 2,
		boxShadow: "0 -1px rgba(0, 0, 0, 0.6), 0px 1px 0px rgba(255, 255, 255, 0.2)"
	},

	sidebar: {
		display: "flex",
		//pointerEvents: "none",
		flexDirection: "column",
		//opacity: 0,
		//transform: "translateX(-100%)",
		//transform: "rotateY(90deg)",
		transformOrigin: "0 0",
		boxShadow: Depths.depth16,
		boxSizing: "border-box",
		paddingTop: 42,
		width: 320,
		height: "100vh",

		transitionDuration: MotionDurations.duration3,
		tranitionTimingFunction: MotionTimings.standard,
	},
})