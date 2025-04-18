"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import {
  Bell,
  Bookmark,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Home,
  LogOut,
  Search,
  Settings,
  User,
  Sun,
  Moon,
  InfoIcon,
  FileUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import JobCard from "@/components/job-card";
import FilterPanel from "@/components/filter-panel";
import Profile from "@/components/Profile";
import JobDescriptionModal from "@/components/JobDescriptionModal";

interface DashboardContentProps {
  user: any;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const supabase = createClient();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("recommended");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [searchValue, setSearchValue] = useState("");

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      remote: true,
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=techcorp",
      posted: "2 days ago",
      requirements: ["React", "TypeScript", "Tailwind CSS"],
      match: 95,
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataSystems Ltd.",
      location: "New York, NY",
      salary: "$130,000 - $160,000",
      type: "Full-time",
      remote: false,
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=datasystems",
      posted: "1 day ago",
      requirements: ["Node.js", "Python", "AWS"],
      match: 88,
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Solutions",
      location: "Remote",
      salary: "$90,000 - $120,000",
      type: "Contract",
      remote: true,
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=creative",
      posted: "3 days ago",
      requirements: ["Figma", "Adobe XD", "User Research"],
      match: 92,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Austin, TX",
      salary: "$140,000 - $170,000",
      type: "Full-time",
      remote: true,
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=cloudtech",
      posted: "5 days ago",
      requirements: ["Kubernetes", "Docker", "CI/CD"],
      match: 85,
    },
  ];

  // Mock data for saved searches
  const savedSearches = [
    {
      id: 1,
      name: "Frontend Developer",
      location: "San Francisco",
      results: 42,
    },
    { id: 2, name: "Remote UX Designer", location: "Remote", results: 28 },
    { id: 3, name: "Backend Engineer", location: "New York", results: 35 },
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "job",
      message:
        "New job matching your profile: Senior Frontend Developer at TechCorp",
      time: "2 hours ago",
      details: "Detailed information about this job alert.",
    },
    {
      id: 2,
      type: "application",
      message:
        "Your application for Backend Engineer at DataSystems has been viewed",
      time: "1 day ago",
      details: "Detailed information about your application status.",
    },
    {
      id: 3,
      type: "alert",
      message:
        "Salary alert: Frontend Developer salaries have increased by 5% in your area",
      time: "3 days ago",
      details: "Detailed salary trend information.",
    },
  ];

  // Detailed Quick Stats Panel - New Feature
  const StatsCard = ({
    label,
    value,
    chart,
  }: {
    label: string;
    value: number;
    chart: React.ReactNode;
  }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {value}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
      <div className="mt-4">{chart}</div>
    </div>
  );

  // Dummy SVG charts for the stats
  const totalJobsChart = (
    <svg viewBox="0 0 100 30" className="w-full h-24">
      <rect x="10" y="10" width="10" height="20" fill="#34d399" />
      <rect x="30" y="5" width="10" height="25" fill="#34d399" />
      <rect x="50" y="15" width="10" height="15" fill="#34d399" />
      <rect x="70" y="8" width="10" height="22" fill="#34d399" />
    </svg>
  );

  const savedSearchesChart = (
    <svg viewBox="0 0 100 30" className="w-full h-24">
      <polyline
        points="0,25 20,15 40,18 60,10 80,12 100,5"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="2"
      />
    </svg>
  );

  const notificationsChart = (
    <svg viewBox="0 0 36 36" className="w-full h-24">
      <circle
        cx="18"
        cy="18"
        r="15.9155"
        fill="transparent"
        stroke="#d1d5db"
        strokeWidth="4"
      />
      <circle
        cx="18"
        cy="18"
        r="15.9155"
        fill="transparent"
        stroke="#f87171"
        strokeWidth="4"
        strokeDasharray="70, 100"
        strokeDashoffset="25"
      />
    </svg>
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen bg-gradient-to-r from-gray-50 to-gray-100 dark:bg-gray-900 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        {/* Sidebar */}
        <aside
          className={`${isSidebarCollapsed ? "w-20" : "w-64"} border-r bg-white dark:bg-gray-800 p-6 flex flex-col shadow-lg transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              {!isSidebarCollapsed && (
                <h1 className="text-xl font-bold">Job Finder</h1>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="p-1"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
          </div>
          <nav className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="justify-start hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                {!isSidebarCollapsed && "Dashboard"}
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:scale-105 transition-transform"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              {!isSidebarCollapsed && "My Jobs"}
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:scale-105 transition-transform"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              {!isSidebarCollapsed && "Saved Jobs"}
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:scale-105 transition-transform"
            >
              <Bell className="mr-2 h-4 w-4" />
              {!isSidebarCollapsed && "Notifications"}
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:scale-105 transition-transform"
            >
              <Settings className="mr-2 h-4 w-4" />
              {!isSidebarCollapsed && "AI Preferences"}
            </Button>
            <Button
              variant="ghost"
              className="justify-start hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/dashboard/upload-resume">
                <FileUp className="mr-2 h-4 w-4" />
                {!isSidebarCollapsed && "Upload Resume"}
              </Link>
            </Button>
          </nav>
          <div className="mt-auto">
            <Separator className="my-4" />
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="hover:scale-105 transition-transform">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {!isSidebarCollapsed && (
                <div>
                  <p className="text-sm font-medium">
                    {user.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full justify-start hover:scale-105 transition-transform"
              onClick={async () => {
                await supabase.auth.signOut();
                router.refresh();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!isSidebarCollapsed && "Log Out"}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto dark:bg-gray-900 transition-colors duration-300">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b p-4 shadow-md transition-colors duration-300">
            <div className="flex justify-between items-center">
              <div className="relative w-1/3">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for jobs..."
                  className="pl-9 border rounded-md shadow-sm focus:shadow-lg transition-all"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="hover:scale-105 transition-transform"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hover:scale-105 transition-transform"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform"
                  onClick={() => {
                    setShowProfile(true);
                    setActiveTab("profile");
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </div>
            </div>
          </header>

          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4">
              <FilterPanel />
            </div>
          )}

          {/* Detailed Quick Stats Panel */}
          <section className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatsCard
                label="Total Jobs"
                value={jobs.length}
                chart={totalJobsChart}
              />
              <StatsCard
                label="Saved Searches"
                value={savedSearches.length}
                chart={savedSearchesChart}
              />
              <StatsCard
                label="Notifications"
                value={notifications.length}
                chart={notificationsChart}
              />
            </div>
          </section>

          {/* Dashboard Tabs & Content */}
          <section className="p-6">
            {showProfile ? (
              <div>
                <div className="flex items-center mb-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowProfile(false);
                      setActiveTab("recommended");
                    }}
                    className="mr-2"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    User Profile
                  </h2>
                </div>
                <Profile user={user} />
              </div>
            ) : (
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="saved">Saved Searches</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Sort by:
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 hover:scale-105 transition-transform"
                    >
                      Relevance <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <TabsContent value="recommended" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                      AI-Recommended Jobs
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Based on your skills and preferences
                    </p>
                    <div
                      style={{ perspective: "1000px" }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Trending in Your Field
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {jobs.slice(0, 2).map((job) => (
                        <JobCard key={`trending-${job.id}`} job={job} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="saved" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Your Saved Searches
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedSearches.map((search) => (
                      <Card
                        key={search.id}
                        className="hover:scale-105 transition-transform shadow-md"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                                {search.name}
                              </h3>
                              <p className="text-muted-foreground">
                                {search.location}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Badge variant="secondary">
                                  {search.results} results
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Updated 2 hours ago
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:scale-105 transition-transform"
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="default"
                                className="hover:scale-105 transition-transform"
                                onClick={() => {
                                  // Find a job that matches this search criteria
                                  const matchingJob =
                                    jobs.find(
                                      (job) =>
                                        job.title
                                          .toLowerCase()
                                          .includes(
                                            search.name.toLowerCase(),
                                          ) ||
                                        job.location
                                          .toLowerCase()
                                          .includes(
                                            search.location.toLowerCase(),
                                          ),
                                    ) || jobs[0];

                                  setSelectedJob({
                                    ...matchingJob,
                                    description: `This is a detailed description for the ${search.name} position in ${search.location}. The role involves working with cutting-edge technologies and collaborating with talented professionals in the field.`,
                                    responsibilities: [
                                      `Lead ${search.name} initiatives and projects`,
                                      "Collaborate with cross-functional teams",
                                      "Implement best practices and standards",
                                      "Mentor junior team members",
                                      "Stay updated with industry trends",
                                    ],
                                    benefits: [
                                      "Competitive salary and benefits package",
                                      "Flexible working arrangements",
                                      "Professional development opportunities",
                                      "Health and wellness programs",
                                      "Collaborative work environment",
                                    ],
                                  });
                                }}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notifications" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Your Notifications
                  </h2>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <Card
                        key={notification.id}
                        className="hover:scale-105 transition-transform shadow-md cursor-pointer"
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {notification.type === "job" && (
                                <Briefcase className="h-5 w-5 text-blue-500" />
                              )}
                              {notification.type === "application" && (
                                <User className="h-5 w-5 text-green-500" />
                              )}
                              {notification.type === "alert" && (
                                <Bell className="h-5 w-5 text-amber-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:scale-105 transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedNotification(notification);
                              }}
                            >
                              Mark as read
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </section>
        </main>
      </div>

      {/* Notification Details Modal */}
      {selectedNotification && (
        <Dialog open={true} onOpenChange={() => setSelectedNotification(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Notification Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {selectedNotification.details}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-gray-800 dark:text-gray-200">
                {selectedNotification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedNotification.time}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setSelectedNotification(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Job Description Modal */}
      {selectedJob && (
        <JobDescriptionModal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          job={selectedJob}
        />
      )}
    </div>
  );
}
