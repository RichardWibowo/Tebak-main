import React from "react";

import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CourseCreation from "@/components/forms/CourseCreation";


export const metadata = {
  title: "Course | Tebak",
  description: "Teach yourself on anything!",
};

type Props = {}

const course =  async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return (
      <CourseCreation />
  );
};

export default course;
