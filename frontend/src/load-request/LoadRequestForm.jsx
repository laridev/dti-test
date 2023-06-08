import React, { useState, useMemo, useCallback } from 'react';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { NumericFormat, PatternFormat } from 'react-number-format';

const CurrencyInput = React.forwardRef((props, ref) => {
    const { onChange, name, ...other } = props;

    return (
        <NumericFormat
            {...other}    
            getInputRef={ref}
            onValueChange={values => onChange({ target: { name, value: values.value } }) }
            thousandSeparator="."
            decimalSeparator=   ","
            prefix="R$"
            valueIsNumericString
            decimalScale={2}
            allowNegative={false}
        />
    );
});

const CPFInput = React.forwardRef((props, ref) => {
    const { onChange, name, ...other } = props;
    return (
        <PatternFormat
            {...other}    
            getInputRef={ref}
            onValueChange={values => onChange({ target: { name, value: values.value }})}
            format="###.###.###-##"
        />
    );
});

const CNPJInput = React.forwardRef((props, ref) => {
    const { onChange, name, ...other } = props;
    return (
        <PatternFormat
            {...other}    
            getInputRef={ref}
            onValueChange={values => onChange({ target: { name, value: values.value }})}
            format="##.###.###/####-##"
        />
    );
});

export const LoanRequestForm = ({ handleSubmit }) => {
    const [values, setValues] = useState({});
    const [selectedDoc, setSelectedDoc] = useState();
    const handleDocTypeChange = e => {
        setSelectedDoc(e.target.value);
    }

    const labels = useMemo(() => ({
        name: {
            cpf: 'Seu nome',
            cnpj: 'Nome da sua empresa'
        },
        doc: {
            cpf: 'Seu CPF',
            cnpj: 'CNPJ da sua empresa'
        },
        docInput: {
            cpf: CPFInput,
            cnpj: CNPJInput,
        }
    }), []);

    const handleValueChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = useCallback(e => {
        e.preventDefault();
        handleSubmit(values)
    }, [values]);

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <MonetizationOnIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Solicitar emprestimo
            </Typography>

            <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                <FormControl>
                    <FormLabel id="doc-type">Você é?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="doc-type"
                        name="docType"
                        onChange={handleDocTypeChange}
                    >
                        <FormControlLabel value="cpf" control={<Radio />} label="Pessoa Fisica" />
                        <FormControlLabel value="cnpj" control={<Radio />} label="Pessoa Juridica/Empresa" />
                    </RadioGroup>
                </FormControl>

                {selectedDoc && (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={labels.name[selectedDoc]}
                            name="name"
                            value={values?.name}
                            onChange={handleValueChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name={selectedDoc}
                            value={values?.[selectedDoc]}
                            label={labels.doc[selectedDoc]}
                            onChange={handleValueChange}
                            InputProps={{ inputComponent: labels.docInput[selectedDoc] }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="currentDebt"
                            label="Divida Ativa"
                            value={values?.currentDebt}
                            onChange={handleValueChange}
                            InputProps={{ inputComponent: CurrencyInput }}
                        />

                        <TextField
                            name="requestedLoan"
                            margin="normal"
                            required
                            fullWidth
                            label="Valor Solicitado"
                            value={values?.requestedLoan}
                            onChange={handleValueChange}
                            InputProps={{ inputComponent: CurrencyInput }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Solicitar
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
}
