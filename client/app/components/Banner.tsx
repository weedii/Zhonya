import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import FormattedPrice from "./common/FormattedPrice";

const Banner = () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 md:max-h-[600px]">
      <div className="bg-whiteSmoke dark:bg-gray-600/10 md:col-span-2 relative flex items-end justify-end rounded-lg overflow-hidden group">
        {/* Left half */}
        <div className="h-full z-10 absolute left-10 top-0 flex flex-col justify-center items-start isolate gap-5 md:gap-10">
          <div className="flex flex-col gap-1 md:gap-3">
            <p className="bg-orange-500 text-white text-sm font-semibold rounded-full w-20 py-1 text-center hidden sm:block">
              Buy 250
            </p>

            <p className="text-xl md:text-3xl font-semibold hidden sm:block">Get Ready for</p>

            <p className="text-2xl md:text-6xl font-bold">Apple Watch</p>

            <p className="text-xs md:text-sm opacity-60 font-medium max-w-44">
              Coming with new Design Register your interest now
            </p>
          </div>

          <Link
            href={"/shop?page=0"}
            className="px-4 py-2 md:py-3 md:px-4 bg-yellow-500 rounded-full text-base text-white font-semibold hover:bg-yellow-400 w-36 text-center"
          >
            Shop Now
          </Link>
        </div>

        <Image
          src={"/apple.png"}
          width={400}
          height={400}
          alt="apple watch"
          priority
          className="object-contain h-72 md:h-3/4 max-h-[600px] self-end group-hover:scale-105 transition-all duration-200"
          style={{ width: "auto", height: "auto" }}
        />
      </div>

      {/* Right half */}
      <div className="flex flex-col space-y-5 md:space-y-10 h-auto md:max-h-[600px]">
        <div className="h-full md:h-1/2 bg-whiteSmoke dark:bg-gray-600/10 rounded-lg overflow-hidden flex justify-center items-center p-5 group">
          <div className="w-1/2 flex">
            <div>
              <p className="text-2xl font-semibold">Elegance</p>
              <p className="text-3xl font-bold">Tissot</p>
              <p className="mt-3 mb-5 font-medium opacity-75">
                From:
                <FormattedPrice
                  amount={299}
                  className="text-yellow-600 opacity-100"
                />
              </p>

              <Link
                href={"/shop?page=0"}
                className="font-bold underline underline-offset-2 decoration-[1px] hover:text-yellow-600"
              >
                Shop Now!
              </Link>
            </div>
          </div>

          <Image
            src={"/tissot.png"}
            width={300}
            height={300}
            alt="tissot"
            priority
            className="object-contain h-72 md:h-60 w-1/2 group-hover:scale-105 transition-all duration-200"
          />
        </div>

        <div className="h-full md:h-1/2 bg-whiteSmoke dark:bg-gray-600/10 rounded-lg overflow-hidden flex justify-center items-center p-5 group">
          <div className="w-1/2 flex">
            <div>
              <p className="text-2xl font-semibold">Modern</p>
              <p className="text-3xl font-bold">Casio</p>
              <p className="mt-3 mb-5 font-medium opacity-75">
                From:
                <FormattedPrice
                  amount={299}
                  className="text-yellow-600 opacity-100"
                />
              </p>

              <Link
                href={"/shop?page=0"}
                className="font-bold underline underline-offset-2 decoration-[1px] hover:text-yellow-600"
              >
                Shop Now!
              </Link>
            </div>
          </div>

          <Image
            src={"/casio.png"}
            width={300}
            height={300}
            alt="casio"
            priority
            className="object-contain h-72 md:h-60 w-1/2 group-hover:scale-105 transition-all duration-200"
          />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
