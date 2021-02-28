import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'grid',
			gridTemplateColumns: 'auto 1fr',
			gap: theme.spacing(1),
			background: theme.palette.background.paper,
			borderRadius: theme.spacing(1),
			padding: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
			boxShadow: theme.shadows[2],
			transition: theme.transitions.easing.easeIn
		},
		dragIndicator: {
			display: 'grid',
			placeItems: 'center',
			cursor: 'grab'
		},
		editor: {
			display: 'grid',
			gridTemplateColumns: '1fr auto',
			height: 'auto',
			gridTemplateAreas: `
				"iw sm"
				"tb sm"
			`,
		},
		inputWrapper: {
			gridArea: 'iw',
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			position: 'relative',
			minHeight: 40
		},
		toolbox: {
			gridArea: 'tb',
			display: 'flex',
			marginTop: theme.spacing(2.5)
		},
		switchMore: {
			gridArea: 'sm',
			display: 'grid',
			placeItems: 'center'
		},
		phantomButton: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			cursor: 'text'
		},
		inputUrl: {
			fontSize: theme.typography.body2.fontSize,
			color: theme.palette.grey[600]
		}
	})
);

export default useStyles;
