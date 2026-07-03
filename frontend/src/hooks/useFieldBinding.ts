import { useCallback } from "react";

export function useFieldBinding(

    fieldName: string,

    value: any,

    onChange: (
        fieldName: string,
        value: any
    ) => void

) {

    const setValue = useCallback(

        (newValue: any) => {

            onChange(
                fieldName,
                newValue
            );

        },

        [fieldName, onChange]

    );

    return {

        value,

        setValue,

    };

}