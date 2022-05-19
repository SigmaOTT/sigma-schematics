import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CollectionDto, DocumentCollector } from '@sigmaott/paginate';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat, CatCollection, CatDocument } from './entities/cat.entity';

@Injectable()
export class CatService implements OnModuleInit {
  private readonly logger = new Logger('CatService');
  private CollectionCat;

  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  onModuleInit() {
    this.CollectionCat = new DocumentCollector<CatDocument>(this.catModel);
  }

  async create(appId: string, createCatDto: CreateCatDto) {
    createCatDto.appId = appId;
    return this.catModel.create(createCatDto);
  }

  async findAll(appId: string, collectionDto: CollectionDto): Promise<CatCollection> {
    collectionDto.filter.appId = appId;
    return this.CollectionCat.find(collectionDto);
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ id });
  }

  async update(appId: string, id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catModel.findOneAndUpdate({ id, appId }, updateCatDto, {
      new: true,
    });
  }

  async remove(appId: string, id: string): Promise<Cat> {
    return this.catModel.findOneAndRemove({ id, appId });
  }
}
