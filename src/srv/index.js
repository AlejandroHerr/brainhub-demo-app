import server from './server';

server.listen(process.env.PORT, process.env.ADDR, () => {
  console.log(`Brainhub demo app listening on port ${process.env.ADDR}:${process.env.PORT}!`);
});
