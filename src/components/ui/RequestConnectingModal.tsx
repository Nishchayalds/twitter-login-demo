"use client";
import Image from "next/image";
import React, { useState } from "react";
const RequestConnectingModal = () => {
  return (
    <div className="md:bg-tree">
      <div className="h-screen flex items-center justify-center bg-[#0000004d] ">
        <div className="bg-[#1A1A1A] text-white rounded-lg w-[400px] p-6 shadow-lg relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button className="text-gray-400 hover:text-white text-lg">
              ←
            </button>
            <h2 className="text-xl font-bold">Connect Wallet</h2>
            <button className="text-gray-400 hover:text-white text-lg">
              ✖
            </button>
          </div>

          {/* Wallet Icon */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20">
              <Image
                src={require("../../../public/avtars/fox.png")}
                alt="MetaMask"
                className="w-full h-full"
              />
            </div>
            <p className="mt-6 text-lg font-medium">Request Connecting</p>
          </div>

          {/* Cancel Button */}
          <div className="mt-8 flex justify-center">
            <button
              // onClick={onCancel}
              className="bg-[#ff5c00] text-white px-6 py-2 rounded-lg hover:bg-[#ff6f00f2]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestConnectingModal;
