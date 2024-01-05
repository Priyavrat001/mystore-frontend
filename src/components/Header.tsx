import { Link } from "react-router-dom"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useState } from "react"

const user = { _id: "fdfd", role:"admin" }


const Header = () => {
    const [isopen, setIsopen] = useState<boolean>(false);
    const logOutHandler = ()=>{
        setIsopen(false)
    }
    return (
        <>
            <nav className="header">
                <Link to="/" onClick={()=>setIsopen(false)}>HOME</Link>
                <Link to="/search" onClick={()=>setIsopen(false)}>
                    <FaSearch />
                </Link>
                <Link to="/cart" onClick={()=>setIsopen(false)}>
                    <FaShoppingBag />
                </Link>
                {
                    user?._id ? (
                        <>
                            <button onClick={()=>setIsopen((prev)=>!prev)}>
                            <FaUser />
                            </button>
                            <dialog open={isopen}>
                                <div>
                                    {
                                        user.role === "admin" && (
                                            <Link to="/admin/dashboard">Admin</Link>
                                        )
                                    }
                                    <Link to="/orders" onClick={()=>setIsopen(false)}>Orders</Link>
                                    <button onClick={logOutHandler}>
                                        <FaSignOutAlt/>
                                    </button>
                                </div>
                            </dialog>
                        </>
                    ) : <Link to="/login" onClick={()=>setIsopen(false)}>

                        <FaSignInAlt />
                    </Link>
                }
            </nav>
        </>
    )
}

export default Header