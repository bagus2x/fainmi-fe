import React, { useEffect } from 'react';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FormatPaintIcon from '@material-ui/icons/FormatPaintRounded';
import ShareIcon from '@material-ui/icons/ShareRounded';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import HelpIcon from '@material-ui/icons/HelpOutlineRounded';
import SignOutIcon from '@material-ui/icons/ExitToAppOutlined';
import { useDispatch } from 'react-redux';
import { signOut } from '@redux/profile/actions';
import { removeAccessToken } from '@lib/access-token';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
            border: `1px solid ${theme.palette.grey[300]}`,
            alignItems: 'center',
            maxWidth: 'fit-content'
        },
        mainSection: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        secondarySection: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            root: {
                height: theme.spacing(8),
                padding: theme.spacing(0.5),
                justifyContent: 'center',
                width: '100%',
                maxWidth: 'unset'
            },
            secondarySection: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
            }
        }
    })
);

enum Paths {
    ADMIN = '/admin',
    ACCOUNT = '/admin/account',
    SETTINGS = '/admin/settings',
    HELP = '/help'
}

function SideNavbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        for (let path in Object.values(Paths)) router.prefetch(path);
    }, []);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenuAndPush = (path?: string) => () => {
        if (path) router.push(path);
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        dispatch(signOut());
        removeAccessToken();
        router.replace('/signin');
    };

    return (
        <nav className={classes.root}>
            <Hidden smDown>
                <div className={classes.mainSection}>
                    <IconButton onClick={() => router.push(Paths.ADMIN)}>
                        <Image src="/fainmi_large.svg" width={30} height={30} />
                    </IconButton>
                </div>
            </Hidden>
            <div className={classes.secondarySection}>
                <IconButton onClick={() => router.push(Paths.ADMIN)}>
                    <FormatPaintIcon />
                </IconButton>
                <IconButton color="primary">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="primary"
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenuAndPush()}
                >
                    <MenuList>
                        <MenuItem onClick={handleCloseMenuAndPush(Paths.ACCOUNT)}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <Typography variant="inherit">My account</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenuAndPush(Paths.SETTINGS)}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <Typography variant="inherit">Settings</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenuAndPush(Paths.HELP)}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <Typography variant="inherit">Help</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                                <SignOutIcon />
                            </ListItemIcon>
                            <Typography variant="inherit">Sign Out</Typography>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </nav>
    );
}

export default SideNavbar;
