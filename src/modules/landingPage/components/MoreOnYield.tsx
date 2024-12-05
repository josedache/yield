import { Typography } from '@mui/material'
import Clock from "../../../assets/svgs/Clock.svg";
import Plant from "../../../assets/svgs/plant.svg";
import Avatar from "../../../assets/imgs/avatar.png";
import Target from "../../../assets/svgs/target.svg"
import "../LandingPage.css"

type CardType = {
    id: number;
    icon: string;
    iconAlt: string;
    title: string;
    description: string;
    img: string;
    imgAlt: string;
    stackTitle: string;
    stackColor: string;
    stackDescription: string;
    backgroundColor: string;
    titleColor: string;
    stackTextColor : string;
  };
  
  const cards: CardType[] = [
    {
      id: 1,
      icon: Clock,
      iconAlt: "rate icon",
      title: "Fixed Yield",     
      description:"Lock your funds for a set period of time and earn maximum returns of up to 21% when you create plans of up to 12 months. When your Yield plan matures, you can liquidate or roll-over your funds to increase your earnings.",
      img: Avatar,
      imgAlt: "a man smiling",
      stackColor: "#16A34A",
      stackTitle: "Hi, Olawale",
      stackDescription: "The yield on your ₦100,000 is now ₦21,000",
      backgroundColor: "#F0FDF4",
      titleColor: "#166534",
      stackTextColor:"#077DBB"
    },
    {
      id: 2,
      icon: Target,
      iconAlt: "clock icon",
      title: "Flex Yield",
      description:
        "A flexible Yield type that allows you manage your funds as you like and according to your goals. You can create targets, autosave and withdraw up to four times a month without any penalty.",
      img: Plant,
      stackColor: "#4920AA",
      imgAlt: "a green plant",
      stackTitle: "Plan, Fund, Grow",
      stackDescription: "Grow with Confidence",
      backgroundColor: " #077DBB0A ",
      titleColor: "#1D0D44",
      stackTextColor:"#15803D"
    },
  ];
  
function MoreOnYield() {
  return (
    <div className="landingPagecontainer px-6 md:px-8 lg:px-3 xl:px-0 mx-auto mb-16 lg:mb-36 ">
    <Typography className="text-center font-semibold text-4xl lg:text-[44px] my-6 lg:my-20 max-w-xs md:max-w-[540px] mx-auto leading-title ">
      More on Yield
    </Typography>
    <div className="flex flex-col gap-6">
      <div className="grid lg:grid-cols-2 gap-6 mt-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-full py-6 px-4 md:p-12 rounded-3xl flex flex-col justify-between "
            style={{ backgroundColor: `${card.backgroundColor}` }}
          >
            <div className="">
              <img
                src={card.icon}
                alt={card.iconAlt}
                className="rounded-full p-3 sm:p-4 flex items-center justify-center size-14 sm:size-20"
                style={{ backgroundColor: `${card.stackColor}` }}
              />
              <div className="mb-6 md:mb-14 mt-3 md:mt-8">
                <Typography
                  className="text-2xl sm:text-4xl font-semibold text-primary-main"
                  style={{ color: `${card.titleColor}` }}
                >
                  {card.title}
                </Typography>
                <Typography className="mt-4 text-xs sm:text-base text-text-secondary">
                  {card.description}
                </Typography>
              </div>
            </div>
            <div>
              <div className="relative md:-top-1">
                <div className=" card-stack flex justify-between items-center">
                  <div style={{ color: `${card.stackTextColor}` }}>
                    <Typography className="text-lg sm:text-3xl font-semibold">
                      {card.stackTitle}
                    </Typography>
                    <Typography className={` text-xs sm:text-base  ${card.id === 1 ? 'w-3/4 sm:w-full text-[#04476B] ' : 'w-full'}`} >
                      {card.stackDescription}
                    </Typography>
                  </div>
                  <div className={`${card.id === 2 ? 'border border-primary-dark rounded-full p-2 md:p-4 m-2' : ''}`}> 
                  <img
                    src={card.img}
                    alt={card.imgAlt}
                    className={`${card.id === 2 ? 'w-6 h-6 sm:w-10 sm:h-10' : 'w-10 h-10 sm:w-20 sm:h-20'}`}
                  />
                  </div>              
                </div>
                <div className=" card-stack " />
                <div className=" card-stack " />
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  </div>
  )
}

export default MoreOnYield
