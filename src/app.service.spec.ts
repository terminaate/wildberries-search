import { AppService } from './app.service';
import { Test } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    service = moduleRef.get<AppService>(AppService);
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });

  describe('AppService.search', () => {
    it('should throw new bad request error', async () => {
      await expect(service.search('')).rejects.toThrow(
        new BadRequestException({
          error: 'Query is required',
        }),
      );
    });

    it('should return an array of searched elements ', async () => {
      const res = await service.search('косметичка женская');
      res.forEach((r) => {
        expect(Object.keys(r)).toEqual(['brand', 'place']);
        expect(typeof r.brand).toBe('string');
        expect(typeof r.place).toBe('number');
      });
    });
  });
});
