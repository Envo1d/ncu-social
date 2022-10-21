import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';

@Module({
  providers: [CountryResolver, CountryService]
})
export class CountryModule {}
