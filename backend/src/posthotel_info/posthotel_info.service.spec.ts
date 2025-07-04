import { Test, TestingModule } from '@nestjs/testing';
import { PosthotelInfoService } from './posthotel_info.service';

describe('PosthotelInfoService', () => {
  let service: PosthotelInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PosthotelInfoService],
    }).compile();

    service = module.get<PosthotelInfoService>(PosthotelInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
