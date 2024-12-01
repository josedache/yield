import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import GradientBackground from "../../../assets/imgs/Gradient.png";
import YieldFlower from "../../../assets/svgs/flower.svg";

const FaqSection = () => {
  const faqs = [
    {
      question: "How can I add funds to my Yield plan?",
      answer: "The preferred method is bank transfer using paystack.",
    },
    {
      question: "Is there a specific time I can withdraw my money?",
      answer: "Nope! Withdraw whenever it suits you, day or night.",
    },
    {
      question: "Is there any penalty charge for early withdrawal?",
      answer:
        "You can withdraw up to 4 times without any penalty charges on your Flex Yield, but there is a 30% deduction on your accrued interest when you liquidate your Fixed Yield before maturity.",
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
      question: "What is the shortest and longest plan I can create?",
      answer:
        "You can keep your money in Yield for as little as 1 month, or as long as 12 months.",
    },
  ];
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <div>
      <div className="mx-auto landingPagecontainer px-6 py-14 sm:pt-16 lg:px-4 xl:px-0 lg:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 lg:px-6 text-center md:text-start">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-pretty text-base/7 text-gray-600">
              Everything you need to know about Yield.
            </p>
            <Button
              href="/FAQs"
              className="hidden lg:block font-medium text-primary-main hover:text-primary-dark bg-transparent px-0 underline text-lg mt-5"
            >
              View All FAQs
            </Button>
          </div>
          <div className="mt-10 lg:col-span-6 lg:mt-0 ">
            <dl className="space-y-3 sm:space-y-6 border-none xl:ml-10">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  elevation={0}
                  expanded={expanded === `panel-${index}`}
                  onChange={handleChange(`panel-${index}`)}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                  className="border-0 border-b bg-transparent rounded-none sm:pb-3 "
                >
                  <AccordionSummary
                    key={faq.question}
                    expandIcon={
                      expanded === `panel-${index}` ? (
                        <RemoveCircleOutlineRoundedIcon />
                      ) : (
                        <AddCircleOutlineIcon />
                      )
                    }
                    aria-controls={`panel-${index}-content`}
                    id={`panel-${index}-header`}
                    className=" text-base/7 font-medium text-gray-900 sm:pb-2 px-0 "
                  >
                    <span className="w-5/6 sm:w-full font-medium">
                      {" "}
                      {faq.question}{" "}
                    </span>
                  </AccordionSummary>
                  <AccordionDetails className="-mt-7 text-base/7 text-gray-600 px-0">
                    {faq.answer}
                  </AccordionDetails>
                </Accordion>
              ))}
            </dl>
          </div>

          <div className="flex items-center justify-center">
            <Button
              href="/FAQs"
              className="block lg:hidden font-medium text-primary-main hover:text-primary-dark bg-transparent px-0 underline text-lg mt-5"
            >
              View All FAQs
            </Button>
          </div>
        </div>
      </div>

      <div
        className="landingPagecontainer px-6 mx-auto  text-white lg:grid lg:grid-cols-8 pt-20 pb-14 xl:pb-0 md:px-20 mb-20 bg-no-repeat bg-cover md:rounded-2xl"
        style={{ backgroundImage: `url(${GradientBackground})` }}
      >
        <div className=" lg:col-span-5 justify-between text-center lg:text-start">
          <Typography
            variant="h2"
            className="text-3xl sm:text-5xl font-bold lg:tracking-tighter lg:leading-tight "
          >
            Join Thousands of{" "}
            <span className="text-primary-main"> Satisfied </span> Customers on
            Yield
          </Typography>
          <Typography className="text-lg sm:text-xl mt-6 font-medium">
            No matter your financial goal—whether it’s securing your future,
            building an emergency fund, or planning for major life events—Yield
            is here to support your journey.
          </Typography>

          <Button href="/signup" className="bg-white text-black mt-10 w-3/4 md:w-1/3 text-lg font-medium">
            Get Started
          </Button>
        </div>

        <div className="hidden lg:block lg:col-span-3 ml-auto  pt-16 ">
          <img src={YieldFlower} alt="A Flower" width="auto" height="auto" />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
