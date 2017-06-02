import createFetcher from '../middleware/fetcher';

export default createFetcher(type => /_REQUEST$/.test(type), {
  uri: process.env.ADDR,
  port: process.env.PORT,
  route: 'api',
});
