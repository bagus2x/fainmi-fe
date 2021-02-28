import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative'
        },
        border: {
            display: 'grid',
            background: '#fff',
            boxSizing: 'border-box',
            placeItems: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #fff'
        },
        buttonCamera: {
            position: 'absolute',
            right: 0,
            bottom: 10,
            borderRadius: '50%',
            background: '#fff',
            '& > input': {
                display: 'none'
            }
        },
        dialog: {
            borderRadius: theme.spacing(2)
        }
    })
);

export default useStyles;
