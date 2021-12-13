export class OpenweatherResponse {
    id: number;
  
    name: string;
  
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
  
    visibility: string;
  
    wind: {
      speed: number;
      deg: number;
    };
  
    clouds: {
      all: number;
    };

    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
  
    timezone: number;
  }
  