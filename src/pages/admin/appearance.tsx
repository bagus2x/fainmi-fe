import Layout from '@components/common/Layout';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import useStyles from '@styles/appearance';
import Image from 'next/image';
import Head from 'next/head';
import Auth from '@components/common/Auth';

function Appearance() {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>Appearance</title>
            </Head>
            <div className={classes.container}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <section>
                            <Typography variant="h1">Themes</Typography>
                            <div className={classes.image_app_wrapper}></div>
                        </section>
                        <section>
                            <Typography variant="h1">Buttons</Typography>
                            coming soon
                        </section>
                        <section>
                            <Typography variant="h1">Fonts</Typography>
                            coming soon
                        </section>
                    </Grid>
                    <Hidden smDown>
                        <Grid className={classes.emulator_wrapper} item xs={12} md={6}>
                            {/* <Emulator data={data} style={newStyle} profile={profile} /> */}
                        </Grid>
                    </Hidden>
                </Grid>
            </div>
        </>
    );
}

Appearance.XLayout = Layout;
Appearance.XAuth = Auth;

export default Appearance;
