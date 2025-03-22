
import { PriceData, CalculationResult } from '@/components/PriceCalculator';

// This function will call the Python API to get the calculation result
export const calculatePrice = async (data: PriceData): Promise<CalculationResult> => {
  try {
    // Call the actual Python API endpoint
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
  console.log(data)
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('API call failed with status: ' + response.status);
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
  
  // This is just a mock response for development/testing
  // The actual calculation will be done by the Python API
  return {
    subtotal: data.price,
    taxAmount: 0, // This will come from the Python API
    total: 0,     // This will come from the Python API
    formattedTotal: '$0.00', // This will come from the Python API
  };
};
