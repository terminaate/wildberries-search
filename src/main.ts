import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.header('Access-Control-Allow-Credentials: true');
    res.header('Access-Control-Allow-Methods: GET, POST');
    next();
  });

  const { PORT } = process.env;

  await app.listen(PORT, () =>
    console.log('Application listened on http://127.0.0.1:' + PORT),
  );
}

void bootstrap();
