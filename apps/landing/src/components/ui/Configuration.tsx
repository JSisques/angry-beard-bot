'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card';
import { ConfigurationSlider } from './ConfigurationSlider';

const EXAMPLE_CODE = `function calculateTotal(items: Item[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export function Configuration() {
  const [grumpiness, setGrumpiness] = useState(50);
  const [technical, setTechnical] = useState(50);
  const [detail, setDetail] = useState(50);

  // Grumpiness level previews
  const grumpinessPreviews = {
    0: "This code is... acceptable. I've seen worse, but that's not saying much.",
    50: "Oh great, another masterpiece of mediocrity. Let's see what we're dealing with here.",
    100: 'WHAT IS THIS ABOMINATION?! Did you write this with your feet while blindfolded?!',
  };

  // Technical level previews
  const technicalPreviews = {
    0: 'The code works, but there are better ways to do this.',
    50: 'This implementation could benefit from functional programming patterns and modern ES6+ features.',
    100: 'This is a perfect example of why we need to implement proper TypeScript interfaces and follow SOLID principles!',
  };

  // Detail level previews
  const detailPreviews = {
    0: 'The code could be improved.',
    50: 'The implementation needs attention to performance, error handling, and maintainability.',
    100: 'This implementation needs a complete overhaul considering security, scalability, maintainability, and following industry best practices!',
  };

  // Code review comments based on grumpiness level
  const reviewComments = {
    0: [
      'The code works, but there are more elegant ways to handle this.',
      'Consider using reduce() for a more functional approach.',
      'A more concise solution would be: items.reduce((sum, item) => sum + item.price, 0)',
    ],
    50: [
      'Oh, look what we have here. Another function that could be written in one line using modern JavaScript.',
      "At least you're using a loop instead of repeating the addition 100 times. Small victories, I suppose.",
      'Consider using items.reduce((acc, curr) => acc + curr.price, 0) for a more elegant solution.',
    ],
    100: [
      'WHAT IS THIS PRIMITIVE NONSENSE?! Did you learn JavaScript from a cave painting?!',
      "A FOR LOOP?! In 2024?! What's next, are you going to tell me you still use jQuery too?!",
      'USE items.reduce<number>((sum, item) => sum + item.price, 0) YOU ABSOLUTE CODING BARBARIAN!',
    ],
  };

  const getPreviewText = (value: number, previews: Record<number, string>) => {
    // Round to nearest valid value (0, 50, 100)
    const nearestValue = Math.round(value / 50) * 50;
    return previews[nearestValue];
  };

  const getCodeReview = () => {
    // Round to nearest valid values
    const grumpinessLevel = Math.round(grumpiness / 50) * 50;
    const technicalLevel = Math.round(technical / 50) * 50;
    const detailLevel = Math.round(detail / 50) * 50;

    // Get comments based on grumpiness level
    const comments = reviewComments[grumpinessLevel as keyof typeof reviewComments];
    let reviewHTML = comments
      .map((line, index) => {
        const isLast = index === comments.length - 1;
        return `<p class="${isLast ? '' : 'mb-2'}">"${line}"</p>`;
      })
      .join('');

    // Add technical considerations based on technical level
    if (technicalLevel >= 50) {
      reviewHTML += `
        <div class="mt-4 p-3 bg-muted/30 rounded-lg">
          <p class="text-sm font-medium mb-2">Technical Considerations:</p>
          <ul class="list-disc pl-4 space-y-1">
            ${
              technicalLevel === 100
                ? `
              <li>Type safety with generics</li>
              <li>Proper TypeScript interfaces</li>
              <li>Functional programming patterns</li>
            `
                : `
              <li>Type annotations</li>
              <li>Modern JavaScript features</li>
            `
            }
          </ul>
        </div>
      `;
    }

    // Add detailed considerations based on detail level
    if (detailLevel >= 50) {
      reviewHTML += `
        <div class="mt-4 p-3 bg-muted/30 rounded-lg">
          <p class="text-sm font-medium mb-2">Additional Considerations:</p>
          <ul class="list-disc pl-4 space-y-1">
            ${
              detailLevel === 100
                ? `
              <li>Error handling for empty arrays or null values</li>
              <li>Performance implications for large arrays</li>
              <li>Memory usage optimization</li>
              <li>Input validation</li>
              <li>Edge case handling</li>
            `
                : `
              <li>Basic error handling</li>
              <li>Input validation</li>
              <li>Edge cases</li>
            `
            }
          </ul>
        </div>
      `;
    }

    return reviewHTML;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-2xl">😤</span>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">Bot Personality</CardTitle>
          <CardDescription>Customize how the bot communicates with your team.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-8 flex-1 flex flex-col">
            <ConfigurationSlider
              label="Grumpiness Level"
              description="How sarcastic the bot should be"
              defaultValue={grumpiness}
              onChange={setGrumpiness}
              step={50}
              marks={[
                { value: 0, label: 'Mild' },
                { value: 50, label: 'Moderate' },
                { value: 100, label: 'Extreme' },
              ]}
            />

            <ConfigurationSlider
              label="Technical Level"
              description="How technical the feedback should be"
              defaultValue={technical}
              onChange={setTechnical}
              step={50}
              marks={[
                { value: 0, label: 'Basic' },
                { value: 50, label: 'Intermediate' },
                { value: 100, label: 'Advanced' },
              ]}
            />

            <ConfigurationSlider
              label="Detail Level"
              description="How detailed the reviews should be"
              defaultValue={detail}
              onChange={setDetail}
              step={50}
              marks={[
                { value: 0, label: 'Concise' },
                { value: 50, label: 'Balanced' },
                { value: 100, label: 'Comprehensive' },
              ]}
            />

            <div className="p-4 rounded-lg border bg-card/50 flex-1">
              <p className="text-sm font-medium mb-2">Personality Preview:</p>
              <div className="text-sm text-muted-foreground italic">"{getPreviewText(grumpiness, grumpinessPreviews)}"</div>
              <div className="text-sm text-muted-foreground italic mt-2">"{getPreviewText(technical, technicalPreviews)}"</div>
              <div className="text-sm text-muted-foreground italic mt-2">"{getPreviewText(detail, detailPreviews)}"</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">Live Preview</CardTitle>
          <CardDescription>See how Angry Beard Bot would review this code based on your settings.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="p-4 rounded-lg bg-muted/30 font-mono text-sm overflow-x-auto">
              <pre>
                <code>{EXAMPLE_CODE}</code>
              </pre>
            </div>
            <div className="p-4 rounded-lg border bg-card/50 flex-1">
              <p className="text-sm font-medium mb-2">Bot's Review:</p>
              <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: getCodeReview() }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
