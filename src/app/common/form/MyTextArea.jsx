import React from 'react';
import { useField } from 'formik';
import { FormField } from 'semantic-ui-react';

export default function MyTextArea({label, ...props}){

    const[field, meta] = useField(props);
    return(
        <FormField error={meta.touched && !!meta.error}>

        <label>{label}</label>
        <textarea {...field} {...props} />

        {meta.touched && meta.error ? (
            <label basic color="red"> {meta.error} </label>
        ) : null }

        </FormField>
    )

}