import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionDto, DocumentCollector } from '@sigmaott/paginate';
import { Model } from 'mongoose';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';
import {
  <%= singular(classify(name)) %>,
  <%= singular(classify(name)) %>Collection,
  <%= singular(classify(name)) %>Document,
} from './entities/<%= lowercased(name) %>.entity';

@Injectable()
export class <%= singular(classify(name)) %>Service implements OnModuleInit {
  private readonly logger = new Logger('<%= singular(classify(name)) %>Service');
  private Collection<%= singular(classify(name)) %>

  constructor(
    @InjectModel(<%= singular(classify(name)) %>.name) private readonly <%= lowercased(name) %>Model: Model<<%= singular(classify(name)) %>>,
  ) {}

  onModuleInit() {
    this.Collection<%= singular(classify(name)) %>= new DocumentCollector<<%= singular(classify(name)) %>Document>(
      this.<%= lowercased(name) %>Model,
    );
  }

  async create(appId: string, create<%= singular(classify(name)) %>Dto: Create<%= singular(classify(name)) %>Dto) {
    create<%= singular(classify(name)) %>Dto.appId = appId;
    return this.<%= lowercased(name) %>Model.create(create<%= singular(classify(name)) %>Dto);
  }

  async findAll(
    appId: string,
    collectionDto: CollectionDto,
  ): Promise<<%= singular(classify(name)) %>Collection> {
    collectionDto.filter.appId = appId;
    return this.Collection<%= singular(classify(name)) %>.find(collectionDto);
  }

  async findOne(id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Model.findOne({ id });
  }

  async update(
    appId: string,
    id: string,
    update<%= singular(classify(name)) %>Dto: Update<%= singular(classify(name)) %>Dto,
  ): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Model.findOneAndUpdate({ id, appId }, update<%= singular(classify(name)) %>Dto, {
      new: true,
    });
  }

  async remove(appId: string, id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Model.findOneAndRemove({ id, appId });
  }

  async getListTags(appId: string, searchStr: string): Promise<string[]> {
    const filter: { appId?: string; tags?: any } = { appId };

    if (searchStr) {
      filter.tags = { $in: [new RegExp(searchStr)] };
    }

    return this.<%= lowercased(name) %>Model.distinct('tags', filter);
  }
}
