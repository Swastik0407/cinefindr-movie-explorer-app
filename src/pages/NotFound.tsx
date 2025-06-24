import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">Oops! Page not found</p>
        <a href="/" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
