import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import type{ BaseFieldProps } from "../../types/form";
import { useFieldBinding } from "../../hooks/useFieldBinding";

export default function NestedServiceInput({
    field,
    value,
    onChange,
}: BaseFieldProps) {

    const {
        value: services = [],
        setValue,
    } = useFieldBinding(
        field.name,
        value ?? [],
        onChange
    );

    const addService = () => {

        setValue([
            ...services,
            {
                description: "",
                subservices: [""],
            },
        ]);

    };

    const removeService = (serviceIndex: number) => {

        setValue(
            services.filter(
                (_: any, index: number) =>
                    index !== serviceIndex
            )
        );

    };

    const updateServiceDescription = (
        serviceIndex: number,
        description: string
    ) => {

        const updated = [...services];

        updated[serviceIndex].description =
            description;

        setValue(updated);

    };

    const addSubService = (
        serviceIndex: number
    ) => {

        const updated = [...services];

        updated[serviceIndex].subservices.push("");

        setValue(updated);

    };

    const removeSubService = (
        serviceIndex: number,
        subIndex: number
    ) => {

        const updated = [...services];

        updated[serviceIndex].subservices =
            updated[serviceIndex].subservices.filter(
                (_: any, i: number) => i !== subIndex
            );

        setValue(updated);

    };

    const updateSubService = (
        serviceIndex: number,
        subIndex: number,
        value: string
    ) => {

        const updated = [...services];

        updated[serviceIndex].subservices[subIndex] =
            value;

        setValue(updated);

    };

    return (

        <Box sx={{ mt: 2, mb: 3 }}>

            <Stack spacing={3}>

                {services.map(
                    (service: any, serviceIndex: number) => (

                        <Card key={serviceIndex}>

                            <CardContent>

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    {field.parent_label ?? "Service"}{" "}
                                    {serviceIndex + 1}
                                </Typography>

                                <TextField
                                    fullWidth
                                    label={
                                        field.parent_label ??
                                        "Service"
                                    }
                                    value={
                                        service.description
                                    }
                                    onChange={(e) =>
                                        updateServiceDescription(
                                            serviceIndex,
                                            e.target.value
                                        )
                                    }
                                />

                                <Box sx={{ mt: 3 }}>

                                    <Typography
                                        variant="subtitle1"
                                    >
                                        {field.child_label ??
                                            "Sub Services"}
                                    </Typography>

                                    <Stack
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                    >

                                        {service.subservices.map(
                                            (
                                                sub: string,
                                                subIndex: number
                                            ) => (

                                                <Stack
                                                    key={subIndex}
                                                    direction="row"
                                                    spacing={2}
                                                >

                                                    <TextField
                                                        fullWidth
                                                        label={`${field.child_label ?? "Sub Service"} ${subIndex + 1}`}
                                                        value={sub}
                                                        onChange={(e) =>
                                                            updateSubService(
                                                                serviceIndex,
                                                                subIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            removeSubService(
                                                                serviceIndex,
                                                                subIndex
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>

                                                </Stack>

                                            )
                                        )}

                                        <Button
                                            startIcon={<AddIcon />}
                                            onClick={() =>
                                                addSubService(
                                                    serviceIndex
                                                )
                                            }
                                        >
                                            Add Sub Service
                                        </Button>

                                    </Stack>

                                </Box>

                                <Button
                                    color="error"
                                    sx={{ mt: 3 }}
                                    startIcon={<DeleteIcon />}
                                    onClick={() =>
                                        removeService(
                                            serviceIndex
                                        )
                                    }
                                >
                                    Remove Service
                                </Button>

                            </CardContent>

                        </Card>

                    )
                )}

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addService}
                >
                    Add Service
                </Button>

            </Stack>

        </Box>

    );

}