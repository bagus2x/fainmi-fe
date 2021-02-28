import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minHeight: '100vh',
		},
		container: {
			paddingTop: theme.spacing(8),
			background: '#fff',
		},
		header: {
			textAlign: 'center',
			'& h1': {
				fontSize: theme.spacing(6),
				[theme.breakpoints.down('sm')]: {
					fontSize: theme.spacing(3)
				}
			},
		},
		form: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(1),
			'& #signup_input_wrapper > *': {
				marginBottom: theme.spacing(2)
			}
		},
		signup_already_have_account: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center'
		}
	})
);

export default useStyles;
