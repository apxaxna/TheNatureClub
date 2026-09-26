'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function RatingSelector({ value, onChange, max = 5 }: RatingSelectorProps) {
  return (
    <div className="flex gap-2">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            className="transition-all hover:scale-110"
          >
            <Star
              className={cn(
                'w-8 h-8 transition-colors',
                starValue <= value
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              )}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm text-gray-600 self-center">
        {value} / {max}
      </span>
    </div>
  );
}
