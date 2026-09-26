'use client';

import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface StringArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
}

export function StringArrayInput({
  label,
  value,
  onChange,
  placeholder,
  error,
}: StringArrayInputProps) {
  const addItem = () => {
    onChange([...value, '']);
  };

  const updateItem = (index: number, newValue: string) => {
    const newItems = [...value];
    newItems[index] = newValue;
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = value.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <Button type="button" size="sm" variant="outline" onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {value.length === 0 ? (
        <p className="text-sm text-gray-500">No items added</p>
      ) : (
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={placeholder}
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
