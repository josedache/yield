import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPage = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto landingPagecontainer px-6 py-16 sm:py-32 lg:px-8">
        <div className="mx-auto text-center px-16 py-8">
          <Typography className="text-4xl font-bold tracking-tight text-[#042A2B] sm:text-6xl">
            Frequently Asked Questions (FAQs)
          </Typography>
        </div>
        <div className="mt-10 md:mt-28">
          <dl className="space-y-8 sm:grid md:grid-cols-2 md:gap-x-6 sm:gap-y-5 sm:space-y-0 lg:gap-x-10">
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                }}
                className="border-0 border-b bg-transparent rounded-none  "
              >
                <AccordionSummary
                  key={faq.question}
                  expandIcon={<ExpandMoreIcon className="text-neutral-500" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className=" text-base/7 font-medium text-primary-main sm:pb-2 px-0 "
                >
                  <span className="w-5/6 sm:w-full font-medium">
                    {faq.question}
                  </span>
                </AccordionSummary>
                <AccordionDetails className="-mt-7 text-base/7 text-neutral-500 px-0">
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

export const Component = FAQPage;

const faqs = [
  {
    question: "How can I add funds to my Yield plan?",
    answer: "The preferred method is bank transfer using paystack.",
  },
  {
    question: "How much interest can I get from Yield?",
    answer:
      "For a Yield plan of 12 months, you will get impressive returns of 20% per annum, which is way more than you would get from a traditional savings account or other savings plan.",
  },
  {
    question: "When can I expect my money after withdrawal?",
    answer: "Your account will be funded within 24 hours after withdrawal.",
  },
  {
    question: "Can I access my money whenever I need it?",
    answer:
      "Absolutely! You're free to withdraw funds from your Flex Yield or Fixed Yield at any time",
  },
  {
    question: "Is there a specific time I can withdraw my money?",
    answer: "Nope! Withdraw whenever it suits you, day or night.",
  },
  {
    question: " How much do I need to create a Yield plan?",
    answer: "Start small with N50,000 or go big with up to N10,000,000.",
  },
  {
    question: " Can I liquidate my Yield plan through the online portal?",
    answer:
      "Yes, you can easily liquidate your plan yourself, through the online portal.",
  },

  {
    question: "What is the shortest and longest plan I can create?",
    answer:
      "You can keep your money in Yield for as little as 1 month, or as long as 12 months.",
  },
  {
    question: "Is there any penalty charge for early withdrawal?",
    answer:
      "You can withdraw up to 4 times without any penalty charges on your Flex Yield, but there is a 30% deduction on your accrued interest when you liquidate your Fixed Yield before maturity.",
  },
  {
    question:
      "How do we get in touch with the support team for issue resolution?",
    answer:
      "For prompt support, you can contact our Customer Experience (CX) team via phone: 0700CREDITDIRECT, 0201448225, 02017005120.",
  },
];
