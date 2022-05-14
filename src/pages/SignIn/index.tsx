import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { PasswordInput } from 'run-and-drive-lib/components';
import { getErrorMessage } from 'run-and-drive-lib/redux';
import { emailSchema, isEmpty, passwordSchema } from 'run-and-drive-lib/utils';
import * as yup from 'yup';

import { SignInPayload } from '@models/api';
import { useSignInMutation } from '@redux/queries/authentication';

import { Form, FormWrapper, SignInWrapper, Title } from './styles';

const loginFormSchema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

const SignIn: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty },
  } = useForm<SignInPayload>({
    mode: 'onBlur',
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [signIn, { isLoading, isSuccess, error, reset: resetSignIn }] =
    useSignInMutation();

  useEffect(() => {
    if (!isSuccess) return;
    navigate('/', { replace: true });
  }, [isSuccess, navigate]);

  const handleReset = () => {
    resetForm();
    resetSignIn();
  };

  return (
    <Container maxWidth="sm" css={SignInWrapper}>
      <Paper elevation={9} css={FormWrapper}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
        >
          <Typography variant="h1" css={Title}>
            Please authenticate yourself
          </Typography>
          <AccountCircleIcon fontSize="large" />
        </Stack>
        <form css={Form}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', { required: true })}
          />
          <PasswordInput
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', { required: true })}
          />
          <Collapse in={!!error}>
            <Alert severity="error">
              <>
                <AlertTitle>Authentication failed</AlertTitle>
                {getErrorMessage(error)}
              </>
            </Alert>
          </Collapse>
          <Stack direction="row" alignItems="center" justifyContent="end" spacing={2}>
            <Fade in={isDirty && !isLoading}>
              <Button onClick={handleReset}>Reset</Button>
            </Fade>
            <LoadingButton
              variant="contained"
              endIcon={<VpnKeyIcon />}
              disabled={!isEmpty(errors)}
              loading={isLoading}
              loadingPosition="end"
              onClick={handleSubmit(signIn)}
            >
              Sign In
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
