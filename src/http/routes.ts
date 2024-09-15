import { FastifyInstance, preHandlerHookHandler } from "fastify";
import multer from "fastify-multer";

import { upload } from "src/core/storage/upload";
import { uploadCSVController } from "./controllers/items/uploadCSV";

async function appRoutes(app: FastifyInstance) {
  app.register(multer.contentParser);

  app.post('/items/upload-csv', { preHandler: upload.single('file') as unknown as preHandlerHookHandler }, async (request, reply) => {
    const { file } = request as any
    await uploadCSVController(request, reply, file);
  })
}

export { appRoutes };
