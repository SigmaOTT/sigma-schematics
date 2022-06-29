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
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotFoundInterceptor } from '@sigmaott/common';
import { AppId, AuditLogInterceptor } from '@sigmaott/core';
import { CollectionDto, CollectionValidationPipe } from '@sigmaott/paginate';
import { <%= singular(classify(name)) %>Service } from './<%= lowercased(name) %>.service';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= lowercased(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= lowercased(name) %>.dto';
import { <%= singular(classify(name)) %>, <%= singular(classify(name)) %>Collection } from './entities/<%= lowercased(name) %>.entity';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';


@Controller('<%= singular(classify(name)) %>')
@ApiTags('<%= singular(classify(name)) %>')
@UseInterceptors(new SanitizeMongooseModelInterceptor({ excludeMongooseId: true, excludeMongooseV: true }))
export class <%= singular(classify(name)) %>Controller {
  constructor(private readonly <%= lowercased(name) %>Service: <%= singular(classify(name)) %>Service) {}

  @Post()
  @ApiOperation({
    description: `Create <%= singular(classify(name)) %>`,
    summary: `Create <%= singular(classify(name)) %>`,
  })
  @UseInterceptors(new AuditLogInterceptor('Create <%= singular(classify(name)) %>'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@AppId() appId: string, @Body() create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    return this.<%= lowercased(name) %>Service.create(appId, create<%= singular(classify(name)) %>Dto);
  }

  @Get()
  @ApiOperation({
    description: `Get list <%= singular(classify(name)) %>`,
    summary: `Get list <%= singular(classify(name)) %>`,
  })
  findAll(
    @AppId() appId: string,
    @Query(new CollectionValidationPipe(<%= singular(classify(name)) %>)) collectionDto: CollectionDto,
  ): Promise<<%= singular(classify(name)) %>Collection> {
    return this.<%= lowercased(name) %>Service.findAll(appId, collectionDto);
  }

  @Get(':id')
  @ApiOperation({
    description: `Get <%= singular(classify(name)) %> by Id`,
    summary: `Get <%= singular(classify(name)) %> by Id`,
  })
  @UseInterceptors(new NotFoundInterceptor('[LRM] Không tìm thấy <%= lowercased(name) %>'))
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description: `Update <%= singular(classify(name)) %> by Id`,
    summary: `Update <%= singular(classify(name)) %> by Id`,
  })
  @UseInterceptors(
    new NotFoundInterceptor('[LRM] Không tìm thấy <%= lowercased(name) %>'),
    new AuditLogInterceptor('Update <%= singular(classify(name)) %>'),
  )
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  update(
    @AppId() appId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
  ) {
    return this.<%= lowercased(name) %>Service.update(appId, id, update<%= singular(classify(name)) %>Dto);
  }

  @Delete(':id')
  @ApiOperation({
    description: `Delete <%= singular(classify(name)) %> by Id`,
    summary: `Delete <%= singular(classify(name)) %> by Id`,
  })
  @UseInterceptors(
    new NotFoundInterceptor('Không tìm thấy <%= lowercased(name) %>'),
    new AuditLogInterceptor('Delete <%= singular(classify(name)) %>'),
  )
  remove(@AppId() appId: string, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.<%= lowercased(name) %>Service.remove(appId, id);
  }

  @ApiOperation({
    summary: 'Get list Tags using in  <%= singular(classify(name)) %>',
    description: 'Get list Tags using in  <%= singular(classify(name)) %>',
  })
  @Get('actions/get-tags')
  async getTags(@AppId() appId: string, @Query('search') searchStr: string): Promise<TagsDto> {
    return { tags: await this.<%= lowercased(name) %>Service.getListTags(appId, searchStr) };
  }
}
