import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';

@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('my')
  async getMyReports(@Req() req: any) {
    return this.reportsService.getMyReports(req.user.id);
  }

  @Get(':id')
  async getReportById(@Param('id') id: string, @Req() req: any) {
    return this.reportsService.getReportById(id, req.user.id);
  }
}
