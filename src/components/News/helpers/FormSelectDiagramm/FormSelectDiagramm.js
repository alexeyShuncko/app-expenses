import React from 'react';
import { Form } from 'react-final-form';
import s from './FormSelectDiagramm.module.css';
import { Field } from 'react-final-form';


const FormSelectDiagramm = (props) => {

    const onSubmit = (values) => {
        props.addSelect(values)
    }

    return (
        <Form
            onSubmit={onSubmit}

            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} className={s.form}>

                    <Field className={s.fieldBynUsd}
                        onChange={onSubmit} name="select" component="select" >
                        <option>{props.select}</option>
                        <option value="%" > %</option>
                        <option value="BYN"> BYN</option>
                        <option value="USD"> USD</option>
                    </Field>
                </form>
            )}
        />

    )
}

export default FormSelectDiagramm

