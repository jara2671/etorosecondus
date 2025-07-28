"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, ArrowRight, Upload, FileText, CreditCard } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

const verificationSteps = [
  {
    id: 1,
    title: "Create Account",
    description: "Complete account registration",
    icon: CheckCircle,
    status: "completed" as const,
  },
  {
    id: 2,
    title: "Verify Identity",
    description: "Upload identification documents",
    icon: FileText,
    status: "current" as const,
  },
  {
    id: 3,
    title: "Deposit Funds",
    description: "Add funds to start trading",
    icon: CreditCard,
    status: "pending" as const,
  },
]

export function AccountVerification() {
  const { user, updateUser } = useAuth()
  const [currentStep, setCurrentStep] = useState(2)

  const handleVerifyAccount = () => {
    updateUser({ isVerified: true })
    setCurrentStep(3)
    toast.success("Identity verification completed!")
  }

  const progress = (currentStep / verificationSteps.length) * 100

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Account Setup</CardTitle>
            <CardDescription>
              Complete these steps to unlock all trading features
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {verificationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.status === "completed"
                    ? "bg-green-100 border-green-500 text-green-600"
                    : step.status === "current"
                    ? "bg-blue-100 border-blue-500 text-blue-600"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}>
                  {step.status === "completed" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {index < verificationSteps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 mx-4 mt-[-30px]" />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        {currentStep === 2 && !user?.isVerified && (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Baker, is it really you?</h3>
                <p className="text-muted-foreground mb-4">
                  Verifying your identity helps us prevent someone else from creating an account in your name.
                </p>
                <Button
                  onClick={handleVerifyAccount}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Verify Your Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Ready to start trading!</h3>
                <p className="text-muted-foreground mb-4">
                  Your account is verified. Add funds to begin trading with Royal Oak Capital.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Deposit Funds
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trading Platform Preview */}
        <div className="relative">
          <img
            src="https://ext.same-assets.com/2024759452/4166555805.jpeg"
            alt="Trading Platform Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">18.5M+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
