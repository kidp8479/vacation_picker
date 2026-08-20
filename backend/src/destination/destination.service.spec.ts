import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { DatabaseService } from '../database/database.service';

describe('DestinationService', () => {
  let service: DestinationService;
  let databaseService: { query: jest.Mock };

  const sampleDestination = {
    id: 1,
    title: 'Slovenia',
    subtitle: 'In the footsteps of Tadej Pogacar',
    photo_url: 'https://example.com/photo.jpg',
    transport: 'plane',
    body_description: 'Mountains and cycling.',
  };

  beforeEach(async () => {
    databaseService = { query: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinationService,
        { provide: DatabaseService, useValue: databaseService },
      ],
    }).compile();

    service = module.get<DestinationService>(DestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('inserts a destination and returns the created row', async () => {
      databaseService.query.mockResolvedValue({ rows: [sampleDestination] });

      const result = await service.create({
        title: 'Slovenia',
        subtitle: 'In the footsteps of Tadej Pogacar',
        photo_url: 'https://example.com/photo.jpg',
        transport: 'plane',
        body_description: 'Mountains and cycling.',
      });

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO destination'),
        [
          'Slovenia',
          'In the footsteps of Tadej Pogacar',
          'https://example.com/photo.jpg',
          'plane',
          'Mountains and cycling.',
        ],
      );
      expect(result).toEqual(sampleDestination);
    });
  });

  describe('findAll', () => {
    it('returns every row', async () => {
      databaseService.query.mockResolvedValue({
        rows: [sampleDestination],
      });

      const result = await service.findAll();

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
      );
      expect(result).toEqual([sampleDestination]);
    });
  });

  describe('findOne', () => {
    it('queries by id and returns the matching row', async () => {
      databaseService.query.mockResolvedValue({ rows: [sampleDestination] });

      const result = await service.findOne(1);

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.stringContaining('WHERE id = $1'),
        [1],
      );
      expect(result).toEqual(sampleDestination);
    });

    it('throws NotFoundException when no row matches', async () => {
      databaseService.query.mockResolvedValue({ rows: [] });

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('only sets the fields present on the dto', async () => {
      databaseService.query.mockResolvedValue({
        rows: [{ ...sampleDestination, title: 'Slovenia (updated)' }],
      });

      await service.update(1, { title: 'Slovenia (updated)' });

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.stringContaining('SET title = $1'),
        ['Slovenia (updated)', 1],
      );
    });

    it('builds a SET clause covering multiple provided fields', async () => {
      databaseService.query.mockResolvedValue({ rows: [sampleDestination] });

      await service.update(1, { title: 'New title', transport: 'train' });

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.stringContaining('SET title = $1, transport = $2'),
        ['New title', 'train', 1],
      );
    });

    it('throws BadRequestException when the body has no updatable fields', async () => {
      await expect(service.update(1, {})).rejects.toThrow(BadRequestException);
      expect(databaseService.query).not.toHaveBeenCalled();
    });

    it('throws BadRequestException when a non-nullable field is set to null', async () => {
      await expect(
        service.update(1, { title: null as unknown as string }),
      ).rejects.toThrow(BadRequestException);
      expect(databaseService.query).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when no row matches the id', async () => {
      databaseService.query.mockResolvedValue({ rows: [] });

      await expect(service.update(999, { title: 'New title' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deletes by id and returns the removed row', async () => {
      databaseService.query.mockResolvedValue({ rows: [sampleDestination] });

      const result = await service.remove(1);

      expect(databaseService.query).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM destination'),
        [1],
      );
      expect(result).toEqual(sampleDestination);
    });

    it('throws NotFoundException when no row matches', async () => {
      databaseService.query.mockResolvedValue({ rows: [] });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
