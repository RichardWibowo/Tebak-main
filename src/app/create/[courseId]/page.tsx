import React from 'react'
import { getAuthSession } from "../../../lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "../../..//lib/db";
import { Info } from 'lucide-react';
import ConfirmCourse from '@/components/courseComponent/confirmCourse'

type Props = {
    params : {
        courseId: string;
    }
}

const CreateChapters = async ({params: {courseId}}: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
      redirect("/");
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include : {units : {include : {chapters:true,},},},
      });
      if (!course) {
        return redirect("/");
      }

    return (
    <div className = "flex flex-col items-start max-w-l mx-auto my-3.5 px-10">
      <h5 className='text-sm uppercase text-secondary-foreground/60'>
        Course Name
      </h5>
      <h1 className='text-5xl font-bold'>{course.name}</h1>
    
      <div className="flex rounded-lg p-4 mt-5 border-none bg-secondary">
        <Info className="w-5 h-5 mr-3 text-blue-400" />
        <div>
          We generated chapters for each of your units. Look over them and then
          click the Button to confirm and continue
        </div>
      </div>
      <ConfirmCourse course = {course}/>
    </div>
  )
}

export default CreateChapters