export class CreateCityDto {
    readonly cityName: string;
    readonly weather: string;
    readonly temperature: number;
    readonly wind: number;
    readonly visibility: number;
    readonly expirationDate: Date;
}