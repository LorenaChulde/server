import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
//import { DatabaseSeeder } from './seeds/database-seeder';
//import { CatagoriesSeeder } from './seeds/category-seeder';
//import { ProductsSeeder } from './seeds/products-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    //DatabaseSeeder,
    //CategoriesSeeder,

  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
