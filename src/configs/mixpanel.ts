import { EnvVarEnum } from "constants/global";
import mixpanel from "mixpanel-browser";
import { User } from "src/types/user";

export function initMixpanel() {
  if (EnvVarEnum.VITE_MIXPANEL_TOKEN) {
    mixpanel.init(EnvVarEnum.VITE_MIXPANEL_TOKEN, {
      debug: false,
      track_pageview: true,
      persistence: "localStorage",
    });
  }
}
export async function identifyUser(userId: string | number, payload: User) {
  try {
    mixpanel.identify(String(userId));
    mixpanel.people.set({
      $name: `${payload.firstname} ${payload.lastname}`,
      $email: payload.email,
      phone: payload.mobileNo,

      // Add anything else about the user here
    });
  } catch (error) {
    console.error(error);
  }
}
export default async function trackUser(
  eventname: string,
  payload: Record<string, any>
) {
  try {
    mixpanel.track(eventname, payload);
  } catch (error) {
    console.error(error);
  }
}

export const enum mixpanelEvents {
  sign_up = "SIGN_UP",
  input_bvn = "INPUT_BVN",
  all_page_loads = "ALL_PAGE_LOAD",
  click_on_an_existing_yield = "ON_EXISTING_YIELD_CLICK",
  click_on_Create_New_yield = "ON_CREATE_NEW_YIELD_CLICK",
  click_on_contact_us = "ON_CONTACT_US_CLICK",
  upon_selecting_yield_amount = "UPON_SELECTING_FIXED_YIELD_AMOUNT",
  upon_selecting_the_number_of_months_for_yield = "UPON_SELECTING_THE_NUMBER_OF_MONTHS_FOR_YIELD",
  sign_in = "SIGN_IN",
  otp = "OTP",
  profile_update = "PROFILE_UPDATE",
  upload_means_of_identification = "UPLOAD_MEANS_OF_IDENTIFICATION",
  paystack = "PAYSTACK",
  yield_activation = "YIELD_ACTIVATION",
  input_basic_info = "INPUT_BASIC_INFO",
  document_verification = "DOCUMENT_VERIFICATION",
  add_bank_account = "ADD_BANK_ACCOUNT",
  upon_naming_yield = "UPON_NAMING_YIELD",
  upon_complete_payment = "UPON_COMPLETE_PAYMENT",
  upon_return_to_dashboard = "UPON_RETURN_TO_DASHBOARD",
  upon_proceed_to_pay = "UPON_PROCEED_TO_PAY",
  on_selecting_rollover = "ON_SELECTING_ROLLOVER",
  on_selecting_capital_only = "ON_SELECTING_CAPITAL_ONLY",
  on_selecting_capital = "ON_Selecting_CAPTIAL",
  on_selecting_inerest = "ON_SELECTING_INTEREST",
  on_selecting_reinvest_yield = "ON_SELECTING_REINVEST_YIELD",
  on_selecting_claim = "ON_SELECTING_CLAIM",
}
