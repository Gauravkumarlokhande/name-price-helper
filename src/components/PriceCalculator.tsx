
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { calculatePrice } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';

export interface PriceData {
  name: string;
  description: string;
  price: number;
  taxRate: number;
}

export interface CalculationResult {
  subtotal: number;
  taxAmount: number;
  total: number;
  formattedTotal: string;
}

interface PriceCalculatorProps {
  onResultReceived: (result: CalculationResult) => void;
}

const PriceCalculator = ({ onResultReceived }: PriceCalculatorProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PriceData>({
    name: '',
    description: '',
    price: 0,
    taxRate: 0,
  });
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'taxRate' ? parseFloat(value) || 0 : value,
    }));
  };

  const validateForm = (): boolean => {
    // Ensure name is not empty
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Product name is required",
        variant: "destructive",
      });
      return false;
    }
    
    // Ensure price is a positive number
    if (isNaN(formData.price) || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Price must be a positive number",
        variant: "destructive",
      });
      return false;
    }
    
    // Ensure tax rate is a non-negative number
    if (isNaN(formData.taxRate) || formData.taxRate < 0) {
      toast({
        title: "Validation Error",
        description: "Tax rate must be a non-negative number",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Ensure we're sending properly formatted data
      const dataToSend: PriceData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        taxRate: Number(formData.taxRate)
      };
      
      console.log('Submitting data:', dataToSend);
      
      const result = await calculatePrice(dataToSend);
      
      onResultReceived(result);
      
      toast({
        title: "Calculation Complete",
        description: "Your price data has been processed successfully.",
      });
    } catch (error) {
      toast({
        title: "API Error",
        description: error instanceof Error ? error.message : "Failed to get calculation. Please try again.",
        variant: "destructive",
      });
      console.error('API call error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden animate-fade-in card-glass">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="label">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="input-pristine"
            required
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="description" className="label">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            className="input-pristine resize-none min-h-[100px]"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="price" className="label">Price</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                $
              </div>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price || ''}
                onChange={handleInputChange}
                placeholder="0.00"
                className="input-pristine pl-6"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="taxRate" className="label">Tax Rate</Label>
            <div className="relative">
              <Input
                id="taxRate"
                name="taxRate"
                type="number"
                value={formData.taxRate || ''}
                onChange={handleInputChange}
                placeholder="0"
                className="input-pristine pr-6"
                step="0.1"
                min="0"
                max="100"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                %
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-6 btn-primary"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate Price"}
        </Button>
      </form>
    </Card>
  );
};

export default PriceCalculator;
