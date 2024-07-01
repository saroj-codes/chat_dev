import express from 'express';
import dotenv from 'dotenv';
import { createExpressEndpoints } from '@ts-rest/express';
import { Contract } from '@./contract';
import * as swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './libs/swagger';
import { Controller } from './controllers';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;

const server = express();
server.use(express.json());
server.use(morgan('common'));
server.use(express.json());
const whitelistedOrigins = process.env.WHITELISTED_ORIGINS
  ? process.env.WHITELISTED_ORIGINS.split(',')
  : [];
server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelistedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

server.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
server.use('/docs.json', (req, res) => res.send(openApiDocument));
createExpressEndpoints(Contract, Controller, server);

server.listen(PORT, () => {
  console.log(`Server is listening at PORT:${PORT}`);
});
