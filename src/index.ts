import { Asset } from '#app/entities/asset';
import express from 'express';
import got from 'got';
import axios from 'axios';
import path from 'node:path';
import { createConnection } from 'typeorm';

const database = path.resolve(__dirname, '../db.db');

async function run() {
  const connection = await createConnection({
    type: 'sqlite',
    database,
    entities: [Asset],
    logging: true,
    synchronize: true,
  });

  const app = express();

  app.get('/assets/:id', async (req, res) => {
    const assetRepo = connection.getRepository(Asset);

    const asset = await assetRepo.findOne(req.params.id);

    if (asset == null) {
      res.status(404).send('Not found');
      return;
    }

    res.header('Content-Type', 'image/png').send(asset.blob);
  });

  app.get('/create', async (req, res) => {
    const assetRepo = connection.getRepository(Asset);

    // Just another example using got
    // const data = await got('https://i.pravatar.cc/300', {
    //   responseType: 'buffer',
    // });

    const data = await axios('https://i.pravatar.cc/300', {
      responseType: 'arraybuffer',
    });

    const asset = await assetRepo.save({
      blob: data.data,
    });

    res.header('Content-Type', 'image/png').send(asset.blob);
  });

  app.listen(3000);
}

run().catch(console.error);
