import { PriceData, CalculationResult } from '@/components/PriceCalculator';

// This function will call the Python API to get the calculation result
export const calculatePrice = async (data: PriceData): Promise<CalculationResult> => {
  try {
<<<<<<< HEAD
    // Always use the real Python API implementation
=======
    
>>>>>>> aa3693a (messag2e)
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
    // Using direct API call with proper CORS headers
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    console.log('API Response:', response);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

<<<<<<< HEAD
// Keep the mock function for reference, but it's not used anymore
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
=======

>>>>>>> aa3693a (messag2e)
