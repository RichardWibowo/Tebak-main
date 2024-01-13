"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Book  } from "lucide-react";

type Props = {};

const CreateCourseCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        console.log("Richard Have No Clue")
        router.push("/create")
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Course With Me!</CardTitle>
        <Book  size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Create your personalized tutorial with any subject.
        </p>
      </CardContent>
    </Card>
  );
};

export default CreateCourseCard;
