"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Bookmark, Star } from "lucide-react";

interface JobProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    remote: boolean;
    logo: string;
    posted: string;
    requirements: string[];
    match: number;
  };
}

export default function JobCard({ job }: JobProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {job.type}
              </Badge>
              {job.remote && (
                <Badge
                  variant="outline"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  Remote
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-auto">
                {job.posted}
              </span>
            </div>

            <div>
              <p className="text-sm">
                <span className="font-medium">Location:</span> {job.location}
              </p>
              <p className="text-sm">
                <span className="font-medium">Salary:</span> {job.salary}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {job.requirements.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(job.match / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{job.match}% Match</span>
          </div>
          <Button size="sm">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
