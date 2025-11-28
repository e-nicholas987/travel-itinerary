import Button from "@/components/ui/Button";
import { RefreshCcw } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-4 px-10 bg-secondary-10 pt-(--header-offset) pb-(--footer-offset) mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Test Page</h1>

      <Button variant="white">Test Button</Button>
      <button
        type="button"
        className="flex items-center gap-2 hover:bg-primary-700 active:bg-primary-700 p-4 rounded-2xl hover:text-white active:text-white bg-primary-100 transition-colors"
      >
        <span> Button with Hover Effect</span>
        <RefreshCcw />
      </button>
      <div className="flex items-center gap-2 p-4 rounded-2xl hover:text-white active:text-white text-black hover:bg-primary-600 active:bg-primary-600 transition-colors">
        <span>Div with Hover Effect</span>
        <RefreshCcw />
      </div>
    </div>
  );
}
