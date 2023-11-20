import { useState } from 'react'
import { AiOutlineHome, AiOutlinePieChart } from 'react-icons/ai'
import { BiTransfer, BiCoinStack, BiUser } from 'react-icons/bi'
import { Link, Outlet } from 'react-router-dom'

export function FunctionalIconArray() {
  const [selectedId, setSelectedId] = useState(0)
  const handleClick = (id) => {
    setSelectedId(id)
  }
  const navIcons = [
    {
      component: <AiOutlineHome key={1} />,
      linkTo: '/home'
    },
    {
      component: <AiOutlinePieChart key={2} />,
      linkTo: '/portfolio'
    },
    {
      component: <BiTransfer className='trade' key={3} />,
      linkTo: '/trade'
    },
    {
      component: <BiCoinStack key={4} />,
      linkTo: '/coins'
    },
    {
      component: <BiUser key={5} />,
      linkTo: '/profile'
    }
  ]
  return (
    <>
      <Outlet />
      <ul className='navBar'>
        {navIcons.map((icon, index) => {
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
