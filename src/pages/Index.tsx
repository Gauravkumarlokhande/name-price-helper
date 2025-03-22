
import React, { useState } from 'react';
import PriceCalculator, { CalculationResult } from '@/components/PriceCalculator';
import ResultDisplay from '@/components/ResultDisplay';

const Index = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-slide-down">
        <div className="text-center space-y-2 mb-8">
          <h4 className="text-sm font-medium text-primary">Simple • Fast • Accurate</h4>
          <h1 className="text-4xl font-semibold tracking-tight">Price Calculator</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter your product details below to calculate pricing with tax included.
          </p>
        </div>
        
        <PriceCalculator onResultReceived={setResult} />
        <ResultDisplay result={result} />
      </div>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Price Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
