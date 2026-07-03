import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import type{ BaseFieldProps } from "../../types/form";
import { useFieldBinding } from "../../hooks/useFieldBinding";

export default function DynamicTableInput({
    field,
    value,
    onChange,
}: BaseFieldProps) {

    const {
        value: rows = [],
        setValue,
    } = useFieldBinding(
        field.name,
        value ?? [],
        onChange
    );

    const addRow = () => {

        const newRow: Record<string, any> = {};

        field.columns?.forEach((column) => {
            newRow[column.name] = "";
        });

        setValue([
            ...rows,
            newRow,
        ]);
    };

    const removeRow = (index: number) => {

        setValue(
            rows.filter(
                (_: any, i: number) => i !== index
            )
        );
    };

    const updateCell = (
        rowIndex: number,
        columnName: string,
        cellValue: string
    ) => {

        const updatedRows = [...rows];

        updatedRows[rowIndex] = {
            ...updatedRows[rowIndex],
            [columnName]: cellValue,
        };

        setValue(updatedRows);
    };

    return (

        <Box sx={{ mt: 2, mb: 4 }}>

            <Paper elevation={2}>

                <Table>

                    <TableHead>

                        <TableRow>

                            {field.columns?.map((column) => (

                                <TableCell key={column.name}>
                                    {column.label}
                                </TableCell>

                            ))}

                            <TableCell align="center">
                                Actions
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {rows.map(
                            (row: any, rowIndex: number) => (

                                <TableRow key={rowIndex}>

                                    {field.columns?.map((column) => (

                                        <TableCell key={column.name}>

                                            <TextField
                                                fullWidth
                                                size="small"
                                                type={
                                                    column.type === "number"
                                                        ? "number"
                                                        : "text"
                                                }
                                                value={
                                                    row[column.name] ?? ""
                                                }
                                                onChange={(e) =>
                                                    updateCell(
                                                        rowIndex,
                                                        column.name,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </TableCell>

                                    ))}

                                    <TableCell align="center">

                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                removeRow(rowIndex)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            )
                        )}

                    </TableBody>

                </Table>

            </Paper>

            <Button
                sx={{ mt: 2 }}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={addRow}
            >
                Add Row
            </Button>

        </Box>

    );

}