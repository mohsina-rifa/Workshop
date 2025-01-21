export interface Task {
  id: string;
  title: string;
  status: "assigned" | "in-progress" | "completed" | "unsuccessful";
  priority: "low" | "medium" | "high";
}
