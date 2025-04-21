"use client";
import NextuiProvider from "@/providers/Nextui";
import React from "react";
import Header from "./header";
import Footer from "./footer";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ToastContainer } from "react-toastify";

export default function LayoutComponent({ children, token }: any) {
  const path = usePathname();
  const tg = token && token.loginType == "TG" ? true : false;

  return (
    <NextuiProvider>
      <div className=" relative">
        <SessionProvider>
          {path == "/auth" ? (
            ""
          ) : path == "/tg-login" ? (
            ""
          ) : tg?(
            ""
          ):<Header token={token} tg={tg} />}
          <div className="">
            {children}
            <ProgressBar
              height="2px"
              color="#0FF378"
              options={{ showSpinner: true }}
              shallowRouting
            />
          </div>
          {path == "/auth" ? (
            ""
          ) : path == "/tg-login" ? (
            ""
          ) : path == "/quiz" ? (
            ""
          ) : (
            <Footer />
          )}
        </SessionProvider>
      </div>
      <ToastContainer />
    </NextuiProvider>
  );
}
