import { Test, TestingModule } from '@nestjs/testing';
import { PosthotelInfoController } from './posthotel_info.controller';

describe('PosthotelInfoController', () => {
  let controller: PosthotelInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PosthotelInfoController],
    }).compile();

    controller = module.get<PosthotelInfoController>(PosthotelInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
