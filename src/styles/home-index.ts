import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		navbar: {
			flexGrow: 1,
			boxSizing: 'border-box',
			padding: `${theme.spacing(2)}px ${theme.spacing(16)}px`,
			[theme.breakpoints.down('md')]: {
				padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
			},
			[theme.breakpoints.down('sm')]: {
				padding: `${theme.spacing(1)}px ${theme.spacing(0)}px`
			}
		},
		logo: {
			flexGrow: 1
		},
		buttonWrapper: {
			display: 'grid',
			gridTemplateColumns: 'auto auto',
			gap: theme.spacing(1),
			'& a': {
				textDecoration: 'none !important'
			}
		},
		heroes: {
			boxSizing: 'border-box',
			padding: `${theme.spacing(1)}px ${theme.spacing(16)}px`,
			[theme.breakpoints.down('md')]: {
				padding: `${theme.spacing(0)}px ${theme.spacing(1)}px`
			},
			[theme.breakpoints.down('sm')]: {
				padding: `${theme.spacing(0)}px ${theme.spacing(0)}px`
			},
			'& *': {
				userSelect: 'none'
			}
		},
		greetingWrapper: {
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'column',
			alignItems: 'center',
			height: '100%',
			[theme.breakpoints.up('md')]: {
				'& > :first-child': {
					fontSize: theme.spacing(16)
				}
			}
		}
	})
);

export default useStyles;
