import { useState, useEffect } from "react";
import axios from "axios";
import { LoanRequestForm } from "./LoadRequestForm"
import { LoanRequestResult } from './LoanRequestResult';
import { NEW_LOAN_ENDPOINT } from "../endpoints.const";

export const LoanRequestContainer = () => {
    const [reqRes, setReqRes] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    const onCloseModal = () => {
        setModalOpen(false);
        setReqRes();
    }; 

    const handleSubmit = values => {
        const {cpf, cnpj, ...fields} = values;
        const data = {
            ...fields,
            doc: {
                cpf, 
                cnpj,
            }
        }

        axios.post(NEW_LOAN_ENDPOINT, data)
            .then(res => (
                setReqRes(res.data)
            ))
            
    }

    useEffect(() => {
        if (reqRes && !modalOpen) {
            setModalOpen(true);
        }
    }, [reqRes, modalOpen]);

    const resultMessage = {
        declined: {
            title: 'Emprestimo não aprovado',
            message: `No momento, não podemos aprovar seu emprestimo. ${reqRes?.message}`,
            buttonText: 'Tentar novamente',
        },
        approved: {
            title: 'Emprestimo aprovado',
            message: reqRes?.message,
            buttonText: 'Fechar',
        },
    }

    return (
        <>
            <LoanRequestForm
                key={modalOpen}
                handleSubmit={handleSubmit}
            />
            <LoanRequestResult 
                title={resultMessage?.[reqRes?.status]?.title} 
                description={resultMessage?.[reqRes?.status]?.message} 
                buttonText={resultMessage?.[reqRes?.status]?.buttonText} 
                buttonCallback={resultMessage?.[reqRes?.status]?.buttonCallback} 
                open={modalOpen}
                onClose={onCloseModal}
            />
        </>
     )
}