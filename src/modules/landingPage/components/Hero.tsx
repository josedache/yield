import { Button, Typography } from "@mui/material";
import GrowingCoin from "../../../assets/svgs/growing-coin.svg";
import CBNLogo from "../../../assets/svgs/cbn_logo 1.svg";
import Graph from "../../../assets/svgs/Graph.svg";

const Hero = () => {
  return (
    <>
      <div className=" lg:bg-gradient-to-r from-[#F2F6EE] via-[#D8E5CB] to-[#7DA851] pb-48 -mt-5">
        <div className="landingPagecontainer mx-auto px-6 lg:px-8 xl:px-4 ">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between pt-10 md:pt-20 xl:pt-48 mt-5  ">
            <div className="w-full  ">
              <div>
                <Typography
                  variant="h1"
                  className="text-[52px] lg:text-7xl font-bold lg:tracking-tighter text-gray-700"
                >
                  Grow your <br /> money with{" "}
                  <span className="text-primary-main"> Yield </span>
                </Typography>
                <Typography className=" mt-4 text-lg xl:text-xl w-4/5 sm:w-full">
                  An easier way to earn more on your funds
                </Typography>
              </div>
              <div className="flex mt-6 flex-col md:flex-row md:items-center lg:w-[434px]">
                <Button
                  variant="contained"
                  href="/signup"
                  className="text-white font-medium text-lg md:text-base md:py-3 md:px-10 lg:px-6 mt-4 md:mt-0 "
                >
                  Start Growing
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-8">
                <img src={CBNLogo} alt="CBN Logo" />
                <Typography className=" text-base ">
                  Licensed by Central Bank of Nigeria
                </Typography>
              </div>
            </div>
            <div className="hidden  lg:flex justify-center  w-full ">
              <img src={GrowingCoin} width="auto" height="auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="landingPagecontainer mx-auto -mt-36  lg:-mt-48 px-4 lg:px-3 ">
        <div className="flex flex-col lg:flex-row z-30 rounded-3xl bg-[#F0FDF4] pb-8 sm:py-10 lg:py-24 lg:px-10 xl:px-20 ">
          <div className="lg:w-[60%] mt-11 lg:mt-7 px-4 sm:pl-5 ">
            <Typography className="font-bold text-[#033650] text-4xl sm:text-[44px]  sm:leading-[48px]">
              Growing <span className=" text-primary-main ">your money</span>{" "}
              shouldn't be complicated
            </Typography>

            <Typography className="font-medium mt-4 max-w-[450px] text-gray-700 text-lg">
              In a world where prices keep climbing, your money shouldn't stand
              still.
            </Typography>

            <div className="flex mt-6 flex-col lg:flex-row lg:items-center mx-auto ">
              <Button
                variant="contained"
                href="/signup"
                className="text-white w-full bg-primary-main font-medium text-lg md:text-base p-2.5 md:py-3 md:px-6 mt-4 md:mt-0 md:w-72 "
              >
                I want to earn more
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 ">
            <img src={Graph} alt="Graph" width="full" height="full" className=" w-[800px] lg:w-auto" />           
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
