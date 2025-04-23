import SigninComponent from "@/components/ui/authentication/signin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function page({ params, searchParams }: any) {


  return <SigninComponent />;
  // return <RequestConnectingModal />;
}
