
import { PriceData, CalculationResult } from '@/components/PriceCalculator';

// This function will call the Python API to get the calculation result
export const calculatePrice = async (data: PriceData): Promise<CalculationResult> => {
  try {
    // Always use the real Python API implementation
    return await callPythonApi(data);
  } catch (error) {
    console.error('Failed to call Python API:', error);
    throw error;
  }
};

// Implementation of the actual Python API call
export const callPythonApi = async (data: PriceData): Promise<CalculationResult> => {
  // Replace with your actual Python API endpoint - using HTTP instead of HTTPS for local development
  const apiUrl = 'http://127.0.0.1:8000/items/';
  
  try {
    // Log the request data for debugging
    console.log('Sending API request with data:', JSON.stringify(data));
    
    // Format data to match the API's expected format
    // The backend expects "tax" instead of "taxRate"
    const formattedData = {
      name: String(data.name),
      description: String(data.description),
      price: Number(data.price),
      tax: Number(data.taxRate) // Rename taxRate to tax to match the API expectation
    };
    
    // Using direct API call with proper CORS headers
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formattedData),
    });
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', errorText);
      
      if (response.status === 422) {
        throw new Error('Invalid data format. Please check your inputs and try again.');
      }
      
      throw new Error(`API call failed with status: ${response.status} - ${response.statusText}`);
    }
    
    const responseData = await response.json();
    console.log('API Response data:', responseData);
    
    return responseData;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
