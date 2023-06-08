import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import routes from './routes';
import { swaggerSpecs } from './swagger-specs';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(8080);