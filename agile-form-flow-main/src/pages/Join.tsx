
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Join = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupCode, setGroupCode] = useState("");

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups", searchQuery],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:9180/api/groups/search?q=${searchQuery}`);
      return response.data;
    },
    enabled: searchQuery.length > 0
  });

  const handleJoinWithCode = async () => {
    try {
      const response = await axios.post("http://localhost:9180/api/groups/join", { code: groupCode });
      toast.success(`Successfully joined ${response.data.group.name}!`);
      setGroupCode("");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to join group");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Join a Group</h1>

      <div className="space-y-8">
        {/* Join with Code Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Join with Code</h2>
          <div className="flex gap-4">
            <Input
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              placeholder="Enter group code"
              className="flex-1"
            />
            <Button onClick={handleJoinWithCode} disabled={!groupCode}>
              <UserPlus className="mr-2" />
              Join Group
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Search Groups</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by group name..."
              className="pl-10"
            />
          </div>

          {isLoading && <p className="text-center text-gray-500">Loading...</p>}

          {groups?.length === 0 && searchQuery && (
            <Alert>
              <AlertDescription>No groups found matching "{searchQuery}"</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {groups?.map((group: any) => (
              <div key={group.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <p className="text-gray-600">{group.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {group.members}/{group.size} members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
