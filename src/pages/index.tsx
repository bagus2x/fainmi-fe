import { Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from '@styles/home-index';
import Link from 'next/link';

export default function Home() {
    const classes = useStyles();
    const matches = useMediaQuery<Theme>((theme) => theme.breakpoints?.down('sm'));

    return (
        <>
            <AppBar classes={{ root: classes.navbar }} elevation={0} position="static" color="transparent">
                <Toolbar>
                    <div className={classes.logo}>
                        <Image src="/fainmi_large.svg" alt="logo" width={matches ? 35 : 50} height={matches ? 35 : 50} />
                    </div>
                    <div className={classes.buttonWrapper}>
                        <Link href="/signin">
                            <Button component="a" variant="text" color="primary" size={matches ? 'small' : 'large'}>
                                SIGN IN
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button component="a" variant={matches ? 'outlined' : 'contained'} color="primary" size={matches ? 'small' : 'large'}>
                                SIGN UP
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.heroes}>
                <Grid container>
                    <Grid item xs={12} lg={6}>
                        <Image src="/person_gabut.svg" alt="person_gabut" layout="responsive" width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <div className={classes.greetingWrapper}>
                            <Typography variant="h2">FAINMI</Typography>
                            <Typography align="center" variant="body1">
                                New Connection, New Pren wkwkw
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
