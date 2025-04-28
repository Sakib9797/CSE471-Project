
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

interface FormData {
  name: string;
  size: string;
  email: string;
  description: string;
}

export function GroupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      size: "",
      email: "",
      description: ""
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:9180/api/groups", data);
      toast.success("Group created successfully!");
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-gradient-to-b from-[#1a237e] to-[#0d1442]">
      <div className="w-full max-w-md px-4">
        <nav className="absolute top-4 left-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10"
            onClick={() => window.location.href = '/'}
          >
            Home
          </Button>
        </nav>

        <h1 className="text-4xl font-bold text-white mb-8 text-center">Create Group</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Group Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Group name is required" })}
              className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
              placeholder="Enter group name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="size" className="text-white">Group Size</Label>
            <Input
              id="size"
              type="number"
              {...register("size", { required: "Group size is required" })}
              className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
              placeholder="Enter group size"
            />
            {errors.size && (
              <p className="text-red-400 text-sm">{errors.size.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email"
                }
              })}
              className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
              placeholder="Enter contact email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Group Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              className="bg-black/30 border-gray-600 text-white placeholder:text-gray-400 focus:border-white min-h-[100px]"
              placeholder="Enter group description"
            />
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-black/40 text-white hover:bg-black/50"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Group"}
          </Button>
        </form>
      </div>
    </div>
  );
}
