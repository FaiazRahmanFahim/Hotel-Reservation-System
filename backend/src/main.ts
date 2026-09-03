import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
  
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl) or matching allowed origins
      if (!origin || origin === frontendUrl || origin.endsWith('.vercel.app') || origin === 'http://localhost:3000' || origin === 'http://localhost:3001') {
        callback(null, true);
      } else {
        callback(null, true); // Permissive CORS for deployed clients
      }
    },
    credentials: true,
  });

  app.use(cookieParser());
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();