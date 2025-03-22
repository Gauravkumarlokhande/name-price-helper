
import { PriceData, CalculationResult } from '@/components/PriceCalculator';

// This function will call the Python API to get the calculation result
export const calculatePrice = async (data: PriceData): Promise<CalculationResult> => {
  try {
    // In development, use the mock implementation 
    // due to CORS limitations with external APIs
    if (import.meta.env.DEV) {
      console.log('Using mock implementation in development mode');
      return await mockCalculatePrice(data);
    }
    
    // In production, call the actual Python API endpoint
    return await callPythonApi(data);
  } catch (error) {
    console.error('Failed to call Python API:', error);
    throw error;
  }
};

// Implementation of the actual Python API call
export const callPythonApi = async (data: PriceData): Promise<CalculationResult> => {
  // Replace with your actual Python API endpoint
  const apiUrl = 'https://name-price-api.vercel.app/items/';
  
  try {
    // For production: API should implement CORS or use server-side proxy
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(data),
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// For development/testing without the Python API
export const mockCalculatePrice = async (data: PriceData): Promise<CalculationResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Calculate a simulated tax amount and total for development/testing
  const taxAmount = data.price * (data.taxRate / 100);
  const total = data.price + taxAmount;
  
  // This is just a mock response for development/testing
  // The actual calculation will be done by the Python API
  return {
    subtotal: data.price,
    taxAmount: taxAmount,
    total: total,
    formattedTotal: `$${total.toFixed(2)}`,
  };
};
