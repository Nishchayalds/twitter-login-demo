"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  defaultSettings,
  FeaturedQuestSettings,
  MobileLeaderboardSettings,
  partnerSettings,
  TdefaultSettings,
  tgfeatureSettings,
  TopleaderSettings,
} from "@/utils/SliderSettings";
export default function SimpleSlider({ children, settings = "D" }: any) {
  let finalSettings;

  switch (settings) {
    case "D":
      finalSettings = defaultSettings;
      break;
    case "L":
      finalSettings = MobileLeaderboardSettings;
      break;
    case "Q":
      finalSettings = FeaturedQuestSettings;
      break;
    case "T":
      finalSettings = tgfeatureSettings;
      break;
    case "TGP":
      finalSettings = TdefaultSettings;
      break;
    case "Top":
      finalSettings = TopleaderSettings;
      break;
    default:
      finalSettings = partnerSettings;
      break;
  }
  return <Slider {...finalSettings}>{children}</Slider>;
}
