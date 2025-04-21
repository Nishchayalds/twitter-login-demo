"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import BottomDrawer from "./BottomDrawer";

export default function PriceGuessPage() {
  const [selectedPrice, setSelectedPrice] = useState<any>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handlePriceSelection = (price: any) => {
    setSelectedPrice(price);
    setIsCorrect(true);
    // const priceWithoutSymbol = price.replace('$', '');
    // if(priceWithoutSymbol == answer){
    // }

    // setSubmitted(true);
  };

  useEffect(() => {
    console.log("i am useEffect");
  }, []);

  useLayoutEffect(() => {
    console.log("i am useLayoutEffect");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-[85vh] bg-greenShadow-m">
        <div className="bg- white p-4 rounded-2xl shadow-xl text-center">
          <h1 className="text-xl font-bold text-white mb-4">Well done !</h1>

          <p className="text-center text-sm font-light">
            One step left: predict the artwork price to add it to your
            collection.
          </p>
          <div className="rounded-lg my-4">
            <Image
              src={require("../../../public/taping/q2.jpg")} // Replace with actual image path
              alt="Painting"
              width={1000}
              height={1000}
              className="mx-auto  h-60  object-cover rounded-2xl "
            />
          </div>

          <p className="text-xl font-bold mb-3">Guess the current price</p>

          {!submitted ? (
            <div className=" flex  gap-2 items-center justify-center mt-2">
              <button
                onClick={() => handlePriceSelection("150$")}
                className=" bg-white text-darkGrey w-full py-2 text-md font-medium rounded-md hover:shadow transition duration-300"
              >
                $150 million{" "}
              </button>

              <button
                onClick={() => handlePriceSelection("200$")}
                className=" bg-white text-darkGrey w-full py-2 text-md font-medium rounded-md hover:shadow transition duration-300"
              >
                $200 million
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                You selected:
              </h3>
              <p className="text-gray-600 text-xl font-bold">{selectedPrice}</p>

              <button
                onClick={() => {
                  setSelectedPrice(null);
                  setSubmitted(false);
                }}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/*  answer modal */}
      <BottomDrawer
        isOpen={isCorrect}
        onClose={() => {
          setIsCorrect(false);
        }}
        title=""
        closable
        onOuterClosed={() => {
          setIsCorrect(false);
        }}
        height={450}
      >
        <div>
          <Image
            src={require("../../../public/taping/green-cross.png")}
            alt="check mark image"
            width={200}
            height={200}
            className="mx-auto h-32 w-32 object-cover"
          />
          <h1 className="text-center text-3xl font-bold">Spot on!</h1>
          <p className="text-secondary-100 font-bold text-center my-2">
            The current price is $33 million
          </p>
          <p className="text-gray text-sm font-[200]">
            You can boost your gems from 115 to 575 by confirming the
            transaction on-chain. It’s only tiny gas fee.
          </p>
          <div className=" w-full flex flex-col gap-2 mt-2">
            <button
              className={`bg-[#f5f2eb] rounded-lg py-1  `}
              // onClick={handleToggleButton}
            >
              <p className="font-semibold text-black">Get 100 gems</p>
              <p className="text-sm text-gray-500 font-sans">Get 100 gems</p>
            </button>

            <button
              className={` bg-[#9384dd] rounded-lg py-1 bg-opacity-100  `}
            >
              <p className="text-white font-semibold text-sm">Get 5x more</p>
              <p className="text-sm text-gray-200 font-sans">Get 500 gems</p>
            </button>
          </div>
        </div>
      </BottomDrawer>
    </>
  );
}
