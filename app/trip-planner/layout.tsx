import Sidebar from "@/components/layout/Sidebar";

export default function TripPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-1 gap-8 2xl:gap-16 bg-neutral-300 p-5 2xl:p-10">
      <aside className="w-75 shrink-0 sticky top-[calc(var(--topbar-height)+1.25rem)] 2xl:top-[calc(var(--topbar-height)+2.5rem)] h-fit max-h-[calc(100vh-12.5rem)]  left-0">
        <Sidebar />
      </aside>
      {children}
    </div>
  );
}
