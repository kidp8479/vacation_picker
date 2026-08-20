import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { DatabaseService } from '../database/database.service';
import { Destination } from './interfaces/destination.interfaces';

const UPDATABLE_FIELDS: (keyof UpdateDestinationDto)[] = [
  'title',
  'subtitle',
  'photo_url',
  'transport',
  'body_description',
];

const NON_NULLABLE_FIELDS: (keyof UpdateDestinationDto)[] = [
  'title',
  'photo_url',
  'transport',
  'body_description',
];

@Injectable()
export class DestinationService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Inserts a new destination.
   * @param createDestinationDto - validated destination data (id and generated fields excluded)
   * @returns the newly created destination, including its generated id
   */
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

  /**
   * Lists every destination.
   * @returns all destinations, unfiltered
   */
  async findAll() {
    const result = await this.databaseService.query<Destination>(
      `SELECT *
      FROM destination`,
    );
    return result.rows;
  }

  /**
   * Finds a single destination by id.
   * @param id - the destination's primary key
   * @returns the matching destination
   * @throws NotFoundException if no row has this id
   */
  async findOne(id: number) {
    const result = await this.databaseService.query<Destination>(
      `SELECT *
      FROM destination
      WHERE id = $1`,
      [id],
    );
    const destination = result.rows[0];
    if (!destination) {
      throw new NotFoundException(`Destination ${id} not found`);
    }
    return destination;
  }

  /**
   * Partially updates a destination, touching only the fields present on the DTO.
   * The SET clause is built dynamically from a hardcoded field whitelist
   * (never from the client's raw keys), so an omitted field keeps its current
   * value instead of being overwritten with null.
   * @param id - the destination's primary key
   * @param updateDestinationDto - the subset of fields to change
   * @returns the updated destination
   * @throws BadRequestException if the body has no updatable fields, or sets
   *   a non-nullable column to null
   * @throws NotFoundException if no row has this id
   */
  async update(id: number, updateDestinationDto: UpdateDestinationDto) {
    for (const field of NON_NULLABLE_FIELDS) {
      if (updateDestinationDto[field] === null) {
        throw new BadRequestException(`${field} cannot be null`);
      }
    }

    const fieldsToUpdate = UPDATABLE_FIELDS.filter(
      (field) => updateDestinationDto[field] !== undefined,
    );
    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }

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
    const destination = result.rows[0];
    if (!destination) {
      throw new NotFoundException(`Destination ${id} not found`);
    }
    return destination;
  }

  /**
   * Deletes a destination by id.
   * @param id - the destination's primary key
   * @returns the deleted destination, so the caller can confirm what was removed
   * @throws NotFoundException if no row has this id
   */
  async remove(id: number) {
    const result = await this.databaseService.query<Destination>(
      `DELETE FROM destination
      WHERE id = $1
      RETURNING *`,
      [id],
    );
    const destination = result.rows[0];
    if (!destination) {
      throw new NotFoundException(`Destination ${id} not found`);
    }
    return destination;
  }
}
