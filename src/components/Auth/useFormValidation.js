import React from "react";

function useFormValidation(initialState, validate, authenticateUser) {
    const [values, setValue] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false)

    React.useEffect(() => {
        if(isSubmitting) {
            const noErrors = Object.keys(errors).length === 0
            if(noErrors) {
                // console.log('authenticated', values)
                authenticateUser()
                setSubmitting(true)
            }
        } else {
            setSubmitting(false)
        }
    }, [errors])

    function handleChange(event) {
        event.persist()
        setValue(preveiousValues => ({
            ...preveiousValues,
            [event.target.name]: event.target.value
        }))
    }
    function handleBlur() {
        const validationErrors = validate(values); 
        setErrors(validationErrors)
    }
    function handleSubmit(event) {
       event.preventDefault();
       const validationErrors = validate(values);
       setErrors(validationErrors)
       setSubmitting(true)
       // console.log({ values })
    }
    return { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation;
