export interface Gift {
  id: string;
  name: string;
  description: string;
  type?: 'toy' | 'clothing' | 'book' | 'other';
}

export interface ClaimRequest {
  giftId: string;
  claimerName: string;
  claimerEmail: string;
  giftName: string;
}

export interface TreePosition {
  top: number;
  left: number;
}
