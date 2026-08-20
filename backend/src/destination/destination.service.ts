import { Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { DatabaseService } from '../database/database.service';
import { Destination } from './interfaces/destination.interfaces';

@Injectable()
export class DestinationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDestinationDto: CreateDestinationDto) {
    const result = await this.databaseService.query<Destination>(
      `INSERT INTO destination (title, subtitle, photo_url, transport, body_description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING * `,
      [
        createDestinationDto.title,
        createDestinationDto.subtitle,
        createDestinationDto.photo_url,
        createDestinationDto.transport,
        createDestinationDto.body_description,
      ],
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await this.databaseService.query<Destination>(
      `SELECT *
      FROM destination`,
    );
    return result.rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} destination`;
  }

  update(id: number, _updateDestinationDto: UpdateDestinationDto) {
    return `This action updates a #${id} destination`;
  }

  remove(id: number) {
    return `This action removes a #${id} destination`;
  }
}
