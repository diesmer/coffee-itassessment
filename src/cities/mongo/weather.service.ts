import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { CreateCityDto } from '../dto/create-city.dto';
import { OpenweatherResponse } from '../response/openweather.service';
import Axios, { AxiosResponse } from 'axios';
import {
  CityWeather,
  CityWeatherDocument,
} from './schemas/city-weather.schema';

@Injectable()
export class WeatherService {
  readonly api_url = 'https://api.openweathermap.org/data/2.5/weather';
  readonly UNIT_METRICS = 'metric';
  readonly APPID = 'f6989e9b3e6cc2ba423ca9cc3b548fb6';

  constructor(
    @InjectModel(CityWeather.name)
    private readonly weatherModel: Model<CityWeather>,
  ) {}

  async createWeather(createCityDto: CreateCityDto): Promise<CityWeather> {
    const data = await this.fetchWeather(createCityDto.cityName);
    console.log(data.data.main);
    const expirationDate = new Date();
    const city = new this.weatherModel({
      cityName: createCityDto.cityName,
      weather: data.data.weather[0].main ?? 'Geen informatie beschikbaar!',
      temperature: data.data.main.temp,
      windSpeed: data.data.wind.speed,
      visibility: data.data.visibility,
      expirationDate: expirationDate.setHours(expirationDate.getHours() + 1),
    })
    const itExists = await this.weatherModel.findOne(createCityDto);
    if(itExists) {
      return itExists;
    } else {
      console.log(city);
      return city.save();
    }   
  }

  async findAllWeather(): Promise<CityWeather[]> {
    return await this.weatherModel.find().exec();
  }

  async findOneWeather(name: string): Promise<CityWeather> {
    return this.weatherModel.findOne({ cityName: name }).exec();
  }

  async fineOneWeatherCity(name: string) {
    const itExists = await this.weatherModel.findOne({ cityName: name });
    if(itExists) {
      return itExists;
    } else {
      const data = await this.fetchWeather(name);
      return {      
      weather: data.data.weather[0].main ?? 'Geen informatie beschikbaar!',
      temperature: data.data.main.temp,
      windSpeed: data.data.wind.speed,
      visibility: data.data.visibility,}
    }   

  }

  async deleteWeather(id: string){
    return await this.weatherModel.findByIdAndDelete(id);
  }

  async fetchWeather(
    city: string,
  ): Promise<AxiosResponse<OpenweatherResponse>> {
    return Axios.get(this.api_url, {
      params: {
        q: city,
        appid: this.APPID,
        units: this.UNIT_METRICS,
      },
    });
  }
}
