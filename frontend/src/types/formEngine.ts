export interface FormEngine {

    values: Record<string, unknown>;

    errors: Record<string, string>;

    touched: Record<string, boolean>;

    submitting: boolean;

    isValid: boolean;

    updateField: (
        fieldName: string,
        value: unknown
    ) => void;

    validate: () => boolean;

    reset: () => void;

    setSubmitting: (
        submitting: boolean
    ) => void;

    setError: (
        fieldName: string,
        message: string
    ) => void;

    clearError: (
        fieldName: string
    ) => void;    

}