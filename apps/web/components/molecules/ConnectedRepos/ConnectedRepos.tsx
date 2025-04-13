import React from 'react';
import { Card } from '@/components/atoms/card';
import { ConnectedReposProps } from './ConnectedRepos.interface';

export const ConnectedRepos: React.FC<ConnectedReposProps> = ({ repositories, dictionary }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{dictionary.molecules.connectedRepos.title}</h3>
        <p className="text-sm text-muted-foreground">{dictionary.molecules.connectedRepos.description}</p>
      </div>

      {repositories.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <p>{dictionary.molecules.connectedRepos.noRepos}</p>
          <p className="text-sm mt-1">{dictionary.molecules.connectedRepos.noReposDescription}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {repositories.map(repo => (
            <div key={repo.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <div className="mr-3">
                  {repo.isPrivate ? <span className="text-muted-foreground">🔒</span> : <span className="text-muted-foreground">🌐</span>}
                </div>
                <div>
                  <p className="font-medium">{repo.name}</p>
                  <p className="text-sm text-muted-foreground">{repo.owner}</p>
                </div>
              </div>
              {repo.lastReviewDate && (
                <span className="text-sm text-muted-foreground">Last review: {new Date(repo.lastReviewDate).toLocaleDateString()}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
