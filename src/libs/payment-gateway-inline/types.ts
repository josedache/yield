import {
  PaymentGatewayInlineChannel,
  PaymentGatewayInlineProvider,
} from "./enums";

export interface PaymentGatewayInlineOptions {
  key: string;
  provider: PaymentGatewayInlineProvider;
  providerConfig?: {
    paystack?: any;
    flutterwave?: any;
    seerbit?: any;
    remita?: any;
  };
  title?: string;
  description?: string;
  email?: string;
  name?: string;
  currency?: string;
  amount?: number;
  reference?: string | number;
  logo?: string;
  metadata?: any;
  channels?: PaymentGatewayInlineChannel[];
  onSuccess?: () => void;
  onError?: () => void;
  onClose?: () => void;
}
