import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faRightFromBracket, faUnlockKeyhole, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Navigation from '../components/Navigation'
import Header from '../components/Header'

const Profile = () => {
  return (
    <>
      <Header title="PROFIL" />
      <main className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
        <section className="flex justify-between items-start max-w-lg mx-auto px-5 sm:px-2 py-3 pb-4">
          <div className="text-gray-600">
            <h2 className="text-xl font-bold">Muh. Fachry J.K. Luid</h2>
            <p className="text-lg font-medium">531420003</p>
          </div>
          <img className="w-20 h-20 rounded p-1 ring-[.17rem] ring-gray-300 dark:ring-gray-500" src="https://avatars.githubusercontent.com/u/96768471?v=4" alt="Bordered avatar" />
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
          <button type="button" className="relative text-red-500 inline-flex items-center w-full px-5 py-5 rounded-b-lg hover:bg-red-100 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-main-0 focus:text-main-0 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
            <FontAwesomeIcon icon={faRightFromBracket} className="w-10" />
            Keluar
          </button>
        </div>
      </main>
      <Navigation />
    </>
  )
}

export default Profile