import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacultyModule } from './faculty/faculty.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { SemesterModule } from './semester/semester.module';
import { ClassModule } from './class/class.module';
import { ProgramModule } from './program/program.module';
import { SubjectModule } from './subject/subject.module';
import { CriteriaModule } from './criteria/criteria.module';
import { CommentModule } from './comment/comment.module';
import { PointModule } from './point/point.module';
import { CrapModule } from './crap/crap.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jnhbgvfc',
      database: 'aqa',
      synchronize: false,
      autoLoadEntities: true,
    }),
    FacultyModule,
    LecturerModule,
    SemesterModule,
    ClassModule,
    ProgramModule,
    SubjectModule,
    CriteriaModule,
    CommentModule,
    PointModule,
    CrapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private datasource: DataSource) {}
}
