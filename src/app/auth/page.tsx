import SigninComponent from "@/components/ui/authentication/signin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  const cookieStore = cookies();
//   const userData = cookieStore.get("userData");

//   if (userData) {
//     redirect("/");
//   }

  return <SigninComponent />;
}
