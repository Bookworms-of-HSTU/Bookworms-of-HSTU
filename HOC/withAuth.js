import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../lib/AuthContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (loading) return; // Do nothing while loading

      // If user is not logged in, and not on the login page, redirect to login
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      // If user is logged in, but not an admin, and not on the unauthorized page, redirect
      else if (user && !user.admin && pathname !== "/unauthorized") {
        router.push("/unauthorized");
      }
      // If the user is logged in and is an admin, but is trying to access the login page, redirect to admin dashboard
      else if (user && user.admin && pathname === "/admin/login") {
        router.push("/admin");
      }

    }, [user, loading, router, pathname]);

    // While loading, or if a redirect is imminent, show nothing to prevent flashes of content
    if (loading || (!user && pathname !== "/admin/login") || (user && !user.admin && pathname !== "/unauthorized")) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
