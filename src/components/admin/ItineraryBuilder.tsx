'use client';

import { useState } from 'react';
import { X, Plus, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { ItineraryDay } from '@/types';

interface ItineraryBuilderProps {
  value: ItineraryDay[];
  onChange: (value: ItineraryDay[]) => void;
  error?: string;
}

export function ItineraryBuilder({ value, onChange, error }: ItineraryBuilderProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const addDay = () => {
    const newDay: ItineraryDay = {
      day: value.length + 1,
      title: '',
      description: '',
      activities: [],
    };
    onChange([...value, newDay]);
    setExpandedDay(value.length);
  };

  const removeDay = (index: number) => {
    const newDays = value.filter((_, i) => i !== index);
    // Renumber days
    const renumbered = newDays.map((day, i) => ({ ...day, day: i + 1 }));
    onChange(renumbered);
  };

  const updateDay = (index: number, field: keyof ItineraryDay, val: any) => {
    const newDays = [...value];
    newDays[index] = { ...newDays[index], [field]: val };
    onChange(newDays);
  };

  const addActivity = (dayIndex: number) => {
    const newDays = [...value];
    newDays[dayIndex].activities.push('');
    onChange(newDays);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, val: string) => {
    const newDays = [...value];
    newDays[dayIndex].activities[activityIndex] = val;
    onChange(newDays);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newDays = [...value];
    newDays[dayIndex].activities.splice(activityIndex, 1);
    onChange(newDays);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Itinerary
        </label>
        <Button type="button" size="sm" onClick={addDay}>
          <Plus className="w-4 h-4 mr-2" />
          Add Day
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {value.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No days added yet. Click "Add Day" to start building your itinerary.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {value.map((day, dayIndex) => (
            <div key={dayIndex}>
              <Card>
                <div
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
                >
                  <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <CardTitle className="text-base">
                      Day {day.day}: {day.title || 'Untitled'}
                    </CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDay(dayIndex);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                </CardHeader>
                </div>

              {expandedDay === dayIndex && (
                <CardContent className="space-y-4">
                  <Input
                    label="Day Title"
                    placeholder="e.g., Arrival in Paradise"
                    value={day.title}
                    onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Describe what happens on this day..."
                    value={day.description}
                    onChange={(e) => updateDay(dayIndex, 'description', e.target.value)}
                  />

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">
                        Activities
                      </label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addActivity(dayIndex)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Activity
                      </Button>
                    </div>

                    {day.activities.length === 0 ? (
                      <p className="text-sm text-gray-500">No activities added</p>
                    ) : (
                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex gap-2">
                            <Input
                              placeholder="Activity name"
                              value={activity}
                              onChange={(e) =>
                                updateActivity(dayIndex, activityIndex, e.target.value)
                              }
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeActivity(dayIndex, activityIndex)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
