"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface SubscriptionPlan {
  id: 'monthly' | 'yearly'; // Plan identifiers
  name: string;
  price: string; // Simplified price structure
  billingCycle: 'month' | 'year'; // Added billing cycle info
  features: string[];
  discount?: string; // Optional discount info for yearly plan
}

export default function SubscribePage() {
  // Assume the user is always on the basic plan initially for this page's purpose
  const currentPlan = "basic";
  // State to track the selected plan ID, default to 'monthly'
  const [selectedPlanId, setSelectedPlanId] = useState<'monthly' | 'yearly'>('monthly');

  // Define Pro plans separately
  const proPlans: SubscriptionPlan[] = [
    {
      id: "monthly",
      name: "Pro Plan Monthly",
      price: "$1.99",
      billingCycle: "month",
      features: [
        "Unlimited practice",
        "Ad-free experience"
      ],
    },
    {
      id: "yearly",
      name: "Pro Plan Yearly",
      price: "$3.99", // Example yearly price
      billingCycle: "year",
      features: [
        "Unlimited practice",
        "Ad-free experience"
      ],
      discount: "Save 80%" // Added discount info
    }
  ];

  // Note: The logic for handling an already subscribed Pro user (`currentPlan === "pro"`)
  // might need further adjustments based on how the subscription state is managed.
  // For now, this focuses on the upgrade view from the Basic plan.

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center px-4 py-3 border-b h-14 bg-background/95 backdrop-blur">
        <Link href="/" className="flex items-center mr-auto">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium ml-2">Subscription</h1>
        </Link>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Your subscription</h2>
          <p className="text-muted-foreground mt-1">
            You are currently using the <span className="font-medium">Basic Plan</span>. Upgrade to Pro to enjoy premium features.
          </p>
        </div>

        {/* Always show Pro upgrade options if on basic plan */}
        {currentPlan === "basic" && (
          <>
            <div className="grid gap-4 mt-8">
              {proPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer ${selectedPlanId === plan.id ? 'border-primary ring-2 ring-primary' : 'border-border'}`} // Add border and ring for selected card
                  onClick={() => setSelectedPlanId(plan.id)} // Update selected plan on click
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {plan.name}
                      {plan.discount && (
                        <Badge variant="secondary">{plan.discount}</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        /{plan.billingCycle}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  {/* Removed CardFooter with individual buttons */}
                </Card>
              ))}
            </div>

            {/* Single Subscribe button below the cards */}
            <div className="mt-8">
              <Button className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                {/* Button text updates based on the selected plan */}
                Subscribe
              </Button>
            </div>
          </>
        )}

        {/* Section for users already subscribed to Pro - needs logic adjustment */}
        {/* This part might need rework depending on how pro subscription state (monthly/yearly) is stored and passed */}
        {currentPlan !== "basic" && ( // Simplified condition for demonstration
          <div className="space-y-6">
            <Card>
              <CardHeader>
                {/* Display details based on the actual subscribed Pro plan */}
                <CardTitle>Pro Plan {/* Add Monthly/Yearly based on actual subscription */}</CardTitle>
                <CardTitle>Pro Plan</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold">
                    {billingInterval === "monthly" ? "$1.99" : "$3.99"}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    /{billingInterval === "monthly" ? "month" : "year"}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Billing period</span>
                    <span>{billingInterval === "monthly" ? "Monthly" : "Yearly"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next payment</span>
                    <span>May 9, 2025</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Unlimited practice
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Ad-free experience
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" variant="outline">
                  Manage Subscription
                </Button>
                {/* Add logic to handle cancellation */}
                <Button className="w-full" variant="outline">
                  Cancel Subscription
                </Button>
              </CardFooter>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              Need help? <Link href="#" className="text-primary underline underline-offset-4">Contact support</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
