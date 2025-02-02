import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl shadow-lg text-center space-y-4 w-96">
        <Loader size="3" color="currentColor" className="mx-auto animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" stroke="none" />
            <path d="M8 14s1.533-1.166 2-1.732v-.732a4 4 0 018 0v3.953c1.533.578 2 1.732 2 2.732s-.667 2-2 2.732" />
            <path d="M12 4V2a4 4 0 00-4-4H5c-1.103 0-2 .906-2 2v16l7-3H12z" />
          </svg>
        </Loader>

        <h1 className="text-2xl font-bold">Loading...</h1>
        <p className="text-gray-600">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
}
