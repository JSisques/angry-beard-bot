'use client';

import React, { useState } from 'react';
import { IgnoreFilesProps } from './IgnoreFiles.interface';
import { Button } from '@/components/atoms/button';
import { X } from 'lucide-react';

export const IgnoreFiles: React.FC<IgnoreFilesProps> = ({ dictionary, extensions, onChange, className, ...props }) => {
  const [newExtension, setNewExtension] = useState('');

  const handleAdd = () => {
    if (newExtension && !extensions.includes(newExtension)) {
      onChange([...extensions, newExtension]);
      setNewExtension('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (extension: string) => {
    onChange(extensions.filter(e => e !== extension));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] bg-white flex-1">
          {extensions.map(extension => (
            <div key={extension} className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
              <span>{extension}</span>
              <button
                onClick={() => handleRemove(extension)}
                className="p-0.5 hover:bg-gray-300 rounded-full"
                aria-label={dictionary.molecules.ignoreFiles.remove}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={newExtension}
            onChange={e => setNewExtension(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={extensions.length === 0 ? dictionary.molecules.ignoreFiles.placeholder : ''}
            className="flex-1 min-w-[120px] outline-none"
          />
        </div>
      </div>
    </div>
  );
};
