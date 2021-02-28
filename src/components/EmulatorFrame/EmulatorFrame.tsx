import React from 'react';
import useStyles from '@components/EmulatorFrame/style';

const EmulatorFrame: React.FC = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.emulator}>{children}</div>;
};

export default EmulatorFrame;
