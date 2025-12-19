
export type VoucherOption = 'restaurant' | 'hotel' | null;

export interface UserSelections {
  interests: string[];
  voucherPreference: VoucherOption;
  email: string;
  agreed: boolean;
}

export enum FunnelStep {
  INTRO = 'INTRO',
  FORM = 'FORM',
  SUBMITTING = 'SUBMITTING'
}
