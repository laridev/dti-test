import {
    Box,
    Container,
    CssBaseline,
} from '@mui/material';

import { LoanRequestContainer } from './load-request';

export default () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <LoanRequestContainer />
            </Box>
        </Container>
    )
}