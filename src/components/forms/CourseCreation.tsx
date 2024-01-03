'use client'
import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChaptersSchema } from "@/schemas/forms/course";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { InfoIcon, Plus, Trash } from 'lucide-react';
import { Separator } from "../ui/separator";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast, useToast } from '../ui/use-toast';
import { useRouter } from "next/navigation";



type Props = {}

type Input =  z.infer<typeof createChaptersSchema>

const CourseCreation = (props: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("api/Course/CreateChapter", {
        title,
        units,
      });
      return response.data;
    },
  });
  
    const form = useForm<Input>({
        resolver: zodResolver(createChaptersSchema),
        defaultValues: {
          title: "",
          units: ["", "", ""],
        }
      });

      function onSubmit(data: Input) {
        if (data.units.some((unit) => unit === "")) {
          toast({
            title: "Error",
            description: "Please fill all the units",
            variant: "destructive",
          });
          return;
        }
        createChapters(data, {
          onSuccess: ({ course_id }) => {
            toast({
              title: "Success",
              description: "Course created successfully",
            });
            router.push(`/create/${course_id}`);
          },
          onError: (error) => {
            console.error(error);
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
          },
        });
      }
      

    form.watch();
    return (
<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
        <CardTitle className="text-2xl font-bold">Course Creation</CardTitle>
          <CardDescription className='flex'>
          <InfoIcon className="w-5 h-5 mr-3 text-blue-400" />
          Enter in a course title, or what you want to learn about. Then enter a
          list of units, which are the specifics you want to learn. And our AI
          will generate a course for you!</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the main topic of the course"
                      {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide any topic you would like to be generated on
                      here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                />

{form.watch('units').map((_, index) => (
  <FormField
    key={index}
    control={form.control}
    name={`units.${index}`}
    render={({ field }) => (
      <FormItem>
        <FormLabel> Unit {index + 1}</FormLabel>
        <FormControl>
        <Input
            placeholder="Enter subtopic of the course"
            {...field}
        />
        </FormControl>
        <FormDescription>
          Please provide a unit for this lesson plan  here.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
))}

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            Lets Go!
          </Button>



                
            </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  )

}

export default CourseCreation