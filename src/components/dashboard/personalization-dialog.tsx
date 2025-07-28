"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"
import { ChevronRight, CheckCircle } from "lucide-react"

interface PersonalizationDialogProps {
  open: boolean
  onClose: () => void
}

const questions = [
  {
    id: 1,
    title: "What's your trading experience?",
    options: [
      { id: "beginner", label: "Beginner", description: "New to trading" },
      { id: "intermediate", label: "Intermediate", description: "Some trading experience" },
      { id: "advanced", label: "Advanced", description: "Experienced trader" },
    ],
  },
  {
    id: 2,
    title: "What are your investment goals?",
    options: [
      { id: "growth", label: "Long-term Growth", description: "Build wealth over time" },
      { id: "income", label: "Generate Income", description: "Regular dividends/returns" },
      { id: "speculation", label: "Active Trading", description: "Short-term opportunities" },
    ],
  },
  {
    id: 3,
    title: "What's your risk tolerance?",
    options: [
      { id: "conservative", label: "Conservative", description: "Prefer stable, low-risk investments" },
      { id: "moderate", label: "Moderate", description: "Balanced risk and return" },
      { id: "aggressive", label: "Aggressive", description: "Higher risk for higher potential returns" },
    ],
  },
  {
    id: 4,
    title: "Which markets interest you most?",
    options: [
      { id: "stocks", label: "Stocks & ETFs", description: "Traditional equity markets" },
      { id: "crypto", label: "Cryptocurrency", description: "Digital assets and tokens" },
      { id: "forex", label: "Forex", description: "Currency trading" },
      { id: "commodities", label: "Commodities", description: "Gold, oil, agricultural products" },
    ],
  },
]

export function PersonalizationDialog({ open, onClose }: PersonalizationDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const { updateUser } = useAuth()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handleComplete = () => {
    updateUser({ hasCompletedOnboarding: true })
    toast.success("Welcome to Royal Oak Capital! Your dashboard is ready.")
    onClose()
  }

  const isCompleted = Object.keys(answers).length === questions.length

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Personalize your experience</DialogTitle>
          <DialogDescription>
            We're going to ask you a few questions to get you through the account set up process,
            and suggest what strategy that fits you best.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="mb-8" />

          {isCompleted ? (
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Setup Complete!</CardTitle>
                <CardDescription>
                  Based on your answers, we've customized your dashboard with relevant tools and insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleComplete} className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].title}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <Card
                    key={option.id}
                    className="cursor-pointer transition-all hover:shadow-md border-2 hover:border-blue-200 dark:hover:border-blue-800"
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{option.label}</h4>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
