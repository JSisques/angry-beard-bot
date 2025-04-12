'use client';

import React, { useState } from 'react';
import { IgnoreFilesProps } from './IgnoreFiles.interface';
import { Button } from '@/components/atoms/button';
export const IgnoreFiles: React.FC<IgnoreFilesProps> = ({ dictionary, files, onChange, className, ...props }) => {
  const [newFile, setNewFile] = useState('');

  const handleAdd = () => {
    if (newFile && !files.includes(newFile)) {
      onChange([...files, newFile]);
      setNewFile('');
    }
  };

  const handleRemove = (file: string) => {
    onChange(files.filter(f => f !== file));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newFile}
          onChange={e => setNewFile(e.target.value)}
          placeholder={dictionary.molecules.ignoreFiles.placeholder}
          className="flex-1 px-3 py-2 border rounded-md"
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          {dictionary.molecules.ignoreFiles.add}
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {files.map(file => (
          <div key={file} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
            <span className="text-sm">{file}</span>
            <Button onClick={() => handleRemove(file)} className="bg-red-500 text-white hover:bg-red-700">
              {dictionary.molecules.ignoreFiles.remove}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
