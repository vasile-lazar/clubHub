import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  autoSearch?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  className = '',
  showClearButton = true,
  autoSearch = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) onSearch();
  };

  const handleClear = () => {
    onChange('');
    if (onSearch && autoSearch) onSearch();
  };

  return (
    <div className={`relative flex flex-1 max-w-md ${className}`}>
      <div className="relative flex-1 flex items-center">
        <MagnifyingGlassIcon className="absolute left-4 h-5 w-5 text-text-secondary pointer-events-none" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (autoSearch && onSearch) onSearch();
          }}
          onKeyDown={handleKeyDown}
          className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-input-border bg-bg-secondary text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-input-focus transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {showClearButton && value && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-primary transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      {onSearch && !autoSearch && (
        <Button onClick={onSearch} className="ml-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          Search
        </Button>
      )}
    </div>
  );
};
