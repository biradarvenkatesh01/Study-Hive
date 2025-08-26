import { Users, BookOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudyGroupCardProps {
  id: string;
  name: string;
  subject: string;
  memberCount: number;
  description?: string;
  lastActivity?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function StudyGroupCard({
  name,
  subject,
  memberCount,
  description,
  lastActivity,
  isActive = true,
  onClick
}: StudyGroupCardProps) {
  return (
    <Card 
      className="study-card cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-none tracking-tight">
              {name}
            </h3>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{subject}</span>
            </div>
          </div>
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className={isActive ? "bg-success text-success-foreground" : ""}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{memberCount} member{memberCount !== 1 ? 's' : ''}</span>
          </div>
          
          {lastActivity && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{lastActivity}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}