import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > button': {
                marginBottom: theme.spacing(2.5)
            }
        },
        linkWrapper: {
            '& > *': {
                marginBottom: theme.spacing(2)
            }
        }
    })
);

export default useStyles;
