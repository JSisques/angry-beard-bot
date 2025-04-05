import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GithubWebhookDto } from './dto/webhook.github.dto';

@Injectable()
export class GithubService {}
