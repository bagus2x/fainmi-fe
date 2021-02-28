import { createMuiTheme } from '@material-ui/core/styles';
import { red, cyan, blueGrey } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blueGrey[500]
		},
		secondary: {
			main: cyan[400]
		},
		error: {
			main: red[400]
		},
		background: {
			default: '#fff'
		}
	},
	typography: {
		fontFamily: `'Exo 2', sans-serif`,
		button: {
			textTransform: 'none'
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				':focus': {
					outline: 'none'
				},
				'::-moz-focus-inner': {
					border: 0
				},
				body: {
					overscrollBehaviorY: 'contain'
				}
			}
		},
		MuiButton: {
			containedSecondary: {
				color: '#fff'
			}
		}
	}
});

export default theme;
