import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversity, faBriefcase, faRightFromBracket, faGauge, faCircleUser, faDatabase } from '@fortawesome/free-solid-svg-icons'
import Logo from './../assets/logo-circle.svg'
import { Button, Modal } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const AdminLayout = ({ children, verifyToken }) => {
  const [open, setOpen] = useState(true)
  const [openModal, setOpenModal] = useState(undefined)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      const isTokenValid = await verifyToken();
      if (!isTokenValid) {
        return navigate("/login")
      }
    };
    checkToken();
  }, [])

  const Menus = [
    { title: 'Dashboard', path: '/administrator/dashboard', src: <FontAwesomeIcon icon={faGauge} /> },
    { title: 'Master', path: '/administrator/master', src: <FontAwesomeIcon icon={faDatabase} /> },
    { title: 'KKN', path: '/administrator/kkn', src: <FontAwesomeIcon icon={faUniversity} /> },
    { title: 'Magang', path: '/administrator/magang', src: <FontAwesomeIcon icon={faBriefcase} /> },
    { title: 'Profile', path: '/administrator/profile', src: <FontAwesomeIcon icon={faCircleUser} />, gap: true },
  ]

  const handleLogout = () => {
    setOpenModal(undefined)
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    return navigate('/login')
  }

  return (
    <>
      <div
        className={`${open ? 'w-60' : 'w-fit'
          } sticky top-0 left-0 h-screen bg-white duration-300 border-r dark:border-gray-600 p-5 dark:bg-slate-800 z-40`}
      >
        <Link to='/'>
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            <img src={Logo} alt='Logo' className='ml-2 h-8 rounded' />
            {open && (
              <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                SIJUPRI
              </span>
            )}
          </div>
        </Link>

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <NavLink to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${location.pathname === menu.path &&
                  'bg-gray-200 dark:bg-gray-700'
                  }`}
              >
                <span className='text-gray-600 text-xl'>{menu.src}</span>
                <span
                  className={`${!open && 'hidden'
                    } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </NavLink>

          ))}
          <li
            onClick={() => setOpenModal('confirm-logout')}
            className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:bg-gray-700 mt-2 text-red-500`}
          >
            <span className='text-xl'>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span
              className={`${!open && 'hidden'
                } origin-left duration-300 hover:block`}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>

      {/* Header */}
      <div className="absolute top-0 h-screen overflow-y-scroll w-screen">
        <div
          className={`${!open ? 'pl-28' : 'pl-64'
            } py-5 bg-main-0 w-full z-30`}
        >
          <BsArrowLeftCircle
            onClick={() => setOpen(!open)}
            className={`${!open && 'rotate-180'
              } text-3xl text-secondary-0 rounded-full cursor-pointer dark:text-gray-400 dark:bg-gray-800`}
          />
        </div>

        <div className={`${!open ? 'pl-28' : 'pl-64'} w-full px-5 py-5`}>
          {children}
        </div>

      </div>

      {/* Modal */}
      <Modal
              show={openModal === 'confirm-logout'}
              size="md"
              popup
              onClose={() => setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Kamu yakin ingin keluar?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleLogout}>
                      Ya, saya yakin
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(undefined)}>
                      Batal
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
    </>
  )
}

export default AdminLayout