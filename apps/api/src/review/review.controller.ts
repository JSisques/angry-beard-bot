import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { UserService } from 'src/user/user.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  private readonly logger;

  constructor(
    private readonly reviewService: ReviewService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(ReviewController.name);
  }

  @Get('/user/:supabaseId')
  async getReviewsByUserSupabaseId(@Param('supabaseId') supabaseId: string, @Query('page') page: number) {
    this.logger.debug(`Getting reviews by user supabase id: ${supabaseId}`);
    const user = await this.userService.getUserBySupabaseId(supabaseId);
    return this.reviewService.getReviewsByUserId(user.id, page);
  }

  @Get('/pull-request/:pullRequestId')
  async getReviewsByPullRequestId(@Param('pullRequestId') pullRequestId: string) {
    this.logger.debug(`Getting reviews by pull request id: ${pullRequestId}`);
    return this.reviewService.getReviewsByPullRequestId(pullRequestId);
  }

  @Post()
  async createReview(@Body() review: CreateReviewDto) {
    this.logger.debug(`Creating review: ${review}`);
    return this.reviewService.createReview(review);
  }

  //   @Put(':id')
  //   async updateReview(@Param('id') id: string, @Body() review: UpdateReviewDto) {
  //     this.logger.debug(`Updating review: ${review}`);
  //     return this.reviewService.updateReview(id, review);
  //   }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    this.logger.debug(`Deleting review: ${id}`);
    return this.reviewService.deleteReview(id);
  }
}
