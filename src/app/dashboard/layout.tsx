import { Sidebar, TopMenu } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 bg-white p-2 pt-6 pb-5 m-2 mt-4 rounded">
          {children}
        </div>
      </div>
    </>
  );
}
