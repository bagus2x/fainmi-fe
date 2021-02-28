import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface AlertProps {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    fullWidth?: boolean;
    size: 'small' | 'medium';
}

const Alert: React.FC<AlertProps> = ({ type, message, fullWidth, size }) => {
    return <div>{message}</div>;
};

export default Alert;
