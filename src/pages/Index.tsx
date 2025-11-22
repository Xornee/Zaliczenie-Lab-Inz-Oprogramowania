import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import trophyIcon from "@/assets/trophy-icon.png";
import flameIcon from "@/assets/flame-icon.png";
import { Sparkles, Target, Users, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero py-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Master English with{" "}
                <span className="text-gradient">Langify</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Personalized learning that adapts to your industry and lifestyle. 
                Learn faster with gamification, spaced repetition, and bite-sized lessons.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate("/auth")}
                >
                  Start Learning Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
              </div>
              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <img src={flameIcon} alt="Streak" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Daily Streaks</p>
                    <p className="text-sm text-muted-foreground">Stay motivated</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <img src={trophyIcon} alt="Rankings" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Rankings</p>
                    <p className="text-sm text-muted-foreground">Compete & win</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-in fade-in slide-in-from-right duration-700 delay-200">
              <img 
                src={heroImage} 
                alt="Learn English with Langify" 
                className="rounded-2xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Langify?</h2>
            <p className="text-xl text-muted-foreground">
              Smart features designed to make learning effective and fun
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 gradient-card hover:shadow-lg transition-all duration-300">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Micro-Learning</h3>
              <p className="text-muted-foreground">
                Short 5-10 minute sessions that fit your busy schedule
              </p>
            </Card>

            <Card className="p-6 gradient-card hover:shadow-lg transition-all duration-300">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-secondary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized</h3>
              <p className="text-muted-foreground">
                Content adapted to your industry and real-world scenarios
              </p>
            </Card>

            <Card className="p-6 gradient-card hover:shadow-lg transition-all duration-300">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compete & Win</h3>
              <p className="text-muted-foreground">
                Join leagues and challenge friends in real-time
              </p>
            </Card>

            <Card className="p-6 gradient-card hover:shadow-lg transition-all duration-300">
              <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-success w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Repetition</h3>
              <p className="text-muted-foreground">
                AI-powered spaced repetition ensures you remember what you learn
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your English?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners achieving their language goals
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate("/auth")}
            className="shadow-xl"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
