import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidator();
  }, [formState]);


  useEffect(() => {
    
    setFormState(initialForm)
  
   
  }, [initialForm])
  

  //memorizar el formulario , y solo cambiar cuando cambie el formValidation cambie
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidator = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      //se llama la funcion con los datos en este caso fn
      const [fn, errorMessage] = formValidations[formField];
      //aqui se crea el dato que valida y luego pasarselo a los otros, y se implementa un ternario
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
