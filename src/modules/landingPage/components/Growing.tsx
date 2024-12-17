import { Button, Typography } from "@mui/material";
import Divider from "../../../assets/svgs/divider.svg";
import Send from "../../../assets/svgs/Send.svg";
import Lock from "../../../assets/svgs/Lock.svg";
import Growth from "../../../assets/svgs/Growth.svg";
import Line from "../../../assets/svgs/Line.svg";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

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
      icon: Send,
      alt: "send icon",
      title: "Effortless Experience",
      subtitle: "User-friendly interface designed for ease and efficiency",
      backgroundColor: "#077DBB0B",
      iconBackgroundColor: "#077DBB1C",
    },
    {
      id: 3,
      icon: Lock,
      alt: "lock icon",
      title: "Enhanced Security ",
      subtitle:
        " Your peace of mind is our priority with bank-grade security measures",
      backgroundColor: " #F3F4F6",
      iconBackgroundColor: " #E5E7EB",
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
      <div className="landingPagecontainer mx-auto px-4 lg:px-4 xl:px-2 ">
        <div>
          <div className="justify-between gap-6 mt-12 lg:mt-[80px] grid lg:grid-rows-2 lg:grid-flow-col">
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
                    className="w-8 h-9 md:w-7 md:h-7"
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

      <div className="bg-[#FAF8F8] ">
        <div className="flex flex-col lg:flex-row items-center justify-between landingPagecontainer mx-auto px-6 md:px-0 lg:px-2 xl:px-0 py-10 md:py-20 mt-5 md:mt-20 gap-1 lg:gap-4 xl:gap-10 ">
          <div className="w-full md:w-5/6 lg:w-4/6 xl:w-4/5 mx-auto text-center xl:text-start text-gray-800 " >
            <Typography className=" text-[32px] sm:text-[40px] font-semibold  leading-[48px]">
              Discover the simple, secure way to grow with Yield
            </Typography>
            <Typography className=" text-[32px] sm:text-[40px] font-semibold leading-[48px] ">
              ...with as little as ₦50,000
            </Typography>
            <div className="w-fit xl:w-auto mx-auto xl:mr-28">
              <img src={Line} alt="Line" className=" ml-auto " />
            </div>
          </div>
          <div className="block sm:hidden mt-6">
            <Button href="https://youtu.be/t4dR1GkxkUk?si=ue5_TAGAmCojsFNr" className=" rounded-3xl text-base font-medium bg-primary-main">
              Watch Video
              <PlayCircleOutlinedIcon className="ml-2 w-6 h-6" />
            </Button>
          </div>

          <div className="hidden sm:block w-full mx-auto aspect-video lg:mt-0 mt-10 ">
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
