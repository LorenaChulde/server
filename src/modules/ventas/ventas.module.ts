import { Global, Module } from '@nestjs/common';
import { ventasProviders } from './providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsController } from './controllers';
import { ProductsService } from './services';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    ProductsController
  ],
  providers: [
    ...ventasProviders,
    ProductsService
  ],
  exports: [
    ...ventasProviders,
    ProductsService
  ],
})
export class VentasModule { }
