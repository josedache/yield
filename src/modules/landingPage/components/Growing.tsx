import { Typography } from "@mui/material";
import Divider from "../../../assets/svgs/divider.svg";
import Send from "../../../assets/svgs/Send.svg";
import Lock from "../../../assets/svgs/Lock.svg";
import Growth from "../../../assets/svgs/Growth.svg";
import Line from "../../../assets/svgs/Line.svg";

type CardType = {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  alt: string;
  backgroundColor: string;
  iconBackgroundColor?: string;
};

const Growing = () => {
  const cards: CardType[] = [
    {
      id: 1,
      icon: Divider,
      alt: "setting icon",
      title: "Enjoy Higher Returns",
      subtitle:
        "Unlock higher interest rates of up to 21% when compared to traditional banks.",
      backgroundColor: "#FFFBEB",
      iconBackgroundColor: "#FEF3C7 ",
    },
    {
      id: 2,
      icon: Lock,
      alt: "lock icon",
      title: "Enhanced Security ",
      subtitle:
        " Your peace of mind is our priority with bank-level security measures",
      backgroundColor: " #F3F4F6",
      iconBackgroundColor: " #E5E7EB",
    },
    {
      id: 3,
      icon: Send,
      alt: "send icon",
      title: "Effortless Experience",
      subtitle: "User-friendly interface designed for ease and efficiency",
      backgroundColor: "#077DBB0B",
      iconBackgroundColor: "#077DBB1C",
    },

    {
      id: 4,
      icon: Growth,
      alt: "setting icon",
      title: "Assured Growth",
      subtitle:
        "Enjoy peace of mind knowing your funds are growing even while you sleep.",
      backgroundColor: "#FEF2F2",
      iconBackgroundColor: "#FEE2E2",
    },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 lg:px-8  ">
        <div>
          <div className="justify-between gap-5 mt-12 lg:mt-[80px] grid lg:grid-rows-2 lg:grid-flow-col">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex gap-4 p-4 rounded-3xl items-center "
                style={{ backgroundColor: `${card.backgroundColor}` }}
              >
                <div
                  className=" rounded-2xl p-4 sm:p-5"
                  style={{ backgroundColor: `${card.iconBackgroundColor}` }}
                >
                  <img
                    src={card.icon}
                    alt={card.alt}
                    className="w-14 h-14 md:w-10 md:h-10"
                  />
                </div>
                <div>
                  <Typography className="text-text-primary md:text-xl font-bold">
                    {card.title}
                  </Typography>
                  <Typography className="text-text-secondary font-medium text-sm md:text-base">
                    {card.subtitle}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FAF8F8CC] ">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto py-10 md:py-20 mt-5 md:mt-20 gap-1 xl:gap-8">
          <div className="text-center xl:text-start">
            <Typography className=" text-gray-800  text-3xl sm:text-[40px] font-semibold  sm:leading-[48px]">
              Discover the simple, secure way to grow with Yield
            </Typography>
            <Typography className=" text-gray-800  text-3xl sm:text-[40px] font-semibold sm:leading-[48px] lg:inline xl:inline-flex sm:inline-flex">
              ...with as little as{" "}
              <span className="flex flex-col w-fit justify-center mx-auto">
                {" "}
                ₦50,000 <img src={Line} alt="Line" className=" ml-auto " />
              </span>
            </Typography>
          </div>

          <div className="w-full mx-auto aspect-video lg:mt-0 mt-10 ">
            <iframe
              width="710"
              height="404"
              src="https://www.youtube.com/embed/t4dR1GkxkUk?si=ledR5M8C2HbiKP5K"
              title="YouTube video player"
              // frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full  bg-primary-main "
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Growing;
