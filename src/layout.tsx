import { Outlet } from "react-router-dom"
import AppHeader from "component/layout/admin/app.header"
import { useCurrentApp } from "component/context/app.context";
import { useEffect } from "react";
import { fetchAccountAPI } from "services/api";
import PacmanLoader from "react-spinners/PacmanLoader";

function Layout() {
  const { setUser, isAppLoading, setIsAppLoading, setIsAuthenticated } = useCurrentApp();

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUser(res.data.user)
        setIsAuthenticated(true);
      }
      setIsAppLoading(false)
    }

    fetchAccount();
  }, [])
  return (
    <>
      {isAppLoading === false ?
        <div>
          <AppHeader />
          <Outlet />
        </div>
        :
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <PacmanLoader
            size={30}
            color="#36d6b4"
          />
        </div>
      }
    </>
  )
}

export default Layout
