import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    const Navlink =[
        {url:'/', text:'Home'},
        {url:'/login', text:'Login'}, 
    ];

  return (
    <header>
    <div className="container flexsb">
        <div className="logo">
            <img src="/logo.PNG" alt="Company Logo" />

        </div>
        <div className="nav">
            {Navlink.map((links,i)=>(
            <Link to={links.url} key={i}>
                {links.text}
            </Link>
            ))}
        </div>
    </div>
    </header>
  )
}

export default Header