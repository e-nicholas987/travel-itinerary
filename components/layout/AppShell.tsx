import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './topbar/Topbar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="max-w-360 mx-auto flex min-h-screen flex-col">
      <Topbar />
      <div className="relative flex flex-1 gap-16 bg-neutral-300 p-5 2xl:p-10">
        <Sidebar />
        <main className="rounded-cm flex-1 overflow-y-auto bg-white p-5 xl:p-8">
          {children}

          <div className="h-screen">hello</div>
          <div className="h-screen">hello</div>
        </main>
      </div>
    </div>
  );
}
