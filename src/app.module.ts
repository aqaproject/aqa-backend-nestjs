import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectController } from './components/subject/subject.controller';
import { LecturerController } from './components/lecturer/lecturer.controller';

@Module({
  imports: [],
  controllers: [AppController, SubjectController, LecturerController],
  providers: [AppService],
})
export class AppModule {}
