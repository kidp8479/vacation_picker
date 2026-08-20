import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDbTime(): Promise<{ now: Date }> {
    const result = await this.databaseService.query<{ now: Date }>(
      'SELECT NOW() as now',
    );
    return result.rows[0];
  }
}
