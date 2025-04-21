"use client"
import React, { useState } from "react";

const ConnectWalletModal = () => {
  const [activeTab, setActiveTab] = useState("Ethereum");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1A1A1A] text-white rounded-lg w-[400px] p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h2 className="text-xl font-bold">Connect Wallet</h2>
          <button className="text-gray-400 hover:text-white">
            ✖
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-4">
          {["Ethereum", "Solana", "Bitcoin"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded-lg ${
                activeTab === tab ? "bg-gray-800 text-white" : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Wallet Options */}
        <div className="mt-6 space-y-4">
          {[
            { name: "MetaMask", icon: "🦊" },
            { name: "Wallet Connect", icon: "🌐" },
            { name: "Coinbase Wallet", icon: "🔵" },
            { name: "Formatic", icon: "🟢" },
          ].map((wallet) => (
            <div
              key={wallet.name}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
              <span>{wallet.name}</span>
              <span>{wallet.icon}</span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-gray-400 text-xs mt-6 text-center">
          By connecting your wallet, you agree to our{" "}
          <a href="#" className="text-blue-500 underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default ConnectWalletModal;