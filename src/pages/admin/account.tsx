import React, { useEffect, useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { RegisterOptions, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useStyles from '@styles/account';
import Layout from '@components/common/Layout';
import Auth from '@components/common/Auth';
import useProfile from '@lib/hooks/profile';
import { updateProfile } from '@redux/profile/actions';
import { getAccessToken } from '@lib/access-token';
import UploadPhoto from '@components/PhotoUploader';
import { API } from '@lib/global-var';

interface UpdateFormField {
    username: string;
    email: string;
    password?: string;
    confirm_password?: string;
}

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

function Account() {
    const { register, handleSubmit, errors, watch, setError } = useForm<UpdateFormField>();
    const [enablePasswordField, setEnablePasswordField] = useState(false);
    const [enableForm, setEnableForm] = useState(false);
    const password = useRef<string | undefined>();
    const classes = useStyles();
    const { data, error } = useProfile();
    const dispatch = useDispatch();

    password.current = watch('password');

    const toggleenableForm = () => {
        setEnableForm(!enableForm);
        if (enableForm) setEnablePasswordField(false);
    };

    const toggleEnablePasswordField = () => {
        setEnablePasswordField(!enablePasswordField);
    };

    const handleUpdate = handleSubmit((req) => {
        if (req.email !== data?.email || req.username !== data?.username || req.password !== '' || req.password !== undefined) {
            dispatch(updateProfile(getAccessToken() as string, req));
        }
        setEnableForm(false);
    });

    useEffect(() => {
        if (error) {
            setEnableForm(true);
            if (error.message?.includes('email')) {
                setError('email', { message: 'Email already taken' });
                return;
            }
            if (error.message?.includes('username')) {
                setError('username', { message: 'Username already taken' });
                return;
            }
        }
    }, [error]);

    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth="md">
                <div className={classes.header}>
                    <UploadPhoto src={data?.photo ? `${API}/${data.photo}` : '/user.svg'} size={120} />
                </div>
                <Typography variant="h1">My Profile</Typography>
                <form onSubmit={handleUpdate} className={classes.form_container}>
                    <span>
                        <IconButton edge="start" color="secondary" onClick={toggleenableForm}>
                            {!enableForm ? <EditIcon /> : <CancelIcon />}
                        </IconButton>
                        {enableForm && (
                            <IconButton disabled={false} color="secondary" type="submit">
                                <SaveIcon />
                            </IconButton>
                        )}
                    </span>
                    <TextField
                        InputLabelProps={{
                            shrink: true
                        }}
                        disabled={true}
                        autoComplete="off"
                        label="Profile ID"
                        color="primary"
                        helperText=" "
                        value={data?.profileID}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputRef={register(Rules.username)}
                        disabled={!enableForm}
                        autoComplete="off"
                        label="Username"
                        name="username"
                        color="primary"
                        defaultValue={data?.username}
                        helperText={errors.username?.message || ' '}
                        error={!!errors.username}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputRef={register(Rules.email)}
                        disabled={!enableForm}
                        autoComplete="off"
                        label="Email"
                        name="email"
                        color="primary"
                        defaultValue={data?.email}
                        helperText={errors.email?.message || ' '}
                        error={!!errors.email}
                    />
                    {enablePasswordField && enableForm && (
                        <>
                            <TextField
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputRef={register(Rules.password)}
                                disabled={!enableForm}
                                placeholder=""
                                autoComplete="off"
                                label="Password"
                                name="password"
                                type="password"
                                color="primary"
                                defaultValue=""
                                helperText={errors.password?.message || ' '}
                                error={!!errors.password}
                            />
                            <TextField
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputRef={register({
                                    validate: (value) => {
                                        return value === password.current || 'The passwords do not match';
                                    }
                                })}
                                disabled={!enableForm}
                                placeholder=""
                                autoComplete="off"
                                label="Confirm password"
                                name="confirm_password"
                                type="password"
                                color="primary"
                                defaultValue=""
                                helperText={errors.confirm_password?.message || ' '}
                                error={!!errors.confirm_password}
                            />
                        </>
                    )}
                </form>
                {enableForm && !enablePasswordField && (
                    <span onClick={toggleEnablePasswordField} className={classes.btn_update}>
                        Update password?
                    </span>
                )}
            </Container>
        </div>
    );
}

Account.XLayout = Layout;
Account.XAuth = Auth;

export default Account;
