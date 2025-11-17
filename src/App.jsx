import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout";
import HomePage from "./components/pages/home-page";
import OnBoarding from "./components/pages/onboarding";
import JobListing from "./components/pages/job-listing";
import PostJob from "./components/pages/post-job";
import SavedJobs from "./components/pages/saved-job";
import JobPage from "./components/pages/job";
import MyJobs from "./components/pages/my-jobs";
import './App.css';
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/onboarding",
          element: <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        },
        {
          path: "/jobs",
          element: <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        },
        {
          path: "/job/:id",
          element: <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        },
        {
          path: "/post-job",
          element: <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        },
        {
          path: "/saved-jobs",
          element: <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        },
        {
          path: "my-jobs",
          element: <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        }
      ],
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  
);
}

export default App;
