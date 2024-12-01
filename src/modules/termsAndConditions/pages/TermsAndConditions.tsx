const TermsAndConditions = () => {
  const navigations = [
    {
      id: 1,
      title: "Introduction",
    },
    {
      id: 2,
      title: "Definitions and Interpretations",
    },
    {
      id: 3,
      title: "Purpose",
    },
    {
      id: 4,
      title: "Acceptance of Terms and Conditions",
    },
    {
      id: 5,
      title: "Use of the Services",
    },
    {
      id: 6,
      title: "Personal Information",
    },
    {
      id: 7,
      title: "Disclosure of Personal Information",
    },
    {
      id: 8,
      title: "Your Access",
    },
    {
      id: 9,
      title: "Alerts, Notifications and Service Communications",
    },
    {
      id: 10,
      title: "Intellectual Property Rights",
    },
    {
      id: 11,
      title: "Users Obligations",
    },
    {
      id: 12,
      title: "Users Obligations",
    },
    {
      id: 13,
      title: "Statements",
    },
    {
      id: 14,
      title:
        "Anti-Money Laundering, Combating the Financing of Terrorism and Countering Proliferation Financing (AML/CFT/CPF)",
    },
    {
      id: 15,
      title: "Due Diligence and Audit Rights",
    },
    {
      id: 16,
      title: "Provisions applicable to Investment",
    },
    {
      id: 17,
      title: "Disclosures",
    },
    {
      id: 18,
      title: "Notices",
    },
    {
      id: 19,
      title: "Indemnity",
    },
    {
      id: 20,
      title: "Disclaimer Warranties",
    },
    {
      id: 21,
      title: "Limitation of Liability",
    },
    {
      id: 22,
      title: "Breach of these terms",
    },
    {
      id: 23,
      title: "Variation and Termination",
    },
    {
      id: 24,
      title: "Entire Agreement",
    },
    {
      id: 25,
      title: "Assignment",
    },
    {
      id: 26,
      title: "Severability",
    },
    {
      id: 27,
      title: "Waiver",
    },
    {
      id: 28,
      title: "Force Majeure",
    },
    {
      id: 29,
      title: "Governing Law",
    },
    {
      id: 30,
      title: "Dispute Resolution",
    },
    {
      id: 31,
      title: "Miscellaneous",
    },
    {
      id: 32,
      title: "Feedback and Contact",
    },
  ];
  return (
    <div className="flex gap-10">
      <div className="mt-10 pl-10 w-full">
        <ul className="w-full max-w-sm text-black mt-10 font-bold text-sm flex flex-col gap-2 cursor-pointer list-disc">
          {navigations.map((navigation) => (
            <li key={navigation.id}>
              <a href={`/terms-and-conditions/#${navigation.id}`}>
                {navigation.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-extrabold text-black mt-6">TERMS OF USE</div>
        <div id="1">
          <h2 className="font-bold  text-black mt-6">
            <span>1. </span>Introduction
          </h2>
          <p>
            Credit Direct Finance Company Limited (“Credit Direct”, “we”, “the
            company” or “us”) offers financial services and products. Should you
            choose to become our client, we will create a Yield account for you:
            Please note that your use of and access to the services (as defined
            below) are subject to the following terms; if you do not agree to
            all of these terms, you may not use or access the services in any
            manner.
          </p>
        </div>
        <div className="mt-3" id="2">
          <h2 className="font-semibold text-black">
            <span className="font-bold mt-3  text-black">2. </span>Definitions
            and Interpretations
          </h2>
          <p className="text-black font-semibold">
            <span className="font-bold  text-black">2.1 </span>Definitions
          </p>
          <span>
            For the purpose of this Agreement and the preamble above, unless the
            context requires otherwise:
          </span>
          <p className="mt-2">
            <span className="font-semibold  text-black"> Agreement </span>means
            this Terms of Use or Terms & Conditions
          </p>
          <p className="mt-2">
            <span className="font-semibold text-black">Account </span> means
            your Yield account with Credit Direct
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Amount</span> means
            funds to be placed in the Services
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Business Day</span>{" "}
            means weekdays excluding Saturdays and Sundays and all other days
            officially declared work-free days/public holidays in Nigeria.
          </p>
          <p className="mt-2">
            {" "}
            <span className="font-semibold  text-black">
              {" "}
              Force Majeure
            </span>{" "}
            means events, circumstances or causes beyond the reasonable control
            of Credit Direct making Credit Direct’s performance of its
            obligations inadvisable, commercially impracticable, illegal, or
            impossible, including but not limited to acts of God, war,
            pandemics, lockdowns, strikes or labor disputes, embargoes or
            government orders;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">
              Payment System Provider
            </span>{" "}
            means Banks, and other financial institutions that has been duly
            licensed to provide payment services in Nigeria;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Prevailing Rate</span>{" "}
            means the rate of interest payable on the funds as shall be notified
            to you through the App or the website, which rate may be varied from
            time to time;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Privacy Policy</span>{" "}
            means the Credit Direct privacy policy that sets out the basis on
            which any personal data we collect from you, or that you provide to
            us, will be processed by us;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Request</span> means a
            request or instruction received by Credit Direct from you or
            purportedly from you through the App or website or any of our
            customer support channels and upon which Credit Direct is authorized
            to act;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Services</span> shall
            include any form of financial services or products, including but
            not limited to Yield that Credit Direct may offer you pursuant to
            this Agreement and which you may from time to time subscribe to as
            well as your use of the Credit Direct App and System; and “Service”
            shall be construed accordingly
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Tenure</span> mean the
            duration for which the funds is held before it matures or is
            liquidated
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">
              Third Party Partners
            </span>{" "}
            mean banks, payment companies, asset management firms, credit
            reference bureaus, debt recovery companies, or any other person
            (entity) that provides any form of service or information to us for
            the provision of the Service;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">Transaction Fees</span>{" "}
            include any fees and charges payable for the use of the Services as
            published by Credit Direct on Credit Direct’s website, the App or by
            such other means as Credit Direct shall in its sole discretion
            determine. Transaction Fees are subject to change at Credit Direct’s
            discretion;
          </p>
          <p className="mt-2">
            <span className="font-semibold  text-black">User</span> means the
            person using the Services
          </p>
          <p className="mt-2">
            <span className="font-semibold text-black">Yield account</span>{" "}
            means a registered account on our website or app that you have with
            us for the for the placement of funds for an agreed tenor to earn
            returns at the Prevailing Rate;
          </p>
          <div>
            <p className="mt-2">
              <span className="font-semibold text-black">You and your</span>{" "}
              mean the person who uses or accesses the Services
            </p>
            <h2 className="font-semibold text-black">
              <span className="font-bold text-black">2.2 </span> Interpretation
            </h2>
            <p className="mt-2">
              <span className="text-black">2.2.1 </span>In addition to the
              definitions in clause 2.1, unless the context requires otherwise:
              the singular shall include the plural and vice versa;
            </p>
            <p className="mt-2">
              <span className="text-black">2.2.2 </span>a reference to any one
              gender, whether masculine or feminine includes the other
            </p>
            <p className="mt-2">
              <span className="text-black">2.2.3 </span>All the headings and
              sub-headings in this Agreement are for convenience only and are
              not to be taken into account for the purposes of interpretation of
              this Agreement.
            </p>
          </div>
        </div>

        <div id="3">
          <h1 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">3. </span>Purpose
          </h1>
          <p className="mt-2">
            <span className=" text-black">3.1 </span>The purpose of the Services
            is to help you maximize your funds with minimal effort.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.2 </span>By signing up to our Yield
            offerings, you authorize us to manage the funds placed with us by
            ourselves or through our fund management partners.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.3 </span>Before you authorize a
            Yield plan, the summary of your proposed amount, Prevailing Rate,
            tenor, maturity date, Fees, taxes, will be made available to you on
            the App. Please do not proceed with the plan if the terms are not
            acceptable to you.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.4 </span>You may fund your Yield
            Account by using any of the funding methods on the App and you
            authorize us to deduct the Amount from your bank account for the
            purposes of effecting your Yield plan.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.5 </span>Your funds will remain in
            your Yield Account until you instruct us to transfer any or all of
            your funds from your Yield Account to your bank account. We will
            generally transfer the requested funds from your Yield Account to
            your bank account within two Business Days of when we receive your
            request. It is important to know the amount of available funds in
            your Yield Account before instructing us to transfer funds from your
            Yield Account.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.6 </span>Your funds transfer
            activities via the Website or App shall be subject to transaction
            and balance limits in accordance with applicable law.
          </p>

          <p className="mt-2">
            <span className=" text-black">3.7 </span>If you do not have
            sufficient available funds in your Yield Account to cover the amount
            of the requested transfer, your request for the transfer will be
            declined. We may also transfer funds from your Yield Account to your
            bank account without notice to you upon the closure of your Yield
            Account as described below and at any time if required by applicable
            law or if we, in our sole discretion, suspect the Services are being
            used for illicit purposes or otherwise in violation of these Terms.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.8 </span>You may obtain information
            about the balance of funds in your Yield Account at any time by
            logging into your account on the Website or the app.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.9 </span>You will receive interest
            or other earnings on the funds in your Yield Account in accordance
            with the rates, timelines and other terms as specified for the
            Services on the Website.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.10 </span>There are no transaction
            charges or monthly fees for the Services. We reserve the right to
            charge fees for the Services in the future, at our sole discretion.
            We will notify you before charging a fee for the Services by
            delivering notice to you electronically, by posting such fee on the
            Website, or by any other method permitted by applicable law. If you
            continue using the Services after such notice, you must pay all
            applicable fees for the Services.
          </p>
          <p className="mt-2">
            <span className=" text-black">3.11 </span>You may only use the
            Services for your own personal, non-commercial use and not on behalf
            of or for the benefit of any third party. Your use of the Services
            must comply with all applicable law. If your use of the Services is
            prohibited by applicable law, then you are not authorized to use the
            Services. We are not responsible if you use the Services in any
            manner that violates applicable law.
          </p>
        </div>

        <div id="4">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">4. </span>Acceptance of
            Terms and Conditions
          </h2>
          <p className="mt-2">
            <span className="text-black">4.1 </span> When you access our website
            at www.creditdirect.ng ("our website" or "this website") and/or our
            mobile applications ("our app" or "this app") as a User, you agree
            to be bound by the following Terms of Use.
          </p>
          <p className="mt-2">
            <span className="text-black">4.2 </span> You must carefully read and
            understand the Terms and Conditions set out in this Agreement before
            downloading the App or opening an Account with Credit Direct.
          </p>
          <p className="mt-2">
            <span className="text-black">4.3 </span>You will be deemed to have
            accepted the Terms and Conditions immediately upon your clicking the
            “Continue” button from the website or the App or any other button
            which signifies your acceptance of these Terms and Conditions and an
            intention to use our services. If you do not agree with the Terms
            and Conditions, please do not click “Continue”.
          </p>
          <p className="mt-2">
            <span className="text-black">4.4 </span>By downloading the App and
            opening a Yield account with Credit Direct, you agree to comply with
            and be bound by the Terms and Conditions governing the operation of
            the Account and you affirm that the Terms and Conditions herein are
            without prejudice to any other right that Credit Direct may have
            with respect to the Account in law or otherwise.
          </p>
          <p className="mt-2">
            <span className="text-black">4.5 </span>These Terms and Conditions
            may be amended or varied by Credit Direct from time to time and your
            continued use of the Services constitutes your agreement to be bound
            by the updated or varied terms. Credit Direct will take all
            reasonable measures to notify you of any changes.
          </p>
          <p className="mt-2">
            <span className="text-black">4.6 </span>From time to time, updates
            to the App may be issued. Depending on the update, you may not be
            able to use the Services until you have downloaded the latest
            version of the App and accepted any new terms and conditions.
          </p>
          <p className="mt-2">
            <span className="text-black">4.7 </span>If you use these Services,
            you consent to us and our affiliates and partners’ transmission,
            collection, retention, maintenance, processing and use of your data
            to determine our credit scoring services or to improve our Services
            and/or your experience while using the App.
          </p>
        </div>

        <div id="5">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">5. </span>Use of the
            Services
          </h2>
          <p className="mt-2">
            <span className="text-black">5.1 </span>The Services offered by
            Credit Direct can only be utilized by persons over the age of 18
            that are legally resident in Nigeria. To provide you with the
            Services, Credit Direct reserves the right to verify any information
            provided to us in this regard.
          </p>
          <p className="mt-2">
            <span className="text-black">5.2 </span>In order to use the
            Services, you must: (a) accept and agree to these Terms and our
            Privacy Policy; (b) register with us on the Website or our app; (c)
            provide all information requested by us, such as your name, email
            address, mobile device number, BVN, and such other information as we
            may request from time to time (collectively, “Personal
            Information”).
          </p>
          <p className="mt-2">
            <span className="text-black">5.3 </span>The Services may be provided
            by us or in partnership with other service providers including
            Payment Service Providers. You hereby acknowledge and accept that
            your use of the Services does not create any contractual
            relationship between you and any other party provider.
          </p>
          <p className="mt-2">
            <span className="text-black">5.4 </span>Credit Direct reserves the
            right to revoke any of the Services provided to you at any stage at
            Credit Direct’s sole and absolute discretion and without assigning
            any reason or giving any notice thereto.
          </p>
        </div>

        <div id="6">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">6. </span>Personal
            Information
          </h2>
          <p className="mt-2">
            <span className="text-black">6.1 </span>To meet our Know Your
            Customer (“KYC”) and Anti-Money Laundering, Combating Financing of
            Terrorism and Countering Proliferation Financing (“AML/CFT/CPF”)
            obligations, we may require you to provide any or all the following:
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.1 </span>Your full name
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.2 </span>Your date of birth
          </p>
          <p className="mt-2k">
            <span className="text-black">6.1.3 </span>Your Bank Verification
            Number ("BVN")
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.4 </span>Your National Identity
            Number (“NIN”)
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.5 </span>Your current residential
            address
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.6 </span>Your picture
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.7 </span>Copy of a valid Government
            issued ID (national ID, international passport, permanent voter’s
            card or driver’s license)
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.8 </span>Copy of recent utility
            bill, bank statement, or another bill dated within three months of
            our request, which carries your name and address.
          </p>
          <p className="mt-2">
            <span className="text-black">6.1.9 </span>Any other information or
            document we may require for our internal risk assessment (such as
            occupation, PEP status, source of income etc.)
          </p>
          <p className="mt-2">
            <span className="text-black">6.2 </span>You warrant that all
            information and documentation provided to us are true, correct, and
            accurate. You also undertake to notify us of any changes to the
            information or documentation which you have provided.
          </p>
          <p className="mt-2">
            <span className="text-black">6.3 </span>For our compliance purposes
            and in order to provide the Services to you, you hereby authorize us
            to, directly or through a third party, obtain, verify, and record
            information and documentation that helps us verify your identity and
            bank account information.
          </p>
          <p className="mt-2">
            <span className="text-black">6.4 </span>You hereby agree and
            authorize Credit Direct to verify information provided by you
            against the information held by any third party (including official
            databases) such as, banks, government agencies, Payment System
            Providers and any other information bank available to Credit Direct.
          </p>
          <p className="mt-2">
            <span className="text-black">6.5 </span>The information that Credit
            Direct may verify against the information which you have provided to
            us include (without limitation): your name, phone number,
            occupation, date of birth, address, age, Bank Verification Number
            (BVN), National Identification Number (“NIN”) or Passport Number and
            such other information that will enable Credit Direct to identify
            you and comply with the regulatory “Know Your Customer” requirements
            (together the “Personal Information”).
          </p>
          <p className="mt-2">
            <span className="text-black">6.6 </span>You hereby consent to Credit
            Direct verifying the Personal Information and using the Personal
            Information to the extent necessary in Credit Direct’s opinion for
            the provision of the Services
          </p>
          <p className="mt-2">
            <span className="text-black">6.7 </span>You hereby agree and
            authorize Credit Direct to obtain and procure your Personal
            Information from relevant sources (private and official databases)
            and you further agree and consent to the disclosure and provision of
            such Personal Information by us or our Third-Party Partners.
          </p>
          <p className="mt-2">
            <span className="text-black">6.8 </span>You agree to indemnify and
            hold Credit Direct and the Third-Party Partners harmless with
            respect to any claims, losses, liabilities, and expenses (including
            legal fees and expenses) that may arise as a result of the
            disclosure and reliance on such Personal Information.
          </p>
          <p className="mt-2">
            <span className="text-black">6.9 </span>You agree that your access
            to our Services may be limited where we have not completed the
            required customer due diligence or verification on your account.
            Your transaction may also be subject to such limits as may be
            applicable under our internal risk assessments or applicable
            Nigerian law based.
          </p>
          <p className="mt-2">
            <span className="text-black">6.10 </span>Credit Direct reserves the
            right to request further information from you pertaining to your use
            of the Services at any time. Failure to provide such information
            within the time required by Credit Direct may result in Credit
            Direct declining to accept your application for an Account or access
            to the Services.
          </p>
        </div>

        <div id="7">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">7. </span>Disclosure of
            Personal Information
          </h2>
          <p className="mt-2">
            <span className="text-black">7.1 </span>You agree that we have the
            right to share your personal information and any other information
            relating to you, your transactions and/or your Yield Account:
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.1 </span>with any of our affiliated
            companies and service providers;
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.2 </span>with financial service
            providers and non-financial companies, such as email service
            providers that perform marketing services on our behalf, and fraud
            prevention service providers that use the information to provide
            services to us;
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.3 </span>with a non-affiliated
            third-party to access and transmit your personal and financial
            information from a relevant financial institution. You grant the
            thirdparty the right, power, and authority to access and transmit
            this information according to terms of their privacy policy, where
            you subscribe to third-party services;
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.4 </span>with selected third
            parties including business partners for the performance of any
            contract we enter into with them or you and/or to complete a
            transaction with you;
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.5 </span>with third parties to whom
            we may choose to sell, transfer or merge parts of our business or
            our assets or give some or total control over our business or
            alternatively, acquire all or parts of their businesses;
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.6 </span>with relevant law
            enforcement officials or other third parties, such as regulators or
            auditors, if we believe it is appropriate to investigate fraud.
          </p>
          <p className="mt-2">
            <span className="text-black">7.1.7 </span>in compliance with
            applicable law, legal processes, regulatory guidelines and
            regulatory directives that require us to report or disclose
            information to a governmental body, regulatory authority or any
            other competent authority. We will make all mandatory disclosures on
            your account in respect to any transaction on your account as
            required by applicable law
          </p>
        </div>

        <div id="8">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">8. </span>Your Access
          </h2>
          <p className="mt-2">
            <span className="text-black">8.1 </span>In order to access certain
            features of this app or website, you must register to create an
            account ("User Account"). When you register, you will be asked to
            choose a password, which you will be required to use to access your
            User Account.
          </p>
          <p className="mt-2">
            <span className="text-black">8.2 </span>Credit Direct has physical,
            electronic and procedural safeguards that comply with regulatory
            standards to guard Users' and Clients' non-public personal
            information (see Privacy Policy). You are responsible for
            safeguarding your password and other User Account information.
          </p>
          <p className="mt-2">
            <span className="text-black">8.3 </span>You agree not to disclose
            your password to any third party, and you will notify Credit Direct
            Support immediately if your password is lost or stolen or if you
            suspect any unauthorized use of your User Account.
          </p>
          <p className="mt-2">
            <span className="text-black">8.4 </span>You agree not to authorize
            any other person or entity to use your username and password to
            access the Services. You are solely responsible for the maintenance,
            confidentiality, and security of your username, password and other
            Personal Information
          </p>
          <p className="mt-2">
            <span className="text-black">8.5 </span>Except as otherwise required
            by applicable law, you are responsible for all transactions and
            other activities authorized or performed using your username and
            password, whether authorized or unauthorized by you.
          </p>
          <p className="mt-2">
            <span className="text-black">8.6 </span>Except as otherwise
            expressly stated in these Terms or required by applicable law, we
            are not responsible for any losses arising from the loss or theft of
            your Personal Information or from unauthorized or fraudulent
            transactions associated with your bank account or your Yield
            Account. If you suspect or become aware of any unauthorized activity
            or access to your username, password, you must contact us
            immediately via phone: 0201448225, 02017005120, or 0700CREDITDIRECT;
            email at contact@creditdirect.ng; WhatsApp: 09070309420
          </p>
        </div>

        <div id="9">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">9. </span>Alerts,
            Notifications and Service Communications
          </h2>
          <p className="mt-2">
            By creating a Yield Account, you automatically sign up for various
            types of alerts via email and mobile notification. When logged in,
            you may customize, modify and in some cases deactivate alerts by
            adjusting the settings accordingly. We never include your password
            in these communications, but we may include your name, or email
            address and information about your account.You may unsubscribe from
            marketing-oriented emails at any time.
          </p>
        </div>

        <div id="10">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">10. </span> Intellectual
            Property Rights
          </h2>
          <p className="mt-2">
            <span className="text-black">10.1 </span> The Services and content
            (including without limitation, their text, graphics, images, logos
            and button icons, photographs, editorial content, notices,
            trademarks, trade names and/or service marks, and all materials
            incorporated) are protected by copyright, trademark, patent, and
            other intellectual property laws. We expressly reserve all rights
            and remedies under applicable law.
          </p>
          <p className="mt-2">
            <span className="text-black">10.2 </span>Except as expressly
            provided by these Terms or with our prior written consent, you may
            not use, modify, disassemble, decompile, reverse engineer,
            reproduce, distribute, rent, sell, license, publish, display,
            download, transmit, or otherwise exploit any content in any form by
            any means.
          </p>
          <p className="mt-2">
            <span className="text-black">10.3 </span>We do not grant you any
            licenses, express or implied, to our intellectual property or the
            intellectual property of our licensors, except as expressly stated
            in these Terms. We and our third-party licensors retain all right,
            titles, and interest in and to the Services, content, and any
            associated patents, trademarks, copyrights, mask work rights, trade
            secrets, and other intellectual property rights.
          </p>
        </div>

        <div id="11">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">11. </span>Users
            Obligations
          </h2>
          <span className="mt-2">You agree you will:</span>
          <p className="mt-2">
            <span className="text-black">11.1 </span> Comply with all applicable
            laws, including, without limitation, privacy laws, intellectual
            property laws, anti-spam laws, export control laws, tax laws, and
            regulatory requirements;
          </p>
          <p className="mt-2">
            <span className="text-black">11.2 </span> Provide accurate
            information to us, whether reported directly or through a third
            party who you authorize, and keep it updated;
          </p>
          <p className="mt-2">
            <span className="text-black">11.3 </span> Use the services solely
            for your personal, non-commercial use;
          </p>
          <p className="mt-2">
            <span className="text-black">11.4 </span> Provide accurate and
            complete information about yourself for your profile and keep your
            password confidential;
          </p>
          <p className="mt-2">
            <span className="text-black">11.5 </span> Use the Services in a
            professional manner
          </p>
        </div>

        <div id="12">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">12. </span>Exclusion to
            Users Obligations
          </h2>
          <span className="mt-2">You agree you will not:</span>
          <p className="mt-2">
            <span className="text-black">12.1 </span> Circumvent, disable, or
            otherwise interfere with security-related features of this app or
            our website or features that prevent or restrict use or copying of
            any content or User information;
          </p>
          <p className="mt-2">
            <span className="text-black">12.2 </span> Upload, email, transmit,
            provide, or otherwise make available:
          </p>
          <p className="mt-2">
            <span className="text-black">12.2.1 </span> any User information
            which you do not have the lawful right to use, copy, transmit,
            display, or make available (including any User information that
            would violate any confidentiality or fiduciary obligations that you
            might have with respect to the User information); or
          </p>
          <p className="mt-2">
            <span className="text-black">12.2.2 </span> any User information
            that infringes the intellectual property rights of, or violates the
            privacy rights of, any third-party (including without limitation
            copyright, trademark, patent, trade secret, or other intellectual
            property rights, moral right, or right of publicity); or
          </p>
          <p className="mt-2">
            <span className="text-black">12.2.3 </span> unsolicited or
            unauthorized advertising, promotional materials, junk mail, spam,
            chain letters, pyramid schemes, or any other form of solicitation;
            or
          </p>
          <p className="mt-2">
            <span className="text-black">12.2.4 </span> any personal information
            that is unlawful, obscene, harmful, threatening, harassing,
            defamatory, or hateful, or that contain objects or symbols of hate,
            invade the privacy of any third-party, contain nudity, are
            deceptive, threatening, abusive, inciting of unlawful action, or are
            otherwise objectionable in the sole discretion of Credit Direct; or
          </p>
          <p className="mt-2">
            <span className="text-black">12.2.5 </span> any personal information
            that contains software viruses or any other computer code, files, or
            programs designed to (i) interrupt, destroy, or limit the
            functionality of any computer software; or (ii) interfere with the
            access of any user, host or network, including without limitation
            overloading, flooding, spamming, mail-bombing, or sending a virus to
            this app or our website; or
          </p>
          <p className="mt-2">
            <span className="text-black">12.2.6 </span> any personal information
            that includes code that is hidden or otherwise surreptitiously
            contained within the User information;
          </p>
          <p className="mt-2">
            <span className="text-black">12.3 </span> Use any meta tags or other
            hidden text or metadata utilizing a Credit Direct name, trademark,
            URL or product name;
          </p>
          <p className="mt-2">
            <span className="text-black">12.4 </span> Forge any TCP/IP packet
            header or any part of the header information in any posting, or in
            any way use this app or our website to send altered, deceptive, or
            false source-identifying information;
          </p>
          <p className="mt-2">
            <span className="text-black">12.5 </span> Interfere with or disrupt
            (or attempt to interfere with or disrupt) any Credit Direct web
            page, server, or network, or the technical delivery systems of
            Credit Direct’s providers, or disobey any requirements, procedures,
            policies, or regulations of networks connected to this app or our
            website.
          </p>
          <p className="mt-2">
            <span className="text-black">12.6 </span> Attempt to probe, scan, or
            test the vulnerability of any Credit Direct system or network or
            breach or impair or circumvent any security or authentication
            measures protecting this app or our website;
          </p>
          <p className="mt-2">
            <span className="text-black">12.7 </span>Attempt to decipher,
            decompile, disassemble, or reverse-engineer any of the software used
            to provide this app or our website;
          </p>
          <p className="mt-2">
            <span className="text-black">12.8 </span> Attempt to access, search,
            or meta-search this app or our website or content thereon with any
            engine, software, tools, agent, device, or mechanism other than
            software and/or search agents provided by this app or our website or
            other generally available third- party web browsers, including
            without limitation any software that sends queries this app or our
            website to determine how a website or web page ranks;
          </p>
          <p className="mt-2">
            <span className="text-black">12.9 </span> Violate these terms of use
            or any other rule or agreement applicable to you or Credit Direct’s
            inclusion in, reference to, or relationship with any third party or
            third-party site or service, or your use of any such third-party
            site or service;
          </p>
          <p className="mt-2">
            <span className="text-black">12.10 </span> Collect or store personal
            information about other users without their express permission;
          </p>
          <p className="mt-2">
            <span className="text-black">12.11 </span> Impersonate or
            misrepresent your affiliation with any person or entity, through
            pretexting or some other form of social engineering, or commit
            fraud;
          </p>
          <p className="mt-2">
            <span className="text-black">12.12 </span> Solicit any User for any
            investment or other commercial or promotional transaction;
          </p>
          <p className="mt-2">
            <span className="text-black">12.13 </span>Violate any applicable
            law, regulation, or ordinance;
          </p>
          <p className="mt-2">
            <span className="text-black">12.14 </span> Scrape or copy
            information through any means (including crawlers, browser plugins
            and add-ons, and any other technology or manual work);
          </p>
          <p className="mt-2">
            <span className="text-black">12.15 </span>Use, launch, or permit to
            be used any automated system, including without limitation "robots,"
            "crawlers," or "spiders"; or
          </p>
          <p className="mt-2">
            <span className="text-black">12.16 </span> Copy or use the
            information, content or data on this app or our website in
            connection with a competitive service (as determined by Credit
            Direct);
          </p>
          <p className="mt-2">
            <span className="text-black">12.17 </span> Monitor this app’s or our
            website’s availability, performance or functionality for any
            competitive purposes;
          </p>
          <p className="mt-2">
            <span className="text-black">12.18 </span> Use this app or our
            website or content thereon in any manner not permitted by these
            Terms of Use;
          </p>
        </div>

        <div id="13">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">13. </span>Statements
          </h2>
          <p className="mt-2">
            <span className="text-black">13.1 </span>A statement and activity
            report in respect of your Yield account will be made available on
            Request. Requests shall be made via our e-mail address at
            contact@creditdirect.ng or via a contact link on the App or website.
          </p>
          <p className="mt-2">
            <span className="text-black">13.2 </span> The statement on the App
            or website shall provide details of your recent transactions in your
            Yield account.
          </p>
          <p className="mt-2">
            <span className="text-black">13.3 </span>Our statement will show all
            transactions carried out from your Yield account. You must check
            your statement carefully and notify Credit Direct as soon as
            possible, and no later than 48 hours after receipt of your
            statement, if it includes any transaction or other entry which
            appears to you to be wrong or not made in accordance with your
            instructions.
          </p>
          <p className="mt-2">
            <span className="text-black">13.4 </span> Credit Direct, may without
            notice to you, rectify discrepancies, add or alter the entries in
            your statement to reflect the accurate position of your
            transactions.
          </p>
          <p className="mt-2">
            <span className="text-black">13.5 </span> Save for a manifest error,
            a statement issued to you in respect of your Yield account shall be
            conclusive evidence of the transactions carried out on your Yield
            account for the period covered in the statement.
          </p>
        </div>

        <div id="14">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">14. </span>Anti-Money
            Laundering, Combating the Financing of Terrorism and Countering
            Proliferation Financing (AML/CFT/CPF)
          </h2>
          <p className="mt-2">
            <span className="text-black">14.1 </span>To comply with relevant
            AML/CFT/CPF obligations, we may request information on the
            transactions carried out on your Account such as (a) details of the
            recipient (b) source of funds being transferred (c) purpose of the
            transfer or payment being made. You confirm that you will provide
            all requested information required in respect of the transaction in
            this regard.
          </p>
          <p className="mt-2">
            <span className="text-black">14.2 </span> The movement of money
            through the Credit Direct’s system which is or which forms part of
            the proceeds of any crime or which is intended to facilitate, aid or
            finance the commission of any crime is expressly prohibited
          </p>
          <p className="mt-2">
            <span className="text-black">14.3 </span>Credit Direct will monitor
            and report any suspicious activity or transaction to its Chief
            Compliance Officer who may eventually escalate the suspicious
            activity or transaction to the relevant law enforcement authority.
          </p>
          <p className="mt-2">
            <span className="text-black">14.4 </span>You also agree that we may
            cancel any transaction, suspend your Account or refuse to open an
            Account in your name if you refuse to provide the requested
            information or if any information provided is untrue or inaccurate.
          </p>
          <p className="mt-2">
            <span className="text-black">14.5 </span> Please note that for
            certain transactions, we or our Third-Party Partners may be required
            to file AML/CFT/CPF or related reports (without notice to you) with
            the relevant regulators. These reports may include details of your
            Personal Information, transactions, investment activity, operation
            or proposed operation of the account or any of our Services.
          </p>
        </div>

        <div id="15">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">15. </span>Due Diligence
            and Audit Rights
          </h2>
          <p className="mt-2">
            <span className="text-black">15.1 </span>We operate an anti-money
            laundering compliance program and reserve the right to perform due
            diligence checks on all Users of the Website.
          </p>
          <p className="mt-2">
            <span className="text-black">15.2 </span> You agree to provide to us
            all such information and documentation as we may require: in order
            to verify your adherence to, and performance of, your obligations
            under these Terms; for the purpose of disclosures pursuant to a
            valid order by a court or other governmental body; or as otherwise
            required by law or applicable regulation.
          </p>
        </div>

        <div id="16">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">16. </span>Provisions
            applicable to Investment
          </h2>
          <p className="mt-2">
            <span className="text-black">16.1 </span> All interest earned on the
            investment are subject, at the point of payment or withdrawal, to
            applicable taxes including withholding tax.
          </p>
          <p className="mt-2">
            <span className="text-black">16.2 </span> The minimum amount on
            Investment shall be as indicated on the App or website.
          </p>
          <p className="mt-2">
            <span className="text-black">16.3 </span> We may decline your
            request to open or operate an Investment Account with us at any
            time.{" "}
          </p>
          <p className="mt-2">
            <span className="text-black">16.4 </span> You agree to pay the
            penalty for early liquidation in connection with the Investment as
            shall be notified to you through the App.
          </p>
          <p className="mt-2">
            <span className="text-black">16.5 </span> You authorize the Company
            to deduct from your Account (without reference to you) any
            Transaction Fee and all other fees expenses and taxes, duties,
            impositions and expenses incurred in relation to your use of the
            Services.
          </p>
        </div>

        <div id="17">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">17. </span> Disclosures
          </h2>
          <p className="mt-2">
            <span className="text-black">17.1 </span> You have read, understood
            and agree to comply with these terms and conditions and any other
            specific terms and conditions necessary for the Services as may be
            amended from time to time
          </p>
          <p className="mt-2">
            <span className="text-black">17.2 </span>You confirm that you have
            received all the information regarding the Services and, before
            accepting these terms and conditions, sought independent advice and
            clarification from persons other than Credit Direct’s employees or
            agents. The User further confirms that sufficient time was provided
            to consider the terms and conditions prior to acceptance.
          </p>
          <p className="mt-2">
            <span className="text-black">17.3 </span> Credit Direct makes no
            representation regarding the likelihood or probability that any
            actual or proposed financial offerings will in fact achieve a
            particular outcome or goal. You are advised to note that past or
            historic performances may not be an accurate depiction of future
            performance or returns.
          </p>
          <p className="mt-2">
            <span className="text-black">17.4 </span> Credit Direct disclaims
            and will not be liable for any indirect, incidental, consequential,
            special or punitive damages (including loss of profits, opportunity
            cost of returns, etc.) arising out of your decision to place your
            funds whether or not the circumstances surrounding such decision
            were made available to us.
          </p>
        </div>

        <div id="18">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">18. </span> Notices
          </h2>
          <p className="mt-2">
            <span className="text-black">18.1 </span> If we contact you
            regarding an alleged unauthorized or fraudulent activity involving
            your account, it is required that you respond to any communications
            from us within 1 (one) Business Day of receiving our communications.
            This includes providing any requested information or evidence
            relating to the alleged unauthorized or fraudulent activity.
          </p>
          <p className="mt-2">
            <span className="text-black">18.2 </span>If we have to contact you
            or give you notice in writing, we may do so by posting such notice
            on our website; the App, by e-mail or SMS to the mobile phone number
            or e-mail address you provided to us.
          </p>
          <p className="mt-2">
            <span className="text-black">18.3 </span> Unless proven otherwise by
            you, all our communications shall be deemed to have been received by
            you at the time they are sent by us.
          </p>
          <p className="mt-2">
            <span className="text-black">18.4 </span> If you wish to contact us,
            or if any condition in these Terms and Conditions requires you to
            give notice to Credit Direct, you may send such communication to us
            by e-mail to{" "}
            <span className="underline text-[#B0E0E6]">
              contact@creditdirect.ng
            </span>{" "}
            or to such e-mail address that may be communicated to you from time
            to time. We will confirm receipt of this by contacting you in
            writing by e-mail.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">18.4 </span>To the extent permitted by
            applicable law, you consent to use electronic signatures and to
            electronically receive all records, notices, statements,
            communications, and other items for all services provided to you
            under these Terms and in connection with your relationship with us.
          </p>
        </div>

        <div id="19">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">19. </span> Indemnity
          </h2>
          <p className="mt-2">
            <span className="text-black">19.1 </span>You hereby indemnify Credit
            Direct (including its directors, employees, partners, Third Party
            Partners, Agents, and affiliates) and hold it harmless against any
            action, demand, claim, loss, charge, damage, expense, or fees
            (actual or consequential) including attorney and accounting fees,
            which Credit Direct may suffer or incur as a result of:
          </p>
          <p className="mt-2">
            <span className="text-black">19.1.1 </span> your access and use of
            the Services and App;
          </p>
          <p className="mt-2">
            <span className="text-black">19.1.2 </span> a breach of these Terms
            and Conditions;
          </p>
          <p className="mt-2">
            <span className="text-black">19.1.3 </span> your provision of
            incorrect, incomplete, wrong or false information;
          </p>
          <p className="mt-2">
            <span className="text-black">19.1.4 </span> acting on your Requests;
            and/or
          </p>
          <p className="mt-2">
            <span className="text-black">19.1.5 </span> third party claims
            relating to your use of the Services including but not limited to
            matters relating to infringement of copyright, trademark, trade name
            or other intellectual property.{" "}
          </p>
          <p className="mt-2">
            <span className="text-black">19.2 </span>On no account will Credit
            Direct or any of the indemnified persons above be liable for any
            demand, claim, loss or damage which you may sustain:
          </p>
          <p className="mt-2">
            <span className="text-black">19.2.1 </span> On acting in accordance
            with your Requests or Requests purported to be from you;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.2.2 </span>from the malfunction or
            failure or unavailability of any hardware, software, or equipment,
            the loss or destruction of any data, power failures, corruption of
            storage media, natural phenomena, riots, acts of vandalism,
            sabotage, terrorism, any other event beyond Credit Direct’s control,
            interruption or distortion of communication links or arising from
            reliance on any person or any incorrect, illegible, incomplete or
            inaccurate information or data contained in any Request received by
            Credit Direct;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.2.3 </span>any unauthorized access
            to your Account or any breach of security or any destruction or
            accessing of your data or any destruction or theft of or damage to
            any of your device
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.2.4 </span>or loss or damage
            occasioned by the failure or unavailability of third-party
            facilities or systems or the inability of a third party to process a
            transaction;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.2.5 </span> any claims where the
            circumstance is within your control.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.3 </span> At our request, you agree
            to defend, indemnify, and hold harmless Credit Direct, its
            affiliates and their respective employees, officers, directors,
            agents, partners, representatives and third-party service providers
            from and against any and all claims, suits, liabilities, damages
            (whether actual, consequential, punitive or exemplary), losses,
            fines, penalties, costs, and expenses (including reasonable
            attorneys’ fees) arising from or in any way related to any
            third-party claims relating to your use of the Services, violation
            of these Terms, applicable law or any third-party rights, your fraud
            or willful misconduct. Such indemnified parties reserve the right to
            assume the exclusive defense and control of any matter subject to
            indemnification by you, in which event you will cooperate in
            asserting any available defenses.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.4 </span> You agree that in addition
            to any general lien or similar right to which we may be entitled in
            law, we may at any time, set off or transfer any funds in your Yield
            account in or towards satisfaction of any claim made against us or
            loss suffered by us as a result of or related to such transactions
            described in the preceding paragraph, any third-party claims
            relating to your use of the Services, violation of these Terms,
            applicable law or any third-party rights, your fraud or willful
            misconduct.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">19.5 </span> You agree that your
            indemnity obligations in these Terms shall not be reduced by any
            claim by you against Credit Direct, any of its affiliates or their
            respective employees, officers, directors, agents, partners,
            representatives and/or third-party service providers.
          </p>
        </div>

        <div id="20">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">20. </span> Disclaimer
            Warranties
          </h2>
          <p className="mt-2">
            <span className="text-black">20.1 </span>To the fullest extent
            permitted by applicable law and except as otherwise expressly
            provided in these terms, you expressly understand and agree that
            your use of the Services and all information, products, and other
            content (including that of third parties) included in or accessible
            from the services is at your sole risk. the services are provided on
            an “as is” and “as available” basis without any warranty of any kind
            from Credit Direct.
          </p>
          <p className="mt-2">
            <span className="text-black">20.2 </span>Credit Direct disclaims any
            warranties, express or implied:
          </p>
          <p className="mt-2">
            <span className="text-black">20.2.1 </span> regarding the
            availability, security, accuracy, reliability, timeliness and
            performance of this app and our website, their content and/or user
            information;
          </p>
          <p className="mt-2">
            <span className="text-black">20.2.2 </span> that this app and our
            website will be error-free or that any errors will be corrected.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">20.2.3 </span>that this app and our
            website will be free from electronic viruses; or
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">20.2.4 </span>regarding the performance
            of or accuracy, quality, currency, completeness, or usefulness of
            any information provided by this app or our website including but
            not limited to information obtained through social media.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">20.3 </span>No advice or information
            you obtain from this app or our website shall create any warranty
            not expressly stated in this Agreement. If you choose to rely on
            such information, you do so solely at your own risk.
          </p>
          <p className="mt-2">
            <span className="text-black">20.4 </span>Any material downloaded or
            otherwise obtained through the Services is done at your own
            discretion and risk, and you are solely responsible for any damage
            to your computer system or loss of data that results from the
            download of any such material.
          </p>
        </div>

        <div id="21">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">21. </span>Limitation of
            Liability
          </h2>
          <p className="mt-2">
            <span className="text-black">21.1 </span>In no event shall Credit
            Direct or any of its officers, directors, employees, or agents be
            liable to you for any damages whatsoever, including without
            limitation indirect, incidental, special, punitive, or consequential
            damages, arising out of or in connection with your use of this app
            or our website, their content and/or user information, including but
            not limited to the quality, accuracy, or utility of the information
            provided as part of or through this app or for any investment
            decisions made on the basis of such information, whether the damages
            are foreseeable and whether or not credit direct has been advised of
            the possibility of such damages. The foregoing limitation of
            liability shall apply to the fullest extent permitted by law in the
            applicable jurisdiction.
          </p>
          <p className="mt-2">
            <span className="text-black">21.2 </span>To the fullest extent
            permitted by applicable law, you agree that credit direct, its
            affiliates and their respective employees, officers, directors,
            agents, partners, representatives and third-party service providers
            will not be liable to you or any third party for:
          </p>
          <p className="mt-2">
            <span className="text-black">21.2.1 </span> the performance of the
            services or the inability to use the services
          </p>
          <p className="mt-2">
            <span className="text-black">21.2.2 </span> Any indirect,
            incidental, special, consequential, punitive, or exemplary damages,
            whether based in contract, tort, or otherwise, including, but not
            limited to, damages for loss of profits, goodwill, use, data, or
            other intangible losses, even if such persons have been advised of
            the possibility of such damages, which arise out of or are in any
            way connected with these terms, the services, or content; or
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">21.2.3 </span>any defect or fault in
            the App or any Service resulting from you having altered or modified
            the App
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">21.2.4 </span>any defect or fault in
            the App resulting from you having used the App in breach of the
            terms of this Agreement
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">21.2.5 </span>unavailability of
            sufficient funds in your Account
          </p>
          <p className="mt-2">
            <span className="text-black">21.2.6 </span>the money in your Account
            being subject to investigations, lien, legal process or other
            encumbrance restricting payments or transfers thereof; your failure
            to give proper or complete instructions for payments or transfers
            relating to your Account
          </p>
          <p className="mt-2">
            <span className="text-black">21.2.7 </span>any fraudulent or illegal
            use of the Services
          </p>
          <p className="mt-2">
            <span className="text-black">21.3 </span>Under no circumstances
            shall Credit Direct be liable to you for any loss of profit or for
            any indirect or consequential loss or damage of whatever kind,
            howsoever caused, arising out of or in connection with the Services
            even where the possibility of such loss or damage is notified to
            Credit Direct.
          </p>
          <p className="mt-2">
            <span className="text-black">21.4 </span>Due to the Nigeria
            Inter-bank Settlement System (NIBBS), payments may be delayed. Thus,
            we shall not be liable for any delayed payments. We shall not bear
            any liability for inability to complete a payment instruction
            because of inaccurate or insufficient payment instructions, or the
            failure of the recipient or bank to claim the payment, or because
            either you or the recipient did not provide any requested
            information, or we or the issuing banks are unable to verify your
            identity or the identity of the recipient to our satisfaction.
          </p>
          <p className="mt-2">
            <span className="text-black">21.5 </span>While we may provide
            indicative interest rates/returns with respect to certain plan via
            the website, you recognize and accept that there may be loss or
            depreciation of the value of any assets due to the fluctuation of
            market values, and accordingly the value of assets/interest rates
            (as applicable) in your yield account may or decrease based on
            prevailing market circumstances. You represent that we have not made
            any guarantee, either oral or written, that your objective will be
            achieved or that the value of any assets invested in through your
            Yield account will not decline.
          </p>
          <p className="mt-2">
            <span className="text-black">21.6 </span>Any event beyond our
            reasonable control.
          </p>
        </div>

        <div id="22">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">22. </span>Breach of
            these terms
          </h2>
          <p className="mt-2">
            <span className="text-black">22.1 </span>In the event of a breach of
            these Terms, or a reasonable suspicion that you have breached these
            Terms in any way, Credit Direct may:
          </p>
          <p className="mt-2">
            <span className="text-black">22.1.1 </span>temporarily suspend your
            access to our Services;
          </p>
          <p className="mt-2">
            <span className="text-black">22.1.2 </span>permanently prohibit you
            from accessing our Services;
          </p>
          <p className="mt-2">
            <span className="text-black">22.1.3 </span> block computers using
            your IP address from accessing our Services;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">22.1.4 </span>contact any or all of
            your internet service providers and request that they block your
            access to our Services;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">22.1.5 </span>delete your Yield
            Account; and/or
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">22.1.6 </span>commence legal action
            against you, whether for breach of contract or otherwise.
          </p>
        </div>

        <div id="23">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">23. </span>Variation and
            Termination
          </h2>
          <p className="mt-2">
            <span className="text-black">23.1 </span>Credit Direct may at any
            time, upon notice to you, terminate or vary its business
            relationship with you and close your Account.
          </p>
          <p className="mt-2">
            <span className="text-black">23.2 </span>Without prejudice to Credit
            Direct’s rights under clause 18.1, Credit Direct may at its sole
            discretion suspend or close your Account:
          </p>
          <p className="mt-2">
            <span className="text-black">23.2.1 </span>if you use the Account
            for unauthorized purposes or where Credit Direct detects any
            abuse/misuse, breach of content, fraud or attempted fraud relating
            to your use of the Services;
          </p>
          <p className="mt-2">
            <span className="text-black">23.2.2 </span> if Credit Direct is
            required or requested to comply with an order or instruction of or a
            recommendation from the government, court, regulator or other
            competent authority;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.2.3 </span>if we are unable to
            verify or authenticate any information you provide to us; or we deem
            it fit for any reason and at any time, in our interest and that of
            other third parties.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.2.4 </span>if Credit Direct
            reasonably suspects or believes that you are in breach of these
            Terms and Conditions which you fail to remedy (if remediable) within
            5 days after the service of notice by email, SMS or other electronic
            means requiring you to do so;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.2.5 </span>where such a suspension
            or variation is necessary as a consequence of technical problems or
            for reasons of safety; to facilitate update or upgrade the contents
            or functionality of the Services from time to time; or where your
            Account becomes inactive or dormant;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.2.6 </span>where the Services are
            being used for any illegal, fraudulent or suspicious activity;
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.2.7 </span>if Credit Direct decides
            to suspend or cease the provision of the Services for commercial
            reasons or for any other reason as it may determine in its absolute
            discretion; or
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.3 </span>Such termination shall
            however not affect any accrued rights and liabilities of either
            party.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.4 </span>If Credit Direct receives
            notice of your demise, Credit Direct will not be obliged to allow
            any operation or withdrawal from your Account by any person except
            upon production of administration letters from a competent authority
            or confirmed grant of letters of administration or confirmed grant
            of probate by your legal representatives duly appointed by a court
            of competent jurisdiction.
          </p>
          <p className="mt-2">
            {" "}
            <span className="text-black">23.5 </span>Where we suspend, prohibit
            or block your access to our Services you must not take any action to
            circumvent such suspension or prohibition or blocking (including
            without limitation creating and/or using a different account).
          </p>
        </div>

        <div id="24">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">24. </span>Entire
            Agreement
          </h2>
          <p className="mt-2">
            <span className="text-black">24.1 </span>These Terms and Conditions,
            our Privacy Policy as well as such additional terms as may be made
            available to you on our App or website, constitute the entire
            agreement between You and us supersede and extinguish all previous
            agreements, promises, assurances, warranties, representations and
            understandings between us, whether written or oral, relating to its
            subject matter.
          </p>
          <p className="mt-2">
            <span className="text-black">24.2 </span>You acknowledge that in
            entering into this Agreement you have not relied on any statement,
            representation, assurance or warranty (whether made innocently or
            negligently) that is not set out in these Terms and Conditions or
            our Privacy Policy or on the App or website.
          </p>
        </div>

        <div id="25">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">25. </span>Assignment
          </h2>
          <p className="mt-2">
            <span className="text-black">25.1 </span>You may not transfer,
            assign, or delegate these Terms or your rights or obligations
            hereunder or your Yield Account in any way (by operation of law or
            otherwise) without our prior written consent. This Agreement and any
            rights or liabilities accruing thereunder may not be assigned by you
            to any other person.
          </p>
          <p className="mt-2">
            <span className="text-black">25.2 </span>Credit Direct reserves the
            right to transfer or assign its rights and obligations under this
            Agreement to another person. We may notify You if such transfer
            results in a change that may affect your Services.
          </p>
        </div>

        <div id="26">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">26. </span>Severability
          </h2>
          <p className="mt-2">
            If any provision or part of a provision of this Agreement is found
            by any court of competent jurisdiction to be, invalid or
            unenforceable, such invalidity or unenforceability shall not affect
            the other provisions or parts of such provisions of this Agreement,
            all of which shall remain in full force and effect.
          </p>
        </div>

        <div id="27">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">27. </span>Waiver
          </h2>
          <p className="mt-2">
            <span className="text-black">27.1 </span>A partial exercise of any
            right, power or remedy shall not preclude any further or other
            exercise of that, or any other, right, power or remedy.
          </p>
          <p className="mt-2">
            <span className="text-black">27.2 </span>No failure by Credit Direct
            to exercise, and no delay in exercising any right or remedy in
            respect of any provision of this Agreement shall operate as a waiver
            of such right or remedy.
          </p>
        </div>

        <div id="28">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">28. </span>Force Majeure
          </h2>
          <p className="mt-2">
            Credit Direct shall not be liable for any delay or failure to
            perform any obligation as required by these Terms as a result of any
            cause or condition including but not limited to, an act of God,
            epidemic, pandemic, acts of civil or military authorities, national
            or local emergency, acts of terrorists, acts or omissions of
            Government including directives from a regulatory authority, civil
            disturbance, war, strike or other labour dispute, fire, explosion,
            interruption in telecommunications or internet services or network
            provider services, of equipment and/or software or any other
            occurrence which is beyond our reasonable control.
          </p>
        </div>

        <div id="29">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">29. </span>Governing Law
          </h2>
          <p className="mt-2">
            These Terms are made under and will be governed by and construed in
            accordance with the laws of the Federal Republic of Nigeria.
          </p>
        </div>

        <div id="30">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">30. </span>Dispute
            Resolution
          </h2>
          <p className="mt-2">
            In the event of any dispute including but not limited to the
            interpretation of our legal polices as related to the Services
            (Terms and Conditions and Privacy Policy) or dissatisfaction with
            our services, you are encouraged to attempt amicable means of
            resolving the same by sending us a formal notification of dispute.
            In the event the resolution outcome or timeline is unsatisfactory,
            such dispute shall be resolved via Mediation and the decisions
            therefrom shall be upheld as consent judgment, failing which parties
            shall then submit to the exclusive jurisdiction of the Courts of the
            Federal Republic of Nigeria as a final resort.
          </p>
        </div>

        <div id="31">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">31. </span>Miscellaneous
          </h2>
          <p className="mt-2">
            <span className="text-black">31.1 </span>These Terms, together with
            our Privacy Policy, constitute the entire and sole agreement between
            you and us with respect to the Services and supersedes all prior
            understandings, arrangements, or agreements, whether written or
            oral, regarding the Services.
          </p>
          <p className="mt-2">
            <span className="text-black">31.2 </span>We reserve the right,
            subject to applicable law, to deliver to you any notice of changes
            to existing terms or the addition of new terms by posting an updated
            version of these Terms on the Website or delivering notice thereof
            to you electronically. You are free to decide whether or not to
            accept a revised version of these Terms, but accepting these Terms,
            as revised, is required for you to continue accessing or using the
            Services. If you do not agree to these Terms or any revised version
            of these Terms, your sole recourse is to terminate your access or
            use of the Services. Except as otherwise expressly stated by us,
            your access and use of the Services are subject to and constitute
            your acceptance of the version of these Terms in effect at the time
            of your access or use.
          </p>
        </div>

        <div id="32">
          <h2 className="mt-3 font-bold text-black">
            <span className="font-semibold text-black">32. </span>Feedback and
            Contact
          </h2>
          <p className="mt-2">
            If you have any questions, complaints, feedback comments, or
            concerns regarding these Terms or the Services, please contact us
            via phone: 0201448225, 02017005120, or 0700CREDITDIRECT; email at{" "}
            <span className="underline text-[#B0E0E6]">
              contact@creditdirect.ng;
            </span>{" "}
            WhatsApp: 09070309420.When you contact us, please provide us with
            the relevant information we need to verify your account
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

export const Componet = TermsAndConditions;
