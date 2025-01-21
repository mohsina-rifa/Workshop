export interface Task {
  id: number;
  title: string;
  status: "assigned" | "in-progress" | "completed" | "unsuccessful";
  priority: "low" | "medium" | "high";
}
