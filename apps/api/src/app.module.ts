import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { GithubModule } from './github/github.module';
import { RepositoryModule } from './repository/repository.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, StripeModule, SupabaseModule, AuthModule, GithubModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
