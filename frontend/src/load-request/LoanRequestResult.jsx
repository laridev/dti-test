import {
    Modal,
    Box,
    Typography,
    Button
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const LoanRequestResult = ({ 
    title, 
    description, 
    buttonText,
    open,
    onClose
}) => (
    <Modal open={open} onclose={onClose}>
        <Box sx={style}>
            <h2>{title}</h2>
            <Typography>
                {description }
            </Typography>
            <Button onClick={onClose}>{buttonText}</Button>
        </Box>
    </Modal>
);
