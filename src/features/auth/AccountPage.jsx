import { Form, Formik } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Label, Segment } from 'semantic-ui-react'
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { updateUserPassword } from '../../app/firestore/firebaseService';


export default function AccountPage() {
    const {currentUser} = useSelector((state) => state.auth)
    return(
        <Segment>
            <Header dividing size='large' content='Account' />
            {currentUser.providerId === 'password' && 
            <>
                <Header color='teal' sub content='change password' />
                <p>use this form to change your password</p>

                <Formik
                initialValues={{newpassword1: '', newpassword2: ''}}
                validationSchema = {
                    Yup.object({
                        newpassword1: Yup.string().required('password is required'),
                        newpassword2: Yup.string().oneOf([Yup.ref('newpassword1'), null],
                        'password do not match')
                    })}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        try{
                            await updateUserPassword(values);
                        }catch(error){
                            setErrors({auth: error.message});
                        }finally {
                            setSubmitting(false);
                        }
                        
                    }}
                >

                {({errors, isSubmitting, isValid, dirty}) =>(

                    <Form className='ui form'>
                        <MyTextInput name='newpassword1' type='password' placeholder='new password' />

                        <MyTextInput name='newpassword2' type='password' placeholder='confirm password' />

                        {errors.auth && 
                        <Label 
                            basic 
                            color='red' 
                            style={{marginBottom: 10}} 
                            content={errors.auth} />
                        }
                        <Button
                        style={{display: 'block'}} 
                        type='submit' 
                        disabled={!isValid || isSubmitting || !dirty}
                        loading={isSubmitting} 
                        size='large'
                        positive
                        content='update password'
                        />
                        </Form>
                    )}
                </Formik>
            </>}
            {currentUser.providerId === 'facebook.com' &&
            <>
                <Header color='teal' sub content='Facebook account' />
                <p>please visit the facebook to update your account</p>
                <Button icon='facebook' color='facebook' as={Link} to='https://facebook.com'
                content='go to facebook'
                />
            </>}
            {currentUser.providerId === 'google.com' &&
            <>
                <Header color='teal' sub content='Google account' />
                <p>please visit the facebook to update your account</p>
                <Button icon='google' color='google plus' as={Link} to='https://facebook.com'
                content='go to google'
                />
            </>}
        </Segment>
    )
}