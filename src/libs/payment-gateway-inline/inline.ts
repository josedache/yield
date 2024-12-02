import currencyjs from "currency.js";
import {
  PaymentGatewayInlineChannel,
  PaymentGatewayInlineProvider,
} from "./enums";
import { PaymentGatewayInlineOptions } from "./types";

/**
 *
 * @param {PaymentGatewayInlineOptions} config
 */
function PaymentGatewayInlineInline(config: PaymentGatewayInlineOptions) {
  switch (config.provider) {
    case PaymentGatewayInlineProvider.PAYSTACK: {
      if (!(window as any).PaystackPop) {
        throw new Error("PaystackPop not available");
      }
      const paystack = new (window as any).PaystackPop();

      paystack.newTransaction({
        key: config.key,
        reference: config.reference,
        email: config.email,
        currency: config.currency,
        amount: currencyjs(config?.amount).multiply(100).value,
        ...(config.channels?.length
          ? {
              channels: config.channels
                ?.map(
                  (channel) =>
                    ({
                      [PaymentGatewayInlineChannel.CARD]: "card",
                      [PaymentGatewayInlineChannel.BANK]: "bank",
                      [PaymentGatewayInlineChannel.BANK_TRANSFER]:
                        "bank_transfer",
                      [PaymentGatewayInlineChannel.USSD]: "ussd",
                      [PaymentGatewayInlineChannel.MOBILE_MONEY]:
                        "mobile_money",
                      [PaymentGatewayInlineChannel.QR]: "qr",
                    }[channel])
                )
                ?.filter((channel) => !!channel),
            }
          : {}),
        metadata: config?.metadata,
        onSuccess: config?.onSuccess,
        onCancel: config?.onClose,
        ...config?.providerConfig?.paystack,
      });
      return paystack;
    }
    case PaymentGatewayInlineProvider.FLUTTERWAVE: {
      if (!(window as any).FlutterwaveCheckout) {
        throw new Error("FlutterwaveCheckout not available");
      }
      const flutterwaveCheckout = (window as any).FlutterwaveCheckout({
        public_key: config.key,
        tx_ref: config.reference,
        currency: config.currency,
        amount: config?.amount,
        customer: {
          email: config.email,
          // name: config.name,
        },
        customizations: {
          title: config.title,
          description: config.description,
          logo: config.logo,
        },
        meta: config.metadata,
        payment_options: config.channels
          ?.map(
            (channel) =>
              ({
                [PaymentGatewayInlineChannel.CARD]: "card",
                [PaymentGatewayInlineChannel.BANK]: "bank",
                [PaymentGatewayInlineChannel.BANK_TRANSFER]: "banktransfer",
                [PaymentGatewayInlineChannel.USSD]: "ussd",
                // [PaymentGatewayInlineChannel.MOBILE_MONEY]:
                //   "mobile_money",
                // [PaymentGatewayInlineChannel.QR]: "qr",
              }[channel])
          )
          ?.filter((channel) => !!channel)
          ?.join(", "),
        callback: config.onSuccess,
        onclose: config.onClose,
        ...config?.providerConfig?.flutterwave,
      });
      return flutterwaveCheckout;
    }
    case PaymentGatewayInlineProvider.REMITA: {
      if (!(window as any).RmPaymentEngine) {
        throw new Error("RmPaymentEngine not available");
      }
      const rmPaymentEngine = (window as any).RmPaymentEngine.init({
        key: config.key,
        transactionId: config.reference,
        // firstName: config.firstName,
        // lastName: config.lastName,
        customerId: config.email,
        email: config.email,
        currency: config.currency,
        amount: config?.amount,
        narration: config.description,
        onSuccess: config.onSuccess,
        onError: config.onError,
        onClose: config.onClose,
        ...config?.providerConfig?.remita,
      });
      rmPaymentEngine.showPaymentWidget();
      return rmPaymentEngine;
    }
    case PaymentGatewayInlineProvider.SEERBIT: {
      if (!(window as any).SeerbitPay)
        throw new Error("SeerbitPay not available");
      const seerbitPay = (window as any).SeerbitPay(
        {
          public_key: config.key,
          tranref: config.reference,
          currency: config.currency,
          country: "NG",
          description: config.description,
          amount: config?.amount,
          email: config.email,
          setAmountByCustomer: false,
          full_name: config.name,
          tokenize: false,
          // callbackurl: "http://yourdomain.com",
          metadata: config.metadata,
          customizations: {
            title: config.title,
            description: config.description,
            metadata: config.metadata,
            logo: config.logo,
            payment_method: config.channels
              ?.map(
                (channel) =>
                  ({
                    [PaymentGatewayInlineChannel.CARD]: "card",
                    [PaymentGatewayInlineChannel.BANK]: "account",
                    [PaymentGatewayInlineChannel.BANK_TRANSFER]: "transfer",
                    [PaymentGatewayInlineChannel.USSD]: "ussd",
                    [PaymentGatewayInlineChannel.WALLET]: "wallet",
                  }[channel])
              )
              ?.filter((channel) => !!channel),
          },
          ...config?.providerConfig?.seerbit,
        },
        config.onSuccess,
        config.onClose
      );
      return seerbitPay;
    }
    default:
      throw new Error('"provider is required"');
  }
}

export default PaymentGatewayInlineInline;
