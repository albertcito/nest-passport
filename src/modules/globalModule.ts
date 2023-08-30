import SaveDBService from '@/services/db/save.db.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  exports: [SaveDBService],
  providers: [SaveDBService],
  controllers: [],
})
export class GlobalModule {}
