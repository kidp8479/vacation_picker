import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
