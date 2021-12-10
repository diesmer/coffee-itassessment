import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitiesController } from './cities.controller';
import { CityWeather, CityWeatherSchema } from './mongo/schemas/city-weather.schema';
import { WeatherService } from './mongo/weather.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: CityWeather.name , schema: CityWeatherSchema }])],
  controllers: [CitiesController],
  providers: [WeatherService],
})
export class CitiesModule {}