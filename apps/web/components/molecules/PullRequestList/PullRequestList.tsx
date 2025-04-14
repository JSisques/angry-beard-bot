'use client';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/molecules/card';
import { PullRequestListProps } from './PullRequestList.interface';
import { Pagination, PaginationItem, PaginationContent, PaginationPrevious, PaginationLink, PaginationNext } from '../pagination';
import { ExternalLink, Filter } from 'lucide-react';
import { filterPullRequestsByStatus, getUniquePullRequestStatuses, usePullRequests } from './PullRequestList.service';
import { useSession } from '@/hooks/use-session';
import Loading from '@/app/loading';
import { usePagination } from '@/hooks/usePagination';
import { Button } from '@/components/atoms/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/molecules/Select/Select';

export const PullRequestList: React.FC<PullRequestListProps> = ({ dictionary }) => {
  const { user } = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const pullRequestsPagination = usePagination();
  const { data: pullRequestsData, isLoading, error } = usePullRequests(user?.id || '', pullRequestsPagination.currentPage);

  const uniqueStatuses = useMemo(() => getUniquePullRequestStatuses(pullRequestsData), [pullRequestsData]);
  const filteredPullRequests = useMemo(() => filterPullRequestsByStatus(pullRequestsData, selectedStatus), [pullRequestsData, selectedStatus]);

  if (isLoading) return <Loading />;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{dictionary.molecules.pullRequestList.title}</h3>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          {filteredPullRequests.map(pr => (
            <div key={pr.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{pr.title}</h4>
                <p className="text-sm text-muted-foreground">{pr.commits} commits</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    pr.status === 'PENDING'
                      ? 'bg-green-100 text-green-800'
                      : pr.status === 'MERGED'
                        ? 'bg-purple-100 text-purple-800'
                        : pr.status === 'APPROVED'
                          ? 'bg-blue-100 text-blue-800'
                          : pr.status === 'REJECTED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {pr.status}
                </span>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Go to repository"
                >
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => pullRequestsPagination.handlePageChange(pullRequestsPagination.currentPage - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{pullRequestsPagination.currentPage - 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{pullRequestsPagination.currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{pullRequestsPagination.currentPage + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => pullRequestsPagination.handlePageChange(pullRequestsPagination.currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};
