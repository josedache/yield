import trackUser, { mixpanelEvents } from "./mixpanel";

export function trackUserSignUp(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.sign_up, { ...payload });
  } catch (error) {
    console.error("Error tracking user sign up", error);
  }
}

export function trackUserInputBVN(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.input_bvn, { ...payload });
  } catch (error) {
    console.error("Error tracking user bvn", error);
  }
}

export function trackUserAllPageLoads(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.all_page_loads, { ...payload });
  } catch (error) {
    console.error("Error tracking user page laod", error);
  }
}

export function trackUserClickOnAnExistingYield(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.click_on_an_existing_yield, { ...payload });
  } catch (error) {
    console.error("Error tracking existing yield", error);
  }
}

export function trackUserClickOnCreateNewYield(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.click_on_Create_New_yield, { ...payload });
  } catch (error) {
    console.error("Error tracking user creating new yield", error);
  }
}

export function trackUserClickOnContactUs(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.click_on_contact_us, { ...payload });
  } catch (error) {
    console.error("Error tracking user contact us", error);
  }
}

export function trackUserUponSelectingYieldAmount(
  payload: Record<string, any>
) {
  try {
    trackUser(mixpanelEvents.upon_selecting_yield_amount, { ...payload });
  } catch (error) {
    console.error("Error tracking selecting yield amount", error);
  }
}

export function trackUserUponSelectingTheNumberOfMonthsForYield(
  payload: Record<string, any>
) {
  try {
    trackUser(mixpanelEvents.upon_selecting_the_number_of_months_for_yield, {
      ...payload,
    });
  } catch (error) {
    console.error(
      "Error tracking selecting the number of months for yield",
      error
    );
  }
}

export function trackUserSignIn(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.sign_in, { ...payload });
  } catch (error) {
    console.error("Error tracking user sign in", error);
  }
}

export function trackUserInputBasicInfo(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.input_basic_info, { ...payload });
  } catch (error) {
    console.error("Error tracking user otp", error);
  }
}

export function trackUserOTP(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.otp, { ...payload });
  } catch (error) {
    console.error("Error tracking user otp", error);
  }
}

export function trackUserPaystack(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.paystack, { ...payload });
  } catch (error) {
    console.error("Error tracking user paystack", error);
  }
}

export function trackUserYieldActivation(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.yield_activation, { ...payload });
  } catch (error) {
    console.error("Error tracking user Yield activation", error);
  }
}

export function trackUserProfileUpdate(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.profile_update, { ...payload });
  } catch (error) {
    console.error("Error tracking user profile", error);
  }
}

export function trackUserUploadMeansOfIdentification(
  payload: Record<string, any>
) {
  try {
    trackUser(mixpanelEvents.upload_means_of_identification, { ...payload });
  } catch (error) {
    console.error("Error tracking user means of identification", error);
  }
}

export function trackUserOnSelectingClaim(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.on_selecting_claim, { ...payload });
  } catch (error) {
    console.error("Error tracking user claim", error);
  }
}

export function trackUserOnSelectingReinvestYield(
  payload: Record<string, any>
) {
  try {
    trackUser(mixpanelEvents.on_selecting_reinvest_yield, { ...payload });
  } catch (error) {
    console.error("Error tracking user reinvest yield", error);
  }
}

export function trackUserOnSelectingInterest(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.on_selecting_inerest, { ...payload });
  } catch (error) {
    console.error("Error tracking user interest", error);
  }
}

export function trackUserOnSelectingCapital(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.on_selecting_capital, { ...payload });
  } catch (error) {
    console.error("Error tracking user capital", error);
  }
}

export function trackUserOnSelectingCapitalOnly(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.on_selecting_capital_only, { ...payload });
  } catch (error) {
    console.error("Error tracking user capital only", error);
  }
}

export function trackUserOnSelectingRollover(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.on_selecting_rollover, { ...payload });
  } catch (error) {
    console.error("Error tracking user rollover", error);
  }
}

export function trackUserUponProceedToPay(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.upon_proceed_to_pay, { ...payload });
  } catch (error) {
    console.error("Error tracking user proceed payment", error);
  }
}

export function trackUserUponReturnToDashboard(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.upon_return_to_dashboard, { ...payload });
  } catch (error) {
    console.error("Error tracking user proceed payment", error);
  }
}

export function trackUserUponCompletePayment(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.upon_complete_payment, { ...payload });
  } catch (error) {
    console.error("Error tracking user complete payment", error);
  }
}

export function trackUserUponNamingYield(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.upon_naming_yield, { ...payload });
  } catch (error) {
    console.error("Error tracking user naming yield", error);
  }
}

export function trackUserAddBankAccount(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.add_bank_account, { ...payload });
  } catch (error) {
    console.error("Error tracking user adding bank account", error);
  }
}

export function trackUserDocumentVerification(payload: Record<string, any>) {
  try {
    trackUser(mixpanelEvents.document_verification, { ...payload });
  } catch (error) {
    console.error("Error tracking user document upload", error);
  }
}
