import Auth from '@components/common/Auth';
import Layout from '@components/common/Layout';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import useStyles from '@styles/settings';

function Settings() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="md">
                <div>
                    <Typography variant="h4">Account</Typography>
                    <Button variant="outlined" className={classes.buttonDelete}>
                        Delete Account?
                    </Button>
                </div>
            </Container>
        </div>
    );
}

Settings.XLayout = Layout;
Settings.XAuth = Auth;

export default Settings;
