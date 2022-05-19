import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import { CollectionDto } from '@sigmaott/paginate';
import { Create<%= singular(classify(name)) %>Dto } from './dto/create-<%= singular(name) %>.dto';
import { Update<%= singular(classify(name)) %>Dto } from './dto/update-<%= singular(name) %>.dto';
import {
  <%= singular(classify(name)) %>,
  <%= singular(classify(name)) %>Collection,
} from './entities/<%= lowercased(name) %>.entity';
import * as _ from 'lodash';

@Injectable()
export class <%= singular(classify(name)) %>Service {
  private readonly logger = new Logger('<%= singular(classify(name)) %>Service');

  constructor(@InjectRepository(<%= singular(classify(name)) %>) private readonly <%= singular(classify(name)) %>Repo: EntityRepository<<%= singular(classify(name)) %>>) {}

  async create(appId: string, body: Create<%= singular(classify(name)) %>Dto) {
    body.appId = appId;
    const result = this.<%= singular(classify(name)) %>Repo.create(body as Create<%= singular(classify(name)) %>Dto & { appId: string });
    await this.<%= singular(classify(name)) %>Repo.persist(result).flush();
    return result;
  }

  async findAll(appId: string, collectionDto: CollectionDto): Promise<<%= singular(classify(name)) %>Collection> {
    collectionDto.filter.appId = appId;

    const skip =
      _.isNumber(collectionDto.offset) && _.isNumber(collectionDto.limit)
        ? collectionDto.offset
        : ((collectionDto.page as number) - 1) * (collectionDto.perPage || 0);

    const limit =
      _.isNumber(collectionDto.offset) && _.isNumber(collectionDto.limit) ? collectionDto.limit : collectionDto.perPage;

    if (Object.keys(collectionDto.fields).length) {
      Object.keys(collectionDto.fields).forEach(f => {
        if (collectionDto.populates.includes(f.split('.')[0])) {
          delete collectionDto.fields[f];
        }
      });
    }

    const [data, count] = await this.<%= singular(classify(name)) %>Repo.findAndCount(collectionDto.filter, {
      limit: limit as number,
      offset: skip as number,
      populate: true,
      orderBy: collectionDto.sort,
    });

    return {
      data: data,
      total: count,
      count: data.length,
      page: collectionDto.page,
      perPage: collectionDto.perPage,
    };
  }

  async findOneById(id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= singular(classify(name)) %>Repo.findOneOrFail({ id });
  }

  async updateById(appId: string, id: string, body: Update<%= singular(classify(name)) %>Dto): Promise<<%= singular(classify(name)) %> | undefined> {
    const result = await this.<%= singular(classify(name)) %>Repo.findOneOrFail({ id, appId });
    if (!result) {
      return result;
    }
    wrap(result).assign(body);
    await this.<%= singular(classify(name)) %>Repo.persist(result);

    return result;
  }

  async remove(appId: string, id: string): Promise<<%= singular(classify(name)) %> | undefined> {
    const result = await this.<%= singular(classify(name)) %>Repo.findOneOrFail({ id, appId });
    if (!result) {
      return result;
    }
    await this.<%= singular(classify(name)) %>Repo.removeAndFlush(result);
    return result;
  }
}
