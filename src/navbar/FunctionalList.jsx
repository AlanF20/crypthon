import { useEffect, useState } from 'react'
import { AiOutlineHome, AiOutlinePieChart, AiOutlineDatabase } from 'react-icons/ai'
import { BiTransfer, BiCoinStack, BiUser } from 'react-icons/bi'
import { Link, Outlet } from 'react-router-dom'

export function FunctionalIconArray() {
  const [user, setUser] = useState({})
  const userId = JSON.parse(localStorage.getItem('user_id'))
  useEffect(() => {
    async function getUser() {
      const request = await fetch(`http://localhost:3000/user_profile/${userId}`)
      const response = await request.json()
      localStorage.setItem('user', JSON.stringify(response))
      setUser(response)
    }
    getUser()
  }, [userId])
  const [selectedId, setSelectedId] = useState(0)
  const handleClick = (id) => {
    setSelectedId(id)
  }
  const navIcons = [
    {
      component: <AiOutlineHome key={1} />,
      linkTo: '/crypthon/home'
    },
    {
      component: <AiOutlinePieChart key={2} />,
      linkTo: '/crypthon/portfolio'
    },
    {
      component: <BiTransfer className='trade' key={3} />,
      linkTo: '/crypthon/trade'
    },
    {
      component: <BiCoinStack key={4} />,
      linkTo: '/crypthon/coins'
    },
    {
      component: <BiUser key={5} />,
      linkTo: '/crypthon/profile'
    }
  ]
  function determineAdmin() {
    const adminLink = {
      component: <AiOutlineDatabase key={6} />,
      linkTo: '/crypthon/admin'
    }
    if (user?.admin) {
      navIcons.push(adminLink)
    }
    return navIcons
  }
  return (
    <>
      <Outlet />
      <ul className='navBar'>
        {determineAdmin().map((icon, index) => {
          return (
            <li className='navList' key={index} onClick={() => handleClick(index)} id={index}>
              <Link className={index === selectedId ? 'bx selected' : 'bx'} to={icon.linkTo}>
                {icon.component}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
