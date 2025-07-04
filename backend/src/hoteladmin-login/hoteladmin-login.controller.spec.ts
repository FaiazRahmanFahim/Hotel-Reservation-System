import { Test, TestingModule } from '@nestjs/testing';
import { HotelAdminLoginController } from './hoteladmin-login.controller';

describe('HoteladminLoginController', () => {
  let controller: HotelAdminLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelAdminLoginController],
    }).compile();

    controller = module.get<HotelAdminLoginController>(HotelAdminLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
