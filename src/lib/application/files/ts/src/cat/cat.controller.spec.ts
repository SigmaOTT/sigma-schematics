import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

class CatServiceMock {
  onModuleInit = jest.fn();
  create = jest.fn();
  findAll = jest.fn();
  findOne = jest.fn();
  update = jest.fn();
  remove = jest.fn();
}

describe('CatController', () => {
  let service: CatController;
  let catService: CatServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useClass: CatServiceMock,
        },
      ],
    }).compile();

    service = module.get(CatController);
    catService = module.get(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
