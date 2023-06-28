import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { ProductEntity } from '../entities';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateProductDto, FilterProductDto, ReadProductDto, UpdateProductDto } from '../dtos';
import { PaginationDto } from '../dtos/pagination.dto';
import { ServiceResponseHttpModel } from 'src/shared/models';

@Injectable()
export class ProductsService {
constructor(@Inject(RepositoryEnum.PRODUCT_REPOSITORY)
            private repository:Repository<ProductEntity>,)
    { }

async create(payload: CreateProductDto):Promise<ServiceResponseHttpModel>{
    const newProduct = this.repository.create(payload);
    const productCreated = await this.repository.save(newProduct);

    return {data: productCreated};
}

async catalogue():Promise<ServiceResponseHttpModel>{
    const response = this.repository.findAndCount({take: 1000});
    return {data: response[0],
            pagination: {totalItems: response[1], limit: 10}
        };
}

async findAll(params?:FilterProductDto):Promise<ServiceResponseHttpModel>{
if(params?.limit > 0 && params?.page >= 0){
    return await this.paginateAndFilter(params);
}
const response = await this.repository.findAndCount({
    order: {updateAt: 'DESC'},
});
return {
    data: plainToInstance(ReadProductDto, response[0]),
    pagination: {totalItems: response[1], limit: 10},
  }
}

async findOne(id:string):Promise<ServiceResponseHttpModel>{
    const data = await this.repository.findOne({
        where: { id },
    });

    if(!data){
       throw new NotFoundException('El producto no ha sido encontrado');
    }
    return { data: ReadProductDto };
    
}
async update(id: string, payload:UpdateProductDto):Promise<ServiceResponseHttpModel>
{
    const response = await this.repository.findOneBy({id});
    if(!response){
       throw new NotFoundException('El producto no ha sido encontrado');
    }
    this.repository.merge(response, payload);
    this.repository.save(response);
    return { data: plainToInstance(ReadProductDto, response) };
}
async remove(id: string):Promise<ServiceResponseHttpModel>{
    const response = await this.repository.findOneBy({id});
    if (!response){
       throw new NotFoundException('El producto no ha sido encontrado');
    }
    this.repository.softRemove(response);
    return { data: plainToInstance(ReadProductDto, response) };
}
async removeAll(payload:ProductEntity[]):Promise<ServiceResponseHttpModel>{
const response = await this.repository.softRemove(payload);
return { data: response };
}

private async paginateAndFilter(params: FilterProductDto ){
let where:
| FindOptionsWhere<ProductEntity>
| FindOptionsWhere<ProductEntity>[];
    where = {};
    let {page, search} = params;
    const { limit } = params;
    if(search){
        search = search.trim(),
        page = 0;
        where = [];
        where.push({titleAt: ILike (`%${search}`) })
    }
    const data = this.repository.findAndCount({
    relations: ['bloodType', 'gender'],
    where,
    take: limit,
    skip: PaginationDto.getOffset(limit, page),
  });
  return { pagination: { limit, totalItems: data[1] }, data: data[0] };
    }
}
