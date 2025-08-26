import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudyGroupCard } from "@/components/dashboard/StudyGroupCard";

// Mock data for study groups
const mockStudyGroups = [
  {
    id: "1",
    name: "Advanced Calculus Study Group",
    subject: "Mathematics",
    memberCount: 12,
    description: "Working through calculus problems and preparing for the final exam together.",
    lastActivity: "2 hours ago",
    isActive: true,
  },
  {
    id: "2",
    name: "Computer Science Algorithms",
    subject: "Computer Science",
    memberCount: 8,
    description: "Discussing data structures, algorithms, and coding interview preparation.",
    lastActivity: "1 day ago",
    isActive: true,
  },
  {
    id: "3",
    name: "Organic Chemistry Lab",
    subject: "Chemistry",
    memberCount: 15,
    description: "Lab reports, molecular structures, and reaction mechanisms study sessions.",
    lastActivity: "3 days ago",
    isActive: true,
  },
  {
    id: "4",
    name: "World History Discussion",
    subject: "History",
    memberCount: 6,
    description: "Essay writing, historical analysis, and exam preparation for world history.",
    lastActivity: "1 week ago",
    isActive: false,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = mockStudyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGroupClick = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here are your active study groups.
              </p>
            </div>
            <Button 
              className="study-button-primary"
              onClick={() => navigate("/create-group")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search study groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 study-input"
            />
          </div>
        </div>

        {/* Study Groups Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Your Study Groups ({filteredGroups.length})
            </h2>
          </div>

          {filteredGroups.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map((group) => (
                <StudyGroupCard
                  key={group.id}
                  {...group}
                  onClick={() => handleGroupClick(group.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No study groups found
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search terms or create a new study group."
                  : "Get started by creating your first study group!"}
              </p>
              {!searchQuery && (
                <Button 
                  className="study-button-primary mt-4"
                  onClick={() => navigate("/create-group")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Group
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}