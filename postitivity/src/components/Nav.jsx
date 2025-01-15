import { Link, Outlet } from "react-router-dom"

const Nav = () => {
  return (
    <div>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/workshops'>Workshops</Link>
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/newnote'>Post-A-Note</Link>
            <Link to='/'>Home</Link>
        </nav>
        <Outlet />
    </div>
  )
}
export default Nav