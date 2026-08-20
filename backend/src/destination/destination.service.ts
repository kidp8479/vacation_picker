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

  async findOne(id: number) {
    const result = await this.databaseService.query<Destination>(
      `SELECT *
      FROM destination
      WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async update(id: number, updateDestinationDto: UpdateDestinationDto) {
    const allowedFields: (keyof UpdateDestinationDto)[] = [
      'title',
      'subtitle',
      'photo_url',
      'transport',
      'body_description',
    ];
    const fieldsToUpdate = allowedFields.filter(
      (field) => updateDestinationDto[field] !== undefined,
    );
    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    const values = fieldsToUpdate.map((field) => updateDestinationDto[field]);

    const result = await this.databaseService.query<Destination>(
      `UPDATE destination
      SET ${setClause}
      WHERE id = $${fieldsToUpdate.length + 1}
      RETURNING *`,
      [...values, id],
    );
    return result.rows[0];
  }

  remove(id: number) {
    return `This action removes a #${id} destination`;
  }
}
