import { generateOpenApi } from '@ts-rest/open-api';
import { Contract } from '@./contract';

export const openApiDocument = generateOpenApi(Contract, {
  info: {
    title: 'Chat API',
    version: '1.0.0',
  },
});
