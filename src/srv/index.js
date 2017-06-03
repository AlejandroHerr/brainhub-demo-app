import { MongoClient } from 'mongodb';
import server from './server';

MongoClient.connect(`mongodb://${process.env.MONGO_ADDR}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, (err, database) => {
  if (err) throw err;

  const db = database;

  server.listen(process.env.PORT, process.env.ADDR, () => {
    server.db = db;
    console.log(`Brainhub demo app listening on port ${process.env.ADDR}:${process.env.PORT}!`);
  });
});
