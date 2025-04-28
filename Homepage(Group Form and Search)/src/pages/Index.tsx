
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { SocialLinks } from "@/components/SocialLinks";

const Index = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-700 to-blue-600">
      <NavBar />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          WELCOME USER
        </h1>
        <Button asChild className="bg-black/20 hover:bg-black/30 text-white">
          <Link to="/join">
            <UserPlus className="mr-2" />
            JOIN GROUP
          </Link>
        </Button>
      </main>

      <SocialLinks />
    </div>
  );
};

export default Index;
