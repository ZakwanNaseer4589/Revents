import { Form, Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modal/ModalWrapper'
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput'
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modal/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

export default function LoginForm(){

    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>

        <Formik
            initialValues={{email:'', password:''}}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
            onSubmit = {async (values, {setSubmitting, setErrors}) => {
                try{
                await signInWithEmail(values);
                setSubmitting(false)
                dispatch(closeModal())
                console.log(values);
                }catch (error) {
                    setErrors({auth: 'problem with user name or password'})
                    setSubmitting(false)
                }
                
            }}
        >

                {({isSubmitting, isValid, dirty, errors}) =>(
                    <Form className='ui form'>
                        <MyTextInput name='email' placeholder='Email Address' />
                        <MyTextInput name='password' placeholder='password' type='password' />
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button 
                        loading={isSubmitting}
                        disabled={!isValid || !dirty || isSubmitting}
                        type='submit'
                        fluid
                        size='large'
                        color='teal'
                        content='Login' />
                        <Divider horizontal >or</Divider>
                        <SocialLogin />
                    </Form>
                )}

        </Formik>

        </ModalWrapper>
    )
}