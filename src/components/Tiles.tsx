import React from 'react';

import { StyleSheet, css } from 'aphrodite/no-important';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
import { MotionDurations, MotionTimings } from '@uifabric/fluent-theme/lib/fluent/FluentMotion';

import frontplate from '../folders/folder-large_frontplate_nopreview.svg';
import frontplate_preview from '../folders/folder-large_frontplate_thumbnail.svg';
import backplate from '../folders/folder-large_backplate.svg';

import {
	makeTheme,
	Bold,
} from 'rykan-web-framework';

import theme_config from '../constants/theme';

const theme = makeTheme({ theme: theme_config.theme, accent: theme_config.accent });

interface FolderProps {
	folders: string[]
}

const preview_folders = [
	"Documents",
	"Movies",
	"Photos",
]

const Folders: React.FunctionComponent<FolderProps> = (props) => {
	const folders = props.folders.map((folder) => {
		if (preview_folders.includes(folder)) {
			return (
				<div className={css(styles.tile)}>
					<div className={css(styles.tile_icon)}>
						<div style={{ margin: "0 auto", width: 118, height: 86 }}>
							<img className={css(styles.tile_plate)} src={backplate} />
							<div className={css(styles.tile_content)} />
							<img className={css(styles.tile_plate)} src={frontplate_preview} />
						</div>
						<div className={css(styles.tile_name)}>
							<span>{folder}</span>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className={css(styles.tile)}>
				<div className={css(styles.tile_icon)}>
					<div style={{ margin: "0 auto", width: 118, height: 86 }}>
						<img className={css(styles.tile_plate)} src={backplate} />
						<div className={css(styles.tile_content)} />
						<img className={css(styles.tile_plate)} src={frontplate} />
					</div>
					<div className={css(styles.tile_name)}>
						<span>{folder}</span>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className={css(styles.tile_grid)} style={{ gridTemplateRows: "48px repeat(auto-fit, 176px)" }}>
			<h1 className={css(styles.section_title)}>Your Drive</h1>
			{folders}
		</div>
	)
}

interface FileProps {
	files: Array<{ name: string, ext: string }>
}

const imageEXTs = [
	"jpg",
	"jpeg",
	"tif",
	"tiff",
	"gif",
	"bmp",
	"png",
]
const compressed = [
	"7z",
	"as",
	"bin",
	"bz",
	"bz2",
	"bzip2",
	"cpgz",
	"cpio",
	"gz",
	"hqx",
	"pax",
	"tar",
	"tbz",
	"tbz2",
	"tgz",
	"uu",
	"xip",
	"z",
	"zip"
]

const fileIcon: (ext: string) => string = (ext) => {
	ext = ext.toLowerCase();
	if (ext === "docx") {
		//return `MSOffice/${ext.toUpperCase()}`;
		return "docx";
	} else if (imageEXTs.includes(ext)) {
		return "Document_1";
	} else if (compressed.includes(ext)) {
		return `Compressed/${ext.toUpperCase()}`;
	}
	return "Document_1";
}

const Files: React.FunctionComponent<FileProps> = (props) => {
	const files = props.files.map((file) => {
		return (
			<div className={css(styles.tile)}>
				<div className={css(styles.tile_icon)}>
					<div style={{ margin: "0 auto", width: 96, height: 96 }}>
						<img className={css(styles.tile_mime)} src={require(`../icons/${fileIcon(file.ext)}.ico`)} />
					</div>
					<div className={css(styles.tile_name)}>
						<span>{file.name}.{file.ext}</span>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className={css(styles.tile_grid)}>
			{files}
		</div>
	)
}

const styles = StyleSheet.create({
	tile_grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, 176px)",
		gridTemplateRows: "repeat(auto-fit, 176px)",
		gridGap: 8,
		marginTop: 16,
		marginBottom: 16,
		paddingLeft: 32,
		paddingRight: 32,
	},

	tile: {
		display: "flex",
		cursor: "default",
		boxSizing: "border-box",
		border: "2px solid transparent",
		transitionDuration: MotionDurations.duration3,
		transitionTimingFunction: MotionTimings.standard,

		':hover': {
			//background: theme.baseLow,
			//boxShadow: Depths.depth64,
			boxShadow: `0 0 4px 1px ${theme.accent}, inset 0 0 4px 1px ${theme.accent}, ${Depths.depth16}`,
			border: `2px solid ${theme.accent}`
		}
	},

	tile_icon: {
		margin: "0 auto",
		marginTop: 16,
		position: "relative",
		display: "flex",
		width: 144,
	},

	tile_plate: {
		position: "absolute",
		margin: "0 auto",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},

	tile_mime: {
		position: "absolute",
		margin: "auto",
		width: 96,
		height: 96,
	},

	tile_name: {
		display: "flex",
		position: "absolute",
		bottom: 0,
		width: "100%",
		textAlign: "center",
		marginBottom: 16,
		justifyContent: "center",
		fontWeight: 300,
		fontSize: 14,
	},

	section_title: {
		fontWeight: 200,
		gridColumn: "1 / -1",
		margin: 0,
		flexDirection: "column",
		justifyContent: "center",
		marginLeft: 32,
	},

	tile_content: {
		display: "flex",
		margin: "0 auto",
		width: 104,
		height: 64,
		position: "absolute",
		background: theme.baseHigh,
		boxShadow: Depths.depth4,
		top: 14,
		left: 0,
		right: 0,
		bottom: 0
	}
})

export { Folders, Files };