import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { WeatherService } from './mongo/weather.service';
import { CityWeather } from './mongo/schemas/city-weather.schema';


@Controller('cities')
export class CitiesController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    await this.weatherService.createWeather(createCityDto);
  }

  @Get()
  async findAll(): Promise<CityWeather[]> {
    return this.weatherService.findAllWeather();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.weatherService.findOneWeather(name);
  }

  @Get(':name/weather')
  async findWeather(@Param('name') name:string) {
    return this.weatherService.fineOneWeatherCity(name);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    await this.weatherService.deleteWeather(id);
    return `deleted City ${id}`;
  }
}