import useStyles from '@styles/signin';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { RegisterOptions, useForm } from 'react-hook-form';
import Router from 'next/router';
import { useEffect } from 'react';
import Link from '@components/ui/Link';
import { useDispatch } from 'react-redux';
import { signIn } from '@redux/profile/actions';
import useProfile from '@lib/hooks/profile';

const Rules: { [key: string]: RegisterOptions } = {
    username: {
        minLength: {
            value: 4,
            message: 'Username min length is 4 character'
        },
        maxLength: {
            value: 20,
            message: 'Username max length is 20 character'
        },
        required: 'Username is required'
    },
    password: {
        minLength: {
            value: 6,
            message: 'Password min length is 6 character'
        },
        maxLength: {
            value: 20,
            message: 'Password max length is 20 character'
        },
        required: 'Password is required'
    }
};

interface SignInField {
    username: string;
    password: string;
}

function Signin() {
    const { register, handleSubmit, errors, setError } = useForm<SignInField>();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { data, error, loading } = useProfile();

    const disabled = !!errors.username || !!errors.password || loading || !!data;

    useEffect(() => {
        if (data) Router.replace('/admin');
    }, [data]);

    useEffect(() => {
        if (error?.message.toLowerCase().includes('user')) {
            setError('username', { message: 'Userame or email not found' });
            return;
        }
        if (error?.message.toLowerCase().includes('password')) {
            setError('password', { message: 'Incorrect password' });
            return;
        }
    }, [error]);

    const onSubmit = handleSubmit((req) => dispatch(signIn(req)));

    return (
        <div className={classes.root}>
            <Container className={classes.container} component={Paper} maxWidth="sm">
                <div className={classes.header}>
                    <Image src="/fainmi_large.svg" width={50} height={50} />
                    <Typography variant="h5">Sign in to Fainmi</Typography>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <div id="signin_input_wrapper">
                        <TextField
                            inputRef={register(Rules.username)}
                            helperText={errors.username?.message || ' '}
                            error={!!errors.username?.message}
                            name="username"
                            label="Email or username"
                            variant="standard"
                            fullWidth
                        />
                        <div className={classes.password}>
                            <TextField
                                inputRef={register(Rules.password)}
                                helperText={errors.password?.message || ' '}
                                error={!!errors.password?.message}
                                name="password"
                                label="Password"
                                variant="standard"
                                fullWidth
                                type="password"
                            />
                            <Link href="/reset">Forgot your password?</Link>
                        </div>
                    </div>
                    <Button disabled={disabled} type="submit" disableElevation variant="contained" color="primary" fullWidth>
                        Sign In
                    </Button>
                </form>
                <div className={classes.signin_new_account}>
                    <Typography>New to Fainmi?</Typography>
                    <Link href="/signup">&nbsp;Create an account</Link>
                </div>
            </Container>
        </div>
    );
}

export default Signin;
