import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('db-time')
  getDbTime(): Promise<{ now: Date }> {
    return this.appService.getDbTime();
  }

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
