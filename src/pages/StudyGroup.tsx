import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  FileText, 
  Send,
  Users,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Mock data
const mockGroupData = {
  "1": {
    name: "Advanced Calculus Study Group",
    subject: "Mathematics",
    memberCount: 12,
    description: "Working through calculus problems and preparing for the final exam together.",
  }
};

const mockResources = [
  {
    id: "1",
    name: "Calculus_Chapter_7_Notes.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Sarah Chen",
    uploadedAt: "2 days ago",
  },
  {
    id: "2",
    name: "Practice_Problems_Set_3.docx",
    type: "Word Document",
    size: "856 KB",
    uploadedBy: "Mike Johnson",
    uploadedAt: "5 days ago",
  },
  {
    id: "3",
    name: "Integration_Techniques_Summary.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedBy: "Emma Davis",
    uploadedAt: "1 week ago",
  },
];

const mockMessages = [
  {
    id: "1",
    sender: "Sarah Chen",
    message: "Hey everyone! I just uploaded the Chapter 7 notes. Let me know if you have any questions about the integration techniques.",
    timestamp: "2 hours ago",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    message: "Thanks Sarah! The notes are really helpful. I'm still struggling with integration by parts though.",
    timestamp: "1 hour ago",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Mike Johnson",
    message: "I can help with integration by parts! Let's schedule a study session this weekend.",
    timestamp: "45 minutes ago",
    isOwn: false,
  },
];

export default function StudyGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  // In a real app, this would fetch data based on the ID
  const groupData = mockGroupData[id as keyof typeof mockGroupData] || mockGroupData["1"];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{groupData.name}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-muted-foreground">{groupData.subject}</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{groupData.memberCount} members</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-success text-success-foreground">
                Active
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px]">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Shared Resources</h2>
              <Button className="study-button-primary">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>

            <div className="grid gap-4">
              {mockResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{resource.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{resource.type}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                            <span>•</span>
                            <span>Uploaded by {resource.uploadedBy}</span>
                            <span>•</span>
                            <span>{resource.uploadedAt}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Group Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  {mockMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg p-3 ${
                          msg.isOwn 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {!msg.isOwn && (
                            <p className="font-medium text-sm mb-1">{msg.sender}</p>
                          )}
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-3">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-h-[44px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <Button type="submit" className="study-button-primary self-end">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-assistant" className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>AI Study Assistant</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* AI Chat Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  <div className="flex justify-start">
                    <div className="max-w-[70%]">
                      <div className="rounded-lg p-3 bg-muted text-muted-foreground">
                        <p className="font-medium text-sm mb-1">AI Assistant</p>
                        <p className="text-sm">
                          Hello! I'm your AI study assistant. I can help you with questions about your course material, 
                          explain concepts, create practice problems, and assist with study strategies. What would you like to know?
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-3">Just now</p>
                    </div>
                  </div>
                </div>

                {/* AI Message Input */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const question = formData.get('question') as string;
                  if (question.trim()) {
                    console.log("AI Question:", question);
                    (e.target as HTMLFormElement).reset();
                  }
                }} className="flex gap-2">
                  <Textarea
                    name="question"
                    placeholder="Ask the AI assistant a question..."
                    className="flex-1 min-h-[44px] max-h-[120px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                      }
                    }}
                  />
                  <Button type="submit" className="study-button-primary self-end">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}