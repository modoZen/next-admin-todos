import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { WidgetItem } from "@/components/WidgetItem";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <WidgetItem title="Usuario contecado server side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
        </div>
      </WidgetItem>
    </div>
  );
}
