import React, { useEffect } from 'react';
import Router from 'next/router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import useProfile from '@lib/hooks/profile';
import { removeAccessToken } from '@lib/access-token';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flex: 1,
            background: theme.palette.grey[100],
            display: 'grid',
            placeItems: 'center'
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    })
);

const Auth: React.FC = ({ children }) => {
    const classes = useStyles();
    const { isAuthenticated, data } = useProfile();

    useEffect(() => {
        if (!isAuthenticated) {
            removeAccessToken();
            Router.replace('/signin');
        }
    }, [isAuthenticated]);

    if (!data) {
        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <CircularProgress color="secondary" />
                    <Typography variant="caption">Please wait...</Typography>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default Auth;
