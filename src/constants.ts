import type { HolidayDetailsResponse } from "./types/apiTypes";

export const holidays: HolidayDetailsResponse[] = [
  {
    id: 1,
    name: "New Year",
    date: "2025-01-01",
    branches: [
      [1, "Chennai"],
      [2, "Bangalore"],
    ],
    departments: [
      [2, "AML"],
      [3, "CSE"],
    ],
    month: "January",
    year: "2025",
    leaveType: "Public Holiday",
    remarks: "Celebration of New Year",
  },
  {
    id: 2,
    name: "Independence Day",
    date: "2025-08-15",
    branches: [
      [1, "Delhi"],
      [3, "Pune"],
    ],
    departments: [
      [1, "HR"],
      [4, "Finance"],
    ],
    month: "August",
    year: "2025",
    leaveType: "National Holiday",
    remarks: "Flag hoisting event",
  },
];
export const monthOptions = [
  { id: 1, label: "January" },
  { id: 2, label: "February" },
  { id: 3, label: "March" },
  { id: 4, label: "April" },
  { id: 5, label: "May" },
  { id: 6, label: "June" },
  { id: 7, label: "July" },
  { id: 8, label: "August" },
  { id: 9, label: "September" },
  { id: 10, label: "October" },
  { id: 11, label: "November" },
  { id: 12, label: "December" },
];

export const yearOptions = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  label: (2025 - i).toString(), //replace with js fun to get cur year
}));
