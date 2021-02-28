import useStyles from '@components/Emulator/style';
import Head from 'next/head';
import PhotoUploader from '@components/PhotoUploader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import EmulatorFrame from '@components/EmulatorFrame';

interface EmulatorProps {
    component?: React.ComponentType;
    backgroundImage: string;
    backgroundSubImage?: string;
    buttonImage: string;
    fontFamily: string;
    fontHref?: string;
}

const Emulator: React.FC<EmulatorProps> = ({ backgroundImage, backgroundSubImage, buttonImage, fontFamily, fontHref, component: Component }) => {
    const classes = useStyles({ backgroundImage, backgroundSubImage, buttonImage, fontFamily });
    const Frame = Component ?? EmulatorFrame;

    return (
        <Frame>
            <div className={classes.background}>
                <Head>
                    <link rel="stylesheet" href={fontHref} />
                </Head>
                <div className={classes.subBackground}>
                    <PhotoUploader size={90} src="/user.svg" />
                    <div className={classes.linksWrapper}>
                        <div className={classes.button}>
                            <Typography align="center" className={classes.title} variant="body1">
                                Link 1
                            </Typography>
                            <IconButton size="small" color="inherit">
                                <StarOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className={classes.button}>
                            <Typography align="center" className={classes.title} variant="body1">
                                Link 2
                            </Typography>
                            <IconButton size="small" color="inherit">
                                <StarOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className={classes.button}>
                            <Typography align="center" className={classes.title} variant="body1">
                                Link 3
                            </Typography>
                            <IconButton size="small" color="inherit">
                                <StarOutlinedIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </Frame>
    );
};

export default Emulator;
