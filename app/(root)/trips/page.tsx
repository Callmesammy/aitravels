"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CountryDropdown } from "@/components/ui/country-dropdown"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RiGeminiLine } from "react-icons/ri";
import { useState } from "react"
import { Loader2 } from "lucide-react"
import {  useRouter } from "next/navigation"
import { action } from "./api/create-trips"
import { formSchema } from "@/lib/validation/trips"




const Trip = () => {
  const [isLoading, setIsLoading]= useState(false)
  const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {

        setIsLoading(true)
        let trip
        try{        
           trip = await action(values)
            if (trip?.id){
              
            }
        }catch(error){
          console.log(error)
        }finally{
          setIsLoading(false)
        }
        router.push(`/trips/${String(trip.id)}`)
              router.refresh()
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    
    return ( 
        <div className="flex px-2 pt-2 h-full w-full flex-col ">
        <div className="flex flex-col w-full  ">
            <h1 className="font-semibold">Add New Trips</h1>
            <p className="text-muted-foreground text-sm">View and Generate AI travel plans </p>
        </div>

        <div className="w-full bg-secondary h-full rounded-md pt-4 overflow-auto pb-3 px-3">  
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 justify-center flex flex-col  mt-3 lg:mx-[10rem]">
      <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country</FormLabel>
              <CountryDropdown 
                placeholder="Select Country"
                defaultValue={field.value}
                onChange={(country) => {
                  field.onChange(country.alpha3); 
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl >
                <Input type="number" placeholder="Enter number of days (e.g. 5,12)" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select group type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="solo">solo</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="business">Business</SelectItem>

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
   <FormField
          control={form.control}
          name="travel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel Style</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
              <SelectTrigger>
                    <SelectValue placeholder="Select your travel style " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="relaxedm">Relaxed</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="exploration">City Exploration</SelectItem>

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
              <SelectTrigger>
                    <SelectValue placeholder="Select your travel style" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="food_culture">Food & Culture</SelectItem>
                  <SelectItem value="sites">Historical Sites</SelectItem>
                  <SelectItem value="hiking">Hiking & Nature walks</SelectItem>
                  <SelectItem value="beach">Beaches & Water Activities</SelectItem>
                  <SelectItem value="museums">Museums & Art</SelectItem>
                  <SelectItem value="night_life">Night Life</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="photography">Photography Spots</SelectItem>


                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Estimate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="w-full">
              <SelectTrigger>
                    <SelectValue placeholder="Select your budget preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mid">Mid-range</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="bg-sky-950 cursor-pointer"> <RiGeminiLine />  Generate trip {isLoading && <Loader2 className="animate-spin"/>}</Button>
      </form>
    </Form>
    </div>
        </div>
     );
}
 
export default Trip;