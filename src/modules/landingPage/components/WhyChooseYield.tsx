import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Button, Typography } from "@mui/material";
import SpiralBackground from "../../../assets/svgs/spiarl.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WhyChooseYield = () => {
  const tiers = [
    {
      name: "Traditional Banks",
      id: "tier-freelancer",
      href: "#",
      features: [
        "No early liquidation allowed",
        "Often complex, with multiple steps for account management and transactions.",
        "Fixed terms for accounts and services, less adaptable to individual needs.",
        "High security, regulated by Central Bank.",
        "Support and Guidance can be bureaucratic and slow.",
        "Lower risk due to regulation and established trust.",
      ],
      mostPopular: false,
    },
    {
      name: "Yield",
      id: "tier-startup",
      href: "/signup",
      features: [
        "Zero Fees on Flex Withdrawals.",
        "Streamlined and straightforward platform, designed for hassle-free fund management.",
        "Highly flexible, allowing users to manage their funds in a way that suits their lifestyle.",
        "Top-tier security, backed by our parent company FCMB Group, ensuring your funds and data stay protected.",
        "Direct, responsive support aimed at empowering users with information and assistance.",
        "Lower risk, benefiting from the stability and security associated with our backing by FCMB Group.",
      ],
      mostPopular: true,
    },
    {
      name: "Other Non-Banks",
      id: "tier-enterprise",
      href: "#",
      features: [
        "High penalty fee on early liquidation",
        "User-friendly with online platforms but may have limitations in services.",
        "More flexible than banks but can still have rigid product offerings.",
        "Security varies, especially with poor cooperate governance",
        "Often more responsive than banks, but quality varies.",
        "Higher risk due to startup nature and varying regulation.",
      ],
      mostPopular: false,
    },
  ];

  return (
   <div className=" bg-yellow-50/50 "  style={{ backgroundImage: `url(${SpiralBackground})` }}>
     <div className="landingPagecontainer mx-auto pt-20 pb-14 md:pb-24 px-6 md:px-8 lg:px-3 xl:px-0" >
      <Typography className=" pb-4 font-semibold text-3xl md:text-5xl text-center">
        Why Choose Yield?
      </Typography>
      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            className={classNames(
                tier.mostPopular
                  ? "bg-[#374151] text-white p-4 sm:p-8 md:p-4 xl:p-8"
                  : "ring-1 ring-white/10 bg-white h-fit lg:mt-24 p-4 sm:p-8 lg:p-4",
                index === 1 ? "order-first lg:order-none" : "", 
                "rounded-3xl"
              )}
          >
            <div className="flex items-center justify-between gap-x-4">
              <h3 id={tier.id} className="text-2xl font-bold ">
                {tier.name}
              </h3>
              {tier.mostPopular ? (
                <p className="rounded-sm bg-white text-primary-main px-2.5 py-1 text-xs/5 font-bold ">
                  Recommended
                </p>
              ) : null}
            </div>

            <ul role="list" className="mt-6 space-y-3   ">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-2">
                  <CheckRoundedIcon
                    aria-hidden="true"
                    className="w-4 h-4 md:h-6 md:w-5 flex-none "
                  />
                  {feature}
                </li>
              ))}
            </ul>
            {tier.mostPopular ? (
            <Button
              href={tier.href}
              aria-describedby={tier.id}
              className={"bg-primary-main text-white shadow-sm hover:bg-primary-dark mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold "}
            >
              Start Growing Your Wealth
            </Button>
             ) : null}
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default WhyChooseYield;
