import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { ProductsService } from '@ventas/services';
import {
    CreateProductDto,
    FilterProductDto,
    UpdateProductDto,
} from '@ventas/dtos';
import { ProductEntity } from '../entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateProductDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.productService.create(payload);

        return {
            data: serviceResponse,
            message: 'product created',
            title: 'Created',
        };
    }

    @ApiOperation({ summary: 'List all users' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
        const serviceResponse = await this.productService.catalogue();

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `catalogue`,
            title: `Catalogue`,
        };
    }

    @ApiOperation({ summary: 'List of products' })
    // @Roles(RoleEnum.ADMIN)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterProductDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.productService.findAll(params);
        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `index`,
            title: `index`,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.productService.findOne(id);
        return {
            data: serviceResponse,
            message: `show ${id}`,
            title: `Success`,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() payload: UpdateProductDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.productService.update(id, payload);

        return {
            data: serviceResponse,
            message: `Product updated ${id}`,
            title: `Updated`,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.productService.remove(id);

        return {
            data: serviceResponse,
            message: `Product deleted ${id}`,
            title: `Deleted`,
        };
    }

    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ProductEntity[]) {
        const serviceResponse = await this.productService.removeAll(payload);

        return {
            data: serviceResponse,
            message: `Users deleted`,
            title: `Deleted`,
        };
    }
}
