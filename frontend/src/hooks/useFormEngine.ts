import { useMemo, useState } from "react";

import type { TemplateSchema } from "../types/schema";

import { initializeForm } from "../utils/initializeForm";
import { validateForm } from "../utils/validation";

import type { FormState } from "../types/formState";
import type { FormEngine } from "../types/formEngine";

export function useFormEngine(
    template: TemplateSchema
) {

    /*
    -----------------------------
    Initial State
    -----------------------------
    */

    const initialValues = useMemo(

        () => initializeForm(template),

        [template]

    );

    const [formState, setFormState] =
        useState<FormState>({

            values: initialValues,

            errors: {},

            touched: {},

            submitting: false,

        });

    /*
    -----------------------------
    Update Field
    -----------------------------
    */

    const updateField = (

        fieldName: string,

        value: unknown

    ) => {
        clearError(fieldName);

        setFormState(previous => ({

            ...previous,

            values: {

                ...previous.values,

                [fieldName]: value,

            },

            touched: {

                ...previous.touched,

                [fieldName]: true,

            }

        }));

    };

    /*
    -----------------------------
    Validate
    -----------------------------
    */

    const validate = () => {

        const errors = validateForm(

            template,

            formState.values

        );

        setFormState(previous => ({

            ...previous,

            errors,

        }));

        return Object.keys(errors).length === 0;

    };

    /*
    -----------------------------
    Reset
    -----------------------------
    */

    const reset = () => {

        setFormState({

            values: initialValues,

            errors: {},

            touched: {},

            submitting: false,

        });

    };

    /*
    -----------------------------
    Loading
    -----------------------------
    */

    const setSubmitting = (

        submitting: boolean

    ) => {

        setFormState(previous => ({

            ...previous,

            submitting,

        }));

    };

    const setError = (

        fieldName: string,

        message: string

    ) => {

        setFormState(previous => ({

            ...previous,

            errors: {

                    ...previous.errors,

                [fieldName]: message,

            }

        }));

    };

    const clearError = (

        fieldName: string

    ) => {

        setFormState(previous => {

            const errors = {

                ...previous.errors

            };

            delete errors[fieldName];

            return {

                ...previous,

                errors,

            };

        });

    };

    const form: FormEngine = {
        values: formState.values,
        errors: formState.errors,
        touched: formState.touched,
        submitting: formState.submitting,
        isValid: Object.keys(formState.errors).length === 0,

        updateField,

        validate,

        reset,

        setSubmitting,

        setError,

        clearError,

    };
    return form;

}