import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Mutation } from '@nestjs/graphql';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
