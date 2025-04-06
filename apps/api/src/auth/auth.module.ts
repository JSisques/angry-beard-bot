import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [PrismaModule, UserModule],
  providers: [SupabaseService],
  controllers: [AuthController],
})
export class AuthModule {}
