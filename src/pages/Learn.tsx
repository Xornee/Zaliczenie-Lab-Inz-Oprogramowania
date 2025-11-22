import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Flashcard {
  id: number;
  word: string;
  translation: string;
  example: string;
  options: string[];
}

const mockFlashcards: Flashcard[] = [
  {
    id: 1,
    word: "Collaborate",
    translation: "Współpracować",
    example: "We need to collaborate on this project.",
    options: ["Współpracować", "Konkurować", "Ignorować", "Odrzucać"],
  },
  {
    id: 2,
    word: "Implement",
    translation: "Wdrożyć",
    example: "Let's implement the new strategy next week.",
    options: ["Wdrożyć", "Usunąć", "Zapomnieć", "Odłożyć"],
  },
  {
    id: 3,
    word: "Analyze",
    translation: "Analizować",
    example: "We should analyze the data carefully.",
    options: ["Analizować", "Ignorować", "Kasować", "Zgadywać"],
  },
];

const Learn = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const card = mockFlashcards[currentCard];
  const progress = ((currentCard + 1) / mockFlashcards.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === card.translation;
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentCard < mockFlashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      toast({
        title: "Lesson Complete! 🎉",
        description: `You got ${correctCount + 1} out of ${mockFlashcards.length} correct!`,
      });
      navigate("/dashboard");
    }
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(card.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div className="flex-1 mx-8">
              <Progress value={progress} className="h-2" />
            </div>
            <span className="text-sm font-medium">
              {currentCard + 1} / {mockFlashcards.length}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="gradient-card shadow-xl">
          <CardContent className="p-8">
            {/* Question */}
            <div className="text-center mb-8">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-medium text-primary">
                  Business Vocabulary
                </span>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-4xl font-bold">{card.word}</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={speakWord}
                  className="hover:bg-primary/10"
                >
                  <Volume2 className="h-6 w-6 text-primary" />
                </Button>
              </div>
              
              <p className="text-muted-foreground italic">
                "{card.example}"
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {card.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === card.translation;
                const showCorrect = showResult && isCorrect;
                const showIncorrect = showResult && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between
                      ${showCorrect ? "border-success bg-success/10" : ""}
                      ${showIncorrect ? "border-destructive bg-destructive/10" : ""}
                      ${!showResult && isSelected ? "border-primary bg-primary/5" : ""}
                      ${!showResult && !isSelected ? "border-border hover:border-primary hover:bg-muted" : ""}
                      ${showResult ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    <span className="font-medium">{option}</span>
                    {showCorrect && <Check className="h-5 w-5 text-success" />}
                    {showIncorrect && <X className="h-5 w-5 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className="text-center">
                <div className={`inline-block px-6 py-3 rounded-lg mb-4 ${
                  selectedAnswer === card.translation 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                }`}>
                  <p className="font-semibold">
                    {selectedAnswer === card.translation ? "Correct! 🎉" : "Not quite. Keep practicing!"}
                  </p>
                </div>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleNext}
                  className="w-full"
                >
                  {currentCard < mockFlashcards.length - 1 ? "Next Card" : "Finish Lesson"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span>{correctCount} Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-destructive" />
            <span>{showResult && selectedAnswer !== card.translation ? currentCard - correctCount + 1 : currentCard - correctCount} Incorrect</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
