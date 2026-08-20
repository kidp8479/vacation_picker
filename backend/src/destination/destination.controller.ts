import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  /**
   * POST /destination
   * Creates a new destination.
   */
  @Post()
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(createDestinationDto);
  }

  /**
   * GET /destination
   * Lists every destination.
   */
  @Get()
  findAll() {
    return this.destinationService.findAll();
  }

  /**
   * GET /destination/:id
   * Returns a single destination by id.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinationService.findOne(+id);
  }

  /**
   * PATCH /destination/:id
   * Partially updates a destination, only the fields present in the body are changed.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationService.update(+id, updateDestinationDto);
  }

  /**
   * DELETE /destination/:id
   * Removes a destination by id.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destinationService.remove(+id);
  }
}
