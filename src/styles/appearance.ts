import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			background: theme.palette.grey[50],
			width: '100%',
			padding: theme.spacing(2),
			'& section h1': {
				fontSize: theme.typography.h5.fontSize,
				marginBottom: theme.spacing(2)
			},
			'& section': {
				marginBottom: theme.spacing(4)
			},
			[theme.breakpoints.down('sm')]: {
				padding: theme.spacing(1)
			}
		},
		image_app_wrapper: {
			display: 'flex',
			flexWrap: 'wrap',
			gap: theme.spacing(2)
		},
		image_app_item: {
			overflow: 'hidden',
			background: theme.palette.common.white,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			boxShadow: theme.shadows[1],
			borderRadius: theme.spacing(0.5),
			cursor: 'pointer'
		},
		emulator_wrapper: {
			display: 'flex',
			justifyContent: 'center',
			position: 'relative',
			width: '100%'
		}
	})
);

export default useStyles;
