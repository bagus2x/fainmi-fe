import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			background: theme.palette.grey[50],
			flex: 1
		},
		container: {
			padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
			'& > h1': {
				marginTop: theme.spacing(2),
				marginBottom: theme.spacing(4),
				fontSize: theme.typography.h4.fontSize
			},
			[theme.breakpoints.down('md')]: {
				'& > h1': {
					marginBottom: theme.spacing(4),
					fontSize: theme.typography.h5.fontSize
				}
			}
		},
		header: {
			display: 'flex',
			justifyContent: 'center'
		},
		form_container: {
			display: 'flex',
			flexDirection: 'column',
			'& > *': {
				marginBottom: theme.spacing(2)
			}
		},
		btn_update: {
			color: theme.palette.error.main,
			cursor: 'pointer'
		}
	})
);

export default useStyles;
