import useStyles from '@styles/signup';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@components/ui/Link';
import { RegisterOptions, useForm } from 'react-hook-form';
import Image from 'next/image';
import Router from 'next/router';
import { useEffect } from 'react';
import useProfile from '@lib/hooks/profile';
import { useDispatch } from 'react-redux';
import { signUp } from '@redux/profile/actions';

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
    email: {
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Email is invalid'
        },
        required: 'Email is required'
    },
    password: {
        minLength: {
            value: 6,
            message: 'Password must have at least 6 characters'
        },
        maxLength: {
            value: 20,
            message: 'Password max length is 20 character'
        },
        required: 'Password is required'
    }
};

interface SignUpField {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

function SignUp() {
    const classes = useStyles();
    const { register, handleSubmit, errors, setError } = useForm<SignUpField>();
    const { data, loading, error, isAuthenticated } = useProfile();
    const dispatch = useDispatch();

    const disabled = !!data || loading || isAuthenticated || !!errors.password || !!errors.username || !!errors.email;

    useEffect(() => {
        if (isAuthenticated) Router.replace('/admin');
    }, [isAuthenticated]);

    useEffect(() => {
        if (error?.message.toLowerCase().includes('email')) {
            setError('email', { message: 'Email already exists' });
            return;
        }
        if (error?.message.toLowerCase().includes('username')) {
            setError('username', { message: 'Username already exists' });
            return;
        }
    }, [error]);

    const onSubmit = handleSubmit(async (req) => dispatch(signUp(req)));

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="sm">
                <div className={classes.header}>
                    <Image src="/fainmi_large.svg" alt="logo" width={45} height={45} />

                    <Typography variant="h1">Create your account</Typography>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <div id="signup_input_wrapper">
                        <TextField
                            error={!!errors.username}
                            helperText={errors.username?.message || ' '}
                            inputRef={register(Rules.username)}
                            fullWidth
                            variant="standard"
                            name="username"
                            label="Username"
                        />
                        <TextField
                            error={!!errors.email}
                            helperText={errors.email?.message || ' '}
                            inputRef={register(Rules.email)}
                            fullWidth
                            variant="standard"
                            name="email"
                            label="Email"
                        />
                        <TextField
                            error={!!errors.password}
                            helperText={errors.password?.message || ' '}
                            inputRef={register(Rules.password)}
                            fullWidth
                            variant="standard"
                            name="password"
                            label="Password"
                            type="password"
                        />
                    </div>
                    <Button disabled={disabled} disableElevation fullWidth variant="contained" color="primary" type="submit">
                        Create account
                    </Button>
                </form>
                <Typography variant="caption">
                    By creating an account, you agree to the Terms of Service. For more information about Fainmi's privacy practices, see the Fainmi
                    Privacy Statement. We'll occasionally send you account-related emails.
                </Typography>
                <div className={classes.signup_already_have_account}>
                    <Typography>Already have account?</Typography>
                    <Link href="/signin">&nbsp;Sign in.</Link>
                </div>
            </Container>
        </div>
    );
}

export default SignUp;
