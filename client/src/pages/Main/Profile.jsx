import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faRightFromBracket, faUnlockKeyhole, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import MainLayout from '../../layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import axios from './../../utils/axios'
import { randomString } from '../../utils/generate'

const Profile = ({ verifyToken }) => {
  const [openModal, setOpenModal] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: null,
    idNumber: null,
    avatar: null
  })
  const [avatarId, setAvatarId] = useState(localStorage.getItem('avatarId'))
  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      const user = JSON.parse(localStorage.getItem('userData'))
      const { data } = await axios.get(`/user/${user.uuid}/${user.role}`)
      setProfile({
        name: data.data.name,
        idNumber: data.data.idNumber,
        avatar: data.data.avatar
      })
    }
    try {
      setIsLoading(true)
      getProfile()
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleChangeAvatar = () => {
    try {
      setOpenModal(undefined)
      setIsLoading(true)
      const newAvatarId = randomString(10)
      setAvatarId(newAvatarId)
      localStorage.setItem('avatarId', newAvatarId)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setOpenModal(undefined)
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    return navigate('/login')
  }

  return (
    <>
      <MainLayout 
        title="PROFIL"
        verifyToken={verifyToken}
        isLoading={isLoading}
      >
        <main className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
          <section className="flex justify-between items-start max-w-lg mx-auto px-5 sm:px-2 py-3 pb-4">
            <div className="text-gray-600">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-lg font-medium">{profile.idNumber}</p>
            </div>
            <img onClick={() => setOpenModal('change-image')} className="cursor-pointer w-20 h-20 rounded p-1 ring-2 border-4 border-white ring-gray-300 dark:ring-gray-500 bg-purple-200" src={profile.avatar ?? `https://robohash.org/${avatarId}`} alt="Profil" />
            <Modal
              show={openModal === 'change-image'}
              size="md"
              popup
              onClose={() => setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="flex justify-center space-x-4 py-3">
                  <Button color="gray">
                    Upload Foto
                  </Button>
                  <Button onClick={handleChangeAvatar} color="gray">
                    Ganti Avatar
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </section>
          <div className="text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faUser} className="w-10" />
              Informasi Akun
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faKey} className="w-10" />
              Ganti Password
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faUnlockKeyhole} className="w-10" />
              Lupa Password
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faCircleQuestion} className="w-10" />
              Bantuan
            </button>
            <button type="button" className="relative text-gray-600 inline-flex items-center w-full px-5 py-5 border-b border-gray-200 hover:bg-gray-100 hover:text-main-0 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faCircleInfo} className="w-10" />
              Tentang
            </button>
            <button
              onClick={() => setOpenModal('confirm-logout')}
              className="relative text-red-500 inline-flex items-center w-full px-5 py-5 rounded-b-lg hover:bg-red-100 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
              <FontAwesomeIcon icon={faRightFromBracket} className="w-10" />
              Keluar
            </button>
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
          </div>
        </main>
      </MainLayout>
    </>
  )
}

export default Profile