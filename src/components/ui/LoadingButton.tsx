import Button, { ButtonProps as MUIButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface ButtonProps extends MUIButtonProps {
    loading?: boolean;
}

const LoadingButton: React.FC<ButtonProps> = ({ children, loading, ...props }) => {
    return <Button {...props}>{loading ? <CircularProgress size={25} color="inherit" /> : children}</Button>;
};

export default LoadingButton;
