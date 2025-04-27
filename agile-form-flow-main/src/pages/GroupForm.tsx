
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface FormData {
  name: string;
  size: string;
  email: string;
  description: string;
}

const GroupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
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
    setMessage(null);
    try {
      await axios.post("http://localhost:9180/api/groups", data);
      setMessage({ type: "success", text: "Group created successfully!" });
      reset();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create group. Please try again." });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 bg-gradient-to-b from-[#1a237e] to-[#0d1442]">
      <div className="w-full max-w-md px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Create Group</h1>
        {message && (
          <div
            className={`mb-4 rounded px-3 py-2 text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
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
};

export default GroupForm;
