
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";

export const NavBar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full" />
        </Link>

        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/create">Create Group</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/join">Join Group</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/profile">Profile</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/about">About</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
