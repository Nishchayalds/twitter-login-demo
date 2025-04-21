"use client";
import React from "react";
import { EnergyProvider } from "@/context/EnergyContext";
import TapParent from "./components/TapParent";
import TelegramHeader from "../Telegramheader";

const TapMain = ({
  tokenData,
  Quest,
  QuestInteractive,
  featuredQuest,
  partners,
  token,
  CoinsData,
}: any) => {
  return (
    <EnergyProvider CoinsData={CoinsData}>
      <TapParent />
    </EnergyProvider>
  );
};

export default TapMain;
