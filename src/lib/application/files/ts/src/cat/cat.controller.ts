import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotFoundInterceptor } from '@sigmaott/common';
import { AppId, AuditLogInterceptor } from '@sigmaott/core';
import { CollectionDto, CollectionValidationPipe } from '@sigmaott/paginate';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat, CatCollection } from './entities/cat.entity';

@Controller('Cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @UseInterceptors(new AuditLogInterceptor('Create Cat'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@AppId() appId: string, @Body() createCatDto: CreateCatDto) {
    return this.catService.create(appId, createCatDto);
  }

  @Get()
  findAll(
    @AppId() appId: string,
    @Query(new CollectionValidationPipe(Cat)) collectionDto: CollectionDto,
  ): Promise<CatCollection> {
    return this.catService.findAll(appId, collectionDto);
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('[LRM] Không tìm thấy cat'))
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(new NotFoundInterceptor('[LRM] Không tìm thấy cat'), new AuditLogInterceptor('Update Cat'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(@AppId() appId: string, @Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(appId, id, updateCatDto);
  }

  @Delete(':id')
  @UseInterceptors(new NotFoundInterceptor('Không tìm thấy cat'), new AuditLogInterceptor('Delete Cat'))
  remove(@AppId() appId: string, @Param('id') id: string) {
    return this.catService.remove(appId, id);
  }
}
