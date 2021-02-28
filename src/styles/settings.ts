import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: theme.palette.grey[50],
            flex: 1
        },
        container: {
            padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`
        },
        buttonDelete: {
            borderColor: red[400],
            color: red[400]
        }
    })
);

export default useStyles;
