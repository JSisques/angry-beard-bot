import React from 'react';
import { Card } from '@/components/molecules/card';
import { PullRequestListProps } from './PullRequestList.interface';
import { Pagination, PaginationItem, PaginationContent, PaginationPrevious, PaginationLink, PaginationNext } from '../pagination';

export const PullRequestList: React.FC<PullRequestListProps> = ({ dictionary, pullRequests, currentPage, onPageChange }) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{dictionary.molecules.pullRequestList.title}</h3>
        <div className="space-y-4">
          {pullRequests.map(pr => (
            <div key={pr.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{pr.title}</h4>
                <p className="text-sm text-muted-foreground">{pr.repository}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    pr.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : pr.status === 'merged'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {pr.status}
                </span>
                <span className="text-sm text-muted-foreground">{new Date(pr.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage - 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};
