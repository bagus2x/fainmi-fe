import { createStyles, makeStyles, Tab, Tabs, Theme, useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: `1px solid ${theme.palette.grey[300]}`,
            background: '#fff',
            width: '100%',
            position: 'sticky',
            top: 0,
            zIndex: 500
        },
        indi: {
            transition: 'none !important',
            background: 'red'
        }
    })
);

export enum Paths {
    LINKS = '/admin',
    APPEARANCE = '/admin/appearance',
    STATS = '/admin/stats',
    PREVIEW = '/admin/preview'
}

const TopNavbar = () => {
    const classes = useStyles();
    const router = useRouter();
    const matches = useMediaQuery<Theme>((theme) => theme.breakpoints?.up('md'));

    useEffect(() => {
        for (let path in Paths) router.prefetch(Paths[path]);
    }, []);

    if (!Object.values(Paths).includes(router.pathname as Paths)) return <React.Fragment />;

    const onClick = (path: Paths) => {
        return {
            onClick: () => {
                router.push(path);
            },
            value: path
        };
    };

    return (
        <div className={classes.root}>
            <Tabs
                value={router.pathname}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                TabIndicatorProps={{ style: { transition: 'none' } }}
            >
                <Tab {...onClick(Paths.LINKS)} label="Links" />
                <Tab {...onClick(Paths.APPEARANCE)} label="Appearance" />
                <Tab {...onClick(Paths.STATS)} label="Statistics" />
                {matches ? '' : <Tab {...onClick(Paths.PREVIEW)} label="Preview" />}
            </Tabs>
        </div>
    );
};

export default TopNavbar;
