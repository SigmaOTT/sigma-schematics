import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CatService } from './cat.service';
import { Cat } from './entities/cat.entity';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        CatService,
        {
          provide: getModelToken(Cat.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should', () => {
      return;
    });
  });

  describe('create', () => {
    it('should', () => {
      return;
    });
  });

  describe('findAll', () => {
    it('should', () => {
      return;
    });
  });

  describe('findOne', () => {
    it('should', () => {
      return;
    });
  });

  describe('update', () => {
    it('should', () => {
      return;
    });
  });

  describe('remove', () => {
    it('should', () => {
      return;
    });
  });
});
