import { Injectable, Logger } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
@Injectable()
export class ReviewService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(ReviewService.name);
  }

  /**
   * Retrieves a review by its ID
   * @param id - The unique identifier of the review
   * @returns {Promise<Review | null>} The review if found, null otherwise
   */
  async getReviewById(id: string) {
    this.logger.debug(`Getting review by id: ${id}`);
    return this.prisma.review.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Gets all reviews created by a specific user
   * @param userId - The unique identifier of the user
   * @returns {Promise<Review[]>} Array of reviews by the user
   */
  async getReviewsByUserId(userId: string, page: number) {
    this.logger.debug(`Getting reviews by user id: ${userId}`);
    return this.prisma.review.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  /**
   * Gets all reviews for a specific pull request
   * @param pullRequestId - The unique identifier of the pull request
   * @returns {Promise<Review[]>} Array of reviews for the pull request
   */
  async getReviewsByPullRequestId(pullRequestId: string) {
    this.logger.debug(`Getting reviews by pull request id: ${pullRequestId}`);
    return this.prisma.review.findMany({
      where: {
        pullRequestId,
      },
    });
  }

  /**
   * Creates a new review
   * @param review - The review data to create
   * @returns {Promise<Review>} The created review
   */
  async createReview(review: CreateReviewDto) {
    this.logger.debug(`Creating review: ${JSON.stringify(review)}`);
    return this.prisma.review.create({
      data: review,
    });
  }

  /**
   * Updates an existing review
   * @param id - The unique identifier of the review to update
   * @param review - The updated review data
   * @returns {Promise<Review>} The updated review
   */
  async updateReview(id: string, review: Review) {
    this.logger.debug(`Updating review: ${JSON.stringify(review)}`);
    return this.prisma.review.update({
      where: {
        id,
      },
      data: review,
    });
  }

  /**
   * Deletes a review by its ID
   * @param id - The unique identifier of the review to delete
   * @returns {Promise<Review>} The deleted review
   */
  async deleteReview(id: string) {
    this.logger.debug(`Deleting review: ${id}`);
    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
