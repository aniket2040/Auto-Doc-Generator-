import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import type{ BaseFieldProps } from "../../types/form";
import { useFieldBinding } from "../../hooks/useFieldBinding";

export default function DynamicListInput({
    field,
    value,
    onChange,
}: BaseFieldProps) {

    const {
        value: items = [],
        setValue,
    } = useFieldBinding(
        field.name,
        value ?? [],
        onChange
    );

    const handleItemChange = (
        index: number,
        newValue: string
    ) => {

        const updatedItems = [...items];

        updatedItems[index] = newValue;

        setValue(updatedItems);

    };

    const addItem = () => {

        setValue([
            ...items,
            "",
        ]);

    };

    const removeItem = (
        index: number
    ) => {

        const updatedItems =
            items.filter(
                (_: string, i: number) => i !== index
            );

        setValue(updatedItems);

    };

    return (

        <Box sx={{ mt: 2, mb: 3 }}>

            <Stack spacing={2}>

                {items.map(
                    (
                        item: string,
                        index: number
                    ) => (

                        <Stack
                            direction="row"
                            spacing={2}
                            key={index}
                        >

                            <TextField
                                fullWidth
                                label={`${field.label} ${index + 1}`}
                                value={item}
                                onChange={(e) =>
                                    handleItemChange(
                                        index,
                                        e.target.value
                                    )
                                }
                            />

                            <IconButton
                                color="error"
                                onClick={() =>
                                    removeItem(index)
                                }
                            >
                                <DeleteIcon />
                            </IconButton>

                        </Stack>

                    )
                )}

                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addItem}
                >
                    Add Item
                </Button>

            </Stack>

        </Box>

    );

}