
import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function Home() {  
  const session = await getServerSession();
  if (session?.user) {
    redirect(`${process.env.API_URL as string}/dashboard`);

  
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Welcome to Tebak 🔥!</CardTitle>
          <CardDescription>
            Tebak is a Platform for Creating Quizzes, Summary and Chatbot using AI!. Get started
            by log in below!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In with Google" />
        </CardContent>
      </Card>
    </div>
  );
}
