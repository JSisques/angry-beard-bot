'use client';

import React from 'react';
import { Slider } from './slider';
import { Label } from './label';

interface ConfigurationSliderProps {
  label: string;
  description: string;
  defaultValue: number;
  onChange: (value: number) => void;
  step: number;
  marks: Array<{ value: number; label: string }>;
}

export function ConfigurationSlider({ label, description, defaultValue, onChange, step, marks }: ConfigurationSliderProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
        <Slider defaultValue={[defaultValue]} max={100} step={step} onValueChange={values => onChange(values[0])} />
        <div className="flex justify-between mt-2">
          {marks.map((mark, index) => (
            <div key={mark.value} className={`flex-1 ${index === 0 ? 'text-left' : index === marks.length - 1 ? 'text-right' : 'text-center'}`}>
              <span className="text-sm text-muted-foreground">{mark.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
