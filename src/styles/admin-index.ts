import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            flex: 1,
            display: 'flex',
            position: 'relative',
            width: '100%',
            minHeight: 0,
            padding: theme.spacing(2),
            background: theme.palette.grey[50],
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(1)
            }
        },
        linksEditor: {
            flex: 1,
            overflowY: 'auto',
            [theme.breakpoints.up('sm')]: {
                paddingRight: theme.spacing(2)
            }
        },
        emulator: {
            flex: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            '& > *': {
                positon: 'fixed'
            }
        }
    })
);

export default useStyles;
