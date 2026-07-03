export interface FormState {

    values: Record<string, unknown>;

    errors: Record<string, string>;

    touched: Record<string, boolean>;

    submitting: boolean;

}