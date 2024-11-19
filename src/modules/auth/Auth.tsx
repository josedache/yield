import { Outlet } from "react-router-dom";
import Slider from "react-slick";
import { Typography } from "@mui/material";

import "./Auth.css";
import Logo from "components/Logo";

function Auth() {
  const settings = {
    customPaging: function () {
      return <></>;
    },
    dotsClass: "slick-dots slick-thumb",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    arrows: false,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  const sliderData = [
    {
      title: "High Returns ",
      description:
        "With competitive returns of up to 21% per annum, Yield helps you make the most of your money.",
    },
    {
      title: "Customizable Plans",
      description:
        "Flexible options mean you’re always in control, so you can grow your money on terms that work for you.",
    },
    {
      title: "Secured Growth",
      description:
        "Yield offers a secure way to grow your money, helping you build your future without the guesswork.",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:p-4 h-full">
      <div className="hidden lg:flex flex-col p-6 h-full  text-primary-contrastText bg-cover bg-[url('assets/imgs/yield-auth-background.png')] bg-no-repeat object-fill">
        <Logo className="mb-8" />
        <div className="flex-1" />

        <div className="hidden lg:block mb-10">
          <Slider {...settings}>
            {sliderData.map((data, index) => (
              <div key={index} className="space-y-2 mb-10 max-w-md">
                <div>
                  <Typography
                    variant="h4"
                    className="font-semibold"
                    gutterBottom
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="italic font-normal leading-5"
                  >
                    {data.description}
                  </Typography>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="h-full p-5 py-[56px] bg-cover  bg-[url('assets/imgs/yield-auth-background.png')] lg:bg-none bg-no-repeat">
        <Logo className="mb-4 lg:hidden block" />

        <Outlet />
      </div>
    </div>
  );
}

export default Auth;

export const Component = Auth;
