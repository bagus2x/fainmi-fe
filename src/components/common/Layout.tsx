import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SideNavbar from '@components/common/SideNavbar';
import useSeratusVeha from '@lib/hooks/100vh';
import TopNavbar from './TopNavbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        body: {
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            root: {
                flexDirection: 'column-reverse'
            }
        }
    })
);

const Layout: React.FC = ({ children }) => {
    const classes = useStyles();
    const height = useSeratusVeha();

    return (
        <div style={{ height }} suppressHydrationWarning className={classes.root}>
            <SideNavbar />
            <div className={classes.body}>
                <TopNavbar />
                {children}
            </div>
        </div>
    );
};

export default Layout;
