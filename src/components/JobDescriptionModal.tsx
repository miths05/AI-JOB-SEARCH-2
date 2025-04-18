"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Briefcase, MapPin, DollarSign, Clock, Star } from "lucide-react";

interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
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
    match?: number;
    description?: string;
    responsibilities?: string[];
    benefits?: string[];
  };
}

export default function JobDescriptionModal({
  isOpen,
  onClose,
  job,
}: JobDescriptionModalProps) {
  // Default description if none provided
  const description =
    job.description ||
    `${job.title} position at ${job.company}. This role requires expertise in ${job.requirements.join(", ")}. 
    The position is ${job.remote ? "remote" : "based in " + job.location} with a salary range of ${job.salary}.`;

  // Default responsibilities if none provided
  const responsibilities = job.responsibilities || [
    "Develop and maintain software applications",
    "Collaborate with cross-functional teams",
    "Write clean, efficient, and maintainable code",
    "Participate in code reviews and technical discussions",
    "Troubleshoot and debug applications",
  ];

  // Default benefits if none provided
  const benefits = job.benefits || [
    "Competitive salary and benefits package",
    "Flexible working hours",
    "Professional development opportunities",
    "Health and wellness programs",
    "Collaborative and innovative work environment",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {job.title}
              </DialogTitle>
              <DialogDescription className="text-base font-medium">
                {job.company}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>Posted {job.posted}</span>
            </div>
            {job.match && (
              <div className="flex items-center gap-1 ml-auto">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(job.match! / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{job.match}% Match</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.requirements.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">Save Job</Button>
            <Button>Apply Now</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
