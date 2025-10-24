// backend-nestjs/src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('Molina')
  getNombreCompleto(): object {
    return { nombre_completo: 'Miguel Ángel Molina Gómez' };
  }
}
