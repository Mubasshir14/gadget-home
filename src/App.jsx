import { Outlet, useLocation } from "react-router-dom"
import Nav from "./components/Nav/Nav"
import Footer from "./components/Footer/Footer"


function App() {

  const location = useLocation();
  const noheaderfooter = location.pathname.includes('login') || location.pathname.includes('signup')

  return (
    <div>
      {noheaderfooter || <Nav />}
            <Outlet />
            {noheaderfooter || <Footer />}
    </div>
  )
}

export default App
