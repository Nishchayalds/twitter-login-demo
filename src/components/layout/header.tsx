"use client";
import React from "react";
import HeaderComponent from "./headerComponent";

export default function Header({ token, tg }: any) {
  // console.log("user-token", token);
  return (
    <>
      <HeaderComponent token={token} tg={tg} />
    </>
  );
}
