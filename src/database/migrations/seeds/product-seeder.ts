/*import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { RolesService, UsersService } from '@auth/services';
import { CreateProductDto } from 'src/modules/ventas/dtos';

@Injectable()
export class ProductsSeeder {
    constructor(
        private productService: ProductsService,
    ) { }

    async run() {
        await this.createProducts();
    }

    async createProducts() {
        const products: CreateProductDto[] = [];
        const CategoriesSeederes = (await this.Service.findAll()).data as RoleEntity[];
        const adminRole = roles.find((role) => role.code === RoleEnum.ADMIN);
        const teacherRole = roles.find((role) => role.code === RoleEnum.TEACHER);
        const coordinatorAdministrativeRole = roles.find(
            (role) => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE,
        );
        const coordinatorCareerRole = roles.find(
            (role) => role.code === RoleEnum.COORDINATOR_CAREER,
        );
        const rectorRole = roles.find((role) => role.code === RoleEnum.RECTOR);

        users.push(
            {
                titleAt: 'guitarra',
                priceAt: 45,
                descriptionAt: 'instrumento musical',
                imageAt: 'https://assets2.razerzone.com/images/pnx.assets/1c9294a10ead0ef075575ecddb8318af/razer-tomahawk-cases-category-500x500.jpg'
            },
        );

        for (const user of users) {
            await this.usersService.create(user);
        }
    }
}*/
