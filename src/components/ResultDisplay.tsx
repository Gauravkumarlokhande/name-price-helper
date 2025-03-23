
import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CalculationResult } from './PriceCalculator';

interface ResultDisplayProps {
  result: CalculationResult | null;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (result && cardRef.current) {
      cardRef.current.classList.remove('opacity-0', 'translate-y-4');
      cardRef.current.classList.add('opacity-100', 'translate-y-0');
    }
  }, [result]);

  if (!result) return null;

  // Provide default values to prevent "undefined" errors
  const subtotal = result.subtotal ?? 0;
  const taxAmount = result.taxAmount ?? 0;
  const formattedTotal = result.formattedTotal || `$${(result.total || 0).toFixed(2)}`;

  return (
    <Card 
      ref={cardRef}
      className="w-full max-w-md mx-auto mt-6 overflow-hidden card-glass opacity-0 translate-y-4 transition-all duration-500 ease-out"
    >
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-medium text-center">Price Calculation</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="text-xl font-semibold">{formattedTotal}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResultDisplay;
