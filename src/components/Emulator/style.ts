import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        emulator: {
            border: `${theme.spacing(2)}px solid ${theme.palette.grey[800]}`,
            boxSizing: 'border-box',
            height: '85vh',
            borderRadius: theme.spacing(5),
            width: 'calc((9 / 16) * 85vh)',
            overflowY: 'auto'
        },
        background: {
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: `${theme.spacing(3)}px 0`,
            background: (props: any) => (props.backgroundImage ? `url(${props.backgroundImage})` : theme.palette.grey[200]),
            '& *': {
                fontFamily: (props: any) => props.fontFamily ?? theme.typography.fontFamily
            }
        },
        subBackground: {
            background: (props: any) => (props.backgroundSubImage ? `url(${props.backgroundSubImage})` : theme.palette.grey[200]),
            borderRadius: theme.spacing(5),
            width: '100%',
            maxWidth: 540,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        button: {
            background: (props: any) => (props.buttonImage ? `url(${props.buttonImage})` : '#fff'),
            padding: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
            margin: `${theme.spacing(2)}px 0`,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        linksWrapper: {
            width: '100%',
            padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`
        },
        title: {
            flex: 1
        }
    })
);

export default useStyles;
