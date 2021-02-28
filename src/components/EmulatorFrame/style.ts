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
        }
    })
);

export default useStyles;
