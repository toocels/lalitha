// pages/internship.js
export const internships = [
  {
    id: 1,
    companyName: "Acowale",
    placeOfInternship: "Remote",
    location: "Global",
    duration: "6 months",
    inCharge: "John Doe",
    referencedBy: "Jane Smith",
    description: "Frontend Developer Internship",
    skillsRequired: ["React.js", "Next.js", "JavaScript"],
    applyLink: "https://acowale.com/apply",
    contactInfo: {
      name: "John Doe",
      phone: "+1-234-567-8901",
      email: "john.doe@acowale.com"
    }
  },
  {
    id: 2,
    companyName: "Unihox",
    placeOfInternship: "Office",
    location: "New York",
    duration: "3 months",
    inCharge: "Mike Brown",
    referencedBy: "Emily Davis",
    description: "Full Stack Developer Intern",
    skillsRequired: ["Node.js", "React.js", "Next.js"],
    applyLink: "https://unihox.com/apply",
    contactInfo: {
      name: "Mike Brown",
      phone: "+1-987-654-3210",
      email: "mike.brown@unihox.com"
    }
  },
  // Ensure ALL internships have applyLink and contactInfo fields
];
