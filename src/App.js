import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-center min-h-screen text-neutral-800">
        <div className="w-full lg:w-4/5">
          <div className="mt-5 p-8">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
