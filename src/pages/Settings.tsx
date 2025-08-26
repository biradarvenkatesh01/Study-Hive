import { useState } from "react";
import { Save, User, Bell, Shield, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@university.edu",
    university: "University of Technology",
    major: "Computer Science",
    bio: "Third-year CS student passionate about algorithms and machine learning.",
  });

  const [notifications, setNotifications] = useState({
    groupMessages: true,
    fileUploads: true,
    studyReminders: false,
    emailDigest: true,
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    timezone: "EST",
  });

  const handleSaveProfile = () => {
    console.log("Saving profile:", profileData);
  };

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications);
  };

  const handleSavePreferences = () => {
    console.log("Saving preferences:", preferences);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account preferences and application settings
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={profileData.university}
                    onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input
                    id="major"
                    value={profileData.major}
                    onChange={(e) => setProfileData({...profileData, major: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder="Tell others about yourself..."
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleSaveProfile} className="study-button-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Group Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone sends a message in your study groups
                  </p>
                </div>
                <Switch
                  checked={notifications.groupMessages}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, groupMessages: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>File Uploads</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new resources are uploaded to your groups
                  </p>
                </div>
                <Switch
                  checked={notifications.fileUploads}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, fileUploads: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Study Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders for upcoming study sessions and deadlines
                  </p>
                </div>
                <Switch
                  checked={notifications.studyReminders}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, studyReminders: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Email Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of your study group activity
                  </p>
                </div>
                <Switch
                  checked={notifications.emailDigest}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, emailDigest: checked})
                  }
                />
              </div>

              <Button onClick={handleSaveNotifications} className="study-button-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Notifications
              </Button>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) => 
                    setPreferences({...preferences, theme: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={preferences.language} onValueChange={(value) => 
                    setPreferences({...preferences, language: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => 
                    setPreferences({...preferences, timezone: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="CST">Central Time</SelectItem>
                      <SelectItem value="MST">Mountain Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSavePreferences} className="study-button-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full sm:w-auto">
                Change Password
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Enable Two-Factor Authentication
              </Button>
              <Separator />
              <Button variant="destructive" className="w-full sm:w-auto">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}