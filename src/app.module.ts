import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesModule } from './cities/cities.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cities'),
    CitiesModule,
  ],
})
export class AppModule {}
