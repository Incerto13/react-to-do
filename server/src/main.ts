import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dataSource from '../ormconfig';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  // Initialize the data source
  await dataSource.initialize();

  const port = 3001;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  var whitelist = [
    'http://localhost:3000', // local dev
    'http://localhost:8010', // docker dev => REACT_TO_DO_URL
    'https://react-to-do.incertotech.com', 
    'https://react-to-do.staging.incertotech.com'
  ];
  app.enableCors({
    origin: function (origin, callback) {
      // if origin is undefined, then the call is coming from same origin and wasn't 
      // picked up by cors at all (i.e. under same dns name as api thus must be in prod)
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("allowed cors for:", origin)
        callback(null, true)
      } else {
        console.log("blocked cors for:", origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });

  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap().catch((error) => {
  console.error('Error during initialization:', error);
});
