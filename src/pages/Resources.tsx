import { useState } from "react";
import { Search, Filter, Upload, Download, FileText, File, Image, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const mockResources = [
  {
    id: "1",
    name: "Calculus_Chapter_7_Notes.pdf",
    type: "PDF",
    category: "Notes",
    size: "2.4 MB",
    uploadedBy: "Sarah Chen",
    uploadedAt: "2 days ago",
    studyGroup: "Advanced Calculus Study Group",
    icon: FileText,
  },
  {
    id: "2",
    name: "Practice_Problems_Set_3.docx", 
    type: "Word Document",
    category: "Practice",
    size: "856 KB",
    uploadedBy: "Mike Johnson", 
    uploadedAt: "5 days ago",
    studyGroup: "Advanced Calculus Study Group",
    icon: File,
  },
  {
    id: "3",
    name: "Integration_Techniques_Summary.pdf",
    type: "PDF", 
    category: "Summary",
    size: "1.8 MB",
    uploadedBy: "Emma Davis",
    uploadedAt: "1 week ago",
    studyGroup: "Advanced Calculus Study Group", 
    icon: FileText,
  },
  {
    id: "4",
    name: "Organic_Reactions_Diagram.png",
    type: "Image",
    category: "Visual Aid",
    size: "3.2 MB",
    uploadedBy: "Alex Kim",
    uploadedAt: "3 days ago", 
    studyGroup: "Organic Chemistry Lab",
    icon: Image,
  },
  {
    id: "5",
    name: "Algorithm_Explanation_Video.mp4",
    type: "Video",
    category: "Tutorial", 
    size: "45.6 MB",
    uploadedBy: "Jordan Smith",
    uploadedAt: "1 day ago",
    studyGroup: "Data Structures & Algorithms",
    icon: Video,
  },
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.studyGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory;
    const matchesType = filterType === "all" || resource.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = [...new Set(mockResources.map(r => r.category))];
  const types = [...new Set(mockResources.map(r => r.type))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Resources</h1>
              <p className="text-muted-foreground mt-1">
                Access shared files and materials from all your study groups
              </p>
            </div>
            <Button className="study-button-primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resources List */}
        <div className="space-y-4">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <resource.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 truncate">
                        {resource.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                        <span>•</span>
                        <span>by {resource.uploadedBy}</span>
                        <span>•</span>
                        <span>{resource.uploadedAt}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {resource.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          from {resource.studyGroup}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="hover:bg-primary-light">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search filters or upload a new resource.
            </p>
            <Button className="study-button-primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}