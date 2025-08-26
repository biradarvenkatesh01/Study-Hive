import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockStudyGroups = [
  {
    id: "1",
    name: "Advanced Calculus Study Group",
    subject: "Mathematics",
    memberCount: 12,
    description: "Working through calculus problems and preparing for the final exam together.",
    isJoined: true,
  },
  {
    id: "2", 
    name: "Organic Chemistry Lab",
    subject: "Chemistry",
    memberCount: 8,
    description: "Lab experiments and reaction mechanisms study sessions.",
    isJoined: true,
  },
  {
    id: "3",
    name: "Data Structures & Algorithms",
    subject: "Computer Science", 
    memberCount: 15,
    description: "Coding practice and algorithm problem solving.",
    isJoined: false,
  },
  {
    id: "4",
    name: "Modern European History",
    subject: "History",
    memberCount: 6,
    description: "Discussion group for 19th and 20th century European events.",
    isJoined: false,
  },
];

export default function StudyGroups() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = mockStudyGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: string) => {
    // Handle joining group
    console.log("Joining group:", groupId);
  };

  const handleViewGroup = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Study Groups</h1>
              <p className="text-muted-foreground mt-1">
                Discover and join study groups for your courses
              </p>
            </div>
            <Button className="study-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search study groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Groups Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground mb-2">
                      {group.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mb-2">
                      {group.subject}
                    </Badge>
                  </div>
                  {group.isJoined && (
                    <Badge variant="default" className="bg-success text-success-foreground">
                      Joined
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Users className="w-4 h-4" />
                    <span>{group.memberCount} members</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {group.isJoined ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewGroup(group.id)}
                      >
                        <BookOpen className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="study-button-primary"
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        Join Group
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No groups found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or create a new study group.
            </p>
            <Button className="study-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}