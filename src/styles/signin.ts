import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            background: `url(/sign_background.svg)`,
            height: '100vh',
            alignItems: 'center',
            userSelect: 'none'
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& :first-child': {
                marginBottom: theme.spacing(4)
            }
        },
        container: {
            padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
            '& a': {
                display: 'block'
            },
            [theme.breakpoints.down('sm')]: {
                padding: `${theme.spacing(4)}px ${theme.spacing(1)}px`
            }
        },
        form: {
            '& #signin_input_wrapper': {
                marginBottom: theme.spacing(5)
            },
            '& #signin_input_wrapper > *': {
                marginBottom: theme.spacing(3)
            }
        },
        signin_new_account: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        password: {
            '& a': {
                textAlign: 'right',
                fontSize: theme.typography.fontSize
            }
        }
    })
);

export default useStyles;
