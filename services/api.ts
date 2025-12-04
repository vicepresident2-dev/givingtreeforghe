import { Gift, ClaimRequest } from '../types';

const BASE_URL = 'https://studio-5465966901-bc5e2-default-rtdb.firebaseio.com/gifts';

export const fetchGifts = async (): Promise<Gift[]> => {
  try {
    const response = await fetch(`${BASE_URL}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch gifts');
    }
    const data = await response.json();
    if (!data) return [];

    // Convert object map to array, assign IDs, and FILTER out claimed gifts
    return Object.entries(data)
      .filter(([key, value]: [string, any]) => !value.isClaimed) 
      .map(([key, value]: [string, any]) => ({
        id: key,
        name: value.name || 'Unknown Gift',
        description: value.description || 'A surprise gift',
        type: value.type || 'other'
      }));
  } catch (error) {
    console.error('Error fetching gifts:', error);
    return [];
  }
};

export const claimGift = async (request: ClaimRequest): Promise<boolean> => {
  try {
    // 1. UPDATE: Change isClaimed to true AND record claimer's details (PATCH Firebase)
    const updateResponse = await fetch(`${BASE_URL}/${request.giftId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isClaimed: true,
        claimerName: request.claimerName,
        claimerEmail: request.claimerEmail,
      }),
    });

    if (!updateResponse.ok) {
      console.error("Failed to update claim status and details in DB");
      return false;
    }

    // Return true to signal success. App.tsx will handle the mailto prompt.
    return true; 
  } catch (error) {
    console.error('Error claiming gift:', error);
    return false;
  }
};
