import { Module } from '@nestjs/common';
import { LangsResolver } from './langs.resolver';
import { LangsService } from './langs.service';

@Module({
  providers: [LangsResolver, LangsService],
})
export class LangsModule {}
