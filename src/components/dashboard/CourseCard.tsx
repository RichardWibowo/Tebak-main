import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import HistoryComponent from "../HistoryComponent";
import { prisma } from "@/lib/db";
import GalleryCourseCard from "./galleryCourseCard";

type Props = {};

const CourseCard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });

  const courses_count = await prisma.course.count({
    where : {
      units: {
        
      },
    },
  });
  
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/">Latest Course</Link>
        </CardTitle>
        <CardDescription>
          You have generated in total {courses_count} course
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
      {courses.map((course) => {
          return <GalleryCourseCard course={course} key={course.id} />;
       })
      }
      </CardContent>
    </Card>
  );
};

export default CourseCard;
