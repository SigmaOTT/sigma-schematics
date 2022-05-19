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
import { <%= singular(classify(name)) %>Service } from './<%= lowercased(name) %>.service';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= lowercased(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= lowercased(name) %>.dto';
import { <%= singular(classify(name)) %>, <%= singular(classify(name)) %>Collection } from './entities/<%= lowercased(name) %>.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('<%= singular(classify(name)) %>')
@ApiTags('<%= lowercased(name) %>')
export class <%= singular(classify(name)) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= singular(classify(name)) %>Service) {}

  @Post()
  @UseInterceptors(new AuditLogInterceptor('Create <%= singular(classify(name)) %>'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@AppId() appId: string, @Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.create(appId, create<%= singular(classify(name)) %>Dto);
  }

  @Get()
  findAll(
    @AppId() appId: string,
    @Query(new CollectionValidationPipe(<%= singular(classify(name)) %>)) collectionDto: CollectionDto,
  ): Promise<<%= singular(classify(name)) %>Collection> {
    return this.<%= lowercased(name) %>Service.findAll(appId, collectionDto);
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('[LRM] Không tìm thấy <%= lowercased(name) %>'))
  findOne(@Param('id') id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(
    new NotFoundInterceptor('[LRM] Không tìm thấy <%= lowercased(name) %>'),
    new AuditLogInterceptor('Update <%= singular(classify(name)) %>'),
  )
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @AppId() appId: string,
    @Param('id') id: string,
    @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
  ) {
    return this.<%= lowercased(name) %>Service.updateById(appId, id, update<%= singular(classify(name)) %>Dto);
  }

  @Delete(':id')
  @UseInterceptors(
    new NotFoundInterceptor('Không tìm thấy <%= lowercased(name) %>'),
    new AuditLogInterceptor('Delete <%= singular(classify(name)) %>'),
  )
  remove(@AppId() appId: string, @Param('id') id: string) {
    return this.<%= lowercased(name) %>Service.remove(appId, id);
  }
}
