/* eslint-disable @next/next/no-img-element */
"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface taskList {
  imagUrl: string[];
  taskDetails: {
    bestTimeToVisit: string;
    name: string;
    description: string;
    estimatedPrice: string;
    duration: number;
    itinerary: { [key: string]: string };
    budget: string;
    country: string;
    group: string;
    interest: string;
    travel: string;
    location: { city: string };
  };
  id: number;
  user_id: string;
}

const Taski = ({ params }: { params: { id: number } }) => {
  console.log(params)
  const [listings, setIslisting] = useState<taskList[]>();

  useEffect(() => {
    itemsList();
  }, []);

  const itemsList = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("upload")
      .select("*")
      .eq("id", params.id);

    if (data) {
      const parsedData = data.map((doc) => ({
        ...doc,
        taskDetails:
          typeof doc.taskDetails === "string"
            ? JSON.parse(doc.taskDetails)
            : doc.taskDetails,
        imagUrl:
          typeof doc.imagUrl === "string"
            ? JSON.parse(doc.imagUrl || "[]")
            : doc.imagUrl,
      }));
      setIslisting(parsedData as taskList[]);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-4 w-full min-h-screen flex flex-col space-y-4 overflow-auto">
      <div className="text-center">
        <h1 className="text-lg font-semibold">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          View and edit AI-generated travel plans
        </p>
      </div>

      <div className="w-full flex flex-col items-center space-y-6">
        {listings?.map((fl) => (
          <div
            key={fl.id}
            className="w-full max-w-4xl flex flex-col items-center space-y-4  p-4 rounded-md shadow-md"
          >
            <h2 className="text-xl font-bold text-center">{fl.taskDetails.name}</h2>

            <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground justify-center items-center">
              <span className="flex items-center gap-1">
                <FaRegCalendarAlt />
                {fl.taskDetails.duration} day plan
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin />
                {fl.taskDetails.location.city}
              </span>
            </div>

            <div className="w-full items-center justify-center">
              <Carousel className="w-full max-w-5xl">
                <CarouselContent>
                  {fl.imagUrl.map((doc: string, flx: number) => (
                    <CarouselItem key={doc}>
                      <div className="w-full items-center justify-center">
                        <img
                          key={flx}
                          src={doc}
                          alt={`Image ${flx}`}
                          className="w-full h-64 sm:h-80 object-cover rounded-md"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent >
                <CarouselPrevious className="" />
                <CarouselNext />
              </Carousel>
            </div>

            <ul className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
              <li className="capitalize bg-gray-300 px-3 py-1 rounded">
                {fl.taskDetails.budget}
              </li>
              <li className="capitalize bg-sky-300 px-3 py-1 rounded">
                {fl.taskDetails.country}
              </li>
              <li className="capitalize bg-orange-300 px-3 py-1 rounded">
                {fl.taskDetails.group}
              </li>
              <li className="capitalize bg-green-300 px-3 py-1 rounded">
                {fl.taskDetails.interest}
              </li>
              <li className="capitalize bg-purple-300 px-3 py-1 rounded">
                {fl.taskDetails.travel}
              </li>
            </ul>

            <div className="w-full text-center sm:text-left space-y-2">
              <span className="block font-medium">
                {fl.taskDetails.duration} Day in {fl.taskDetails.location.city}
              </span>
              <span className="text-muted-foreground">
                {fl.taskDetails.estimatedPrice}
              </span>
              <p className="text-md">{fl.taskDetails.description}</p>
              {Object.entries(fl.taskDetails.itinerary).map(([day, dl]) => (
                <div key={day} className="text-sm">
                  <strong>{day}:</strong> {dl}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taski;
