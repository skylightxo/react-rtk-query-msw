import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    email: yup.string().required('Please provide your email').email("Email doesn't look right"),
    username: yup.string().required('Username is a manadatory field'),
    password: yup.string().required('Password is required'),
    passwordConfirm: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

export const loginSchema = yup.object().shape({
    username: yup.string().required('Username is a manadatory field'),
    password: yup.string().required('Password is required'),
});