import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildsModule } from './builds/builds.module';

@Module({
  imports: [BuildsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
