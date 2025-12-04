import { Gift, ClaimRequest } from '../types';

const BASE_URL = 'https://studio-5465966901-bc5e2-default-rtdb.firebaseio.com/gifts';

export const claimGift = async (request: ClaimRequest): Promise<boolean> => {
  try {
    // 1. UPDATE: Change isClaimed to true (Patch Firebase)
    const updateResponse = await fetch(`${BASE_URL}/${request.giftId}.json`, {
      method: 'PATCH', // Changed from 'DELETE' to 'PATCH'
      headers: { // Added headers
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ // Added body to specify the update
        isClaimed: true,
      }),
    });

    if (!updateResponse.ok) { // Check the response from the PATCH request
      console.error("Failed to set isClaimed to true in DB");
      return false;
    }

    // 2. Simulate email sending via mailto since we don't have a backend mailer
    const subject = encodeURIComponent(`Gift Claimed: ${request.giftName}`);
    const body = encodeURIComponent(
      `Hello,\n\nI have claimed the following gift from the Genesee Hill Giving Tree:\n\n` +
      `Gift: ${request.giftName}\n` +
      `Claimed By: ${request.claimerName}\n` +
      `Email: ${request.claimerEmail}\n\n` +
      `I will drop off the unwrapped gift by December 11th.`
    );
    
    // We open this in a hidden iframe or just trigger it. 
    // Ideally, for a real app, this would be a server call.
    // For this requirements, we will return true and let the UI handle the "success" message
    // which might prompt the user to ensure the email is sent if we used mailto.
    
    // However, the prompt specifically asked to "send to vicepresident2@geneseehillpta.org".
    // Since we can't automate this 100% without a server, we will use a window.open mailto approach in the UI component 
    // AFTER this promise resolves successfully.
    
    return true;
  } catch (error) {
    console.error('Error claiming gift:', error);
    return false;
  }
};
