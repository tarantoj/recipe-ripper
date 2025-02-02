import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl shadow-lg text-center space-y-4 w-96">
        <Loader color="currentColor" className="mx-auto animate-spin"></Loader>
        <h1 className="text-2xl font-bold">Loading...</h1>
        <p className="text-gray-600">Just a sec...</p>
      </div>
    </div>
  );
}
