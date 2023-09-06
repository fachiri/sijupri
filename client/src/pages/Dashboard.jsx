import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Navigation from '../components/Navigation'
import Header from '../components/Header'

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="half-bg px-5">
        <div className="max-w-lg mx-auto flex justify-between items-center bg-[#ffffff] px-5 py-3 rounded-xl shadow border">
          <div className="grow">
            <span className="text-xs">531420003</span>
            <h2 className="font-medium">Muh. Fachry J.K. Luid</h2>
          </div>
          <button className="relative bg-[#6246ea] w-8 h-8 flex justify-center items-center rounded-lg ms-5">
            <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-[#fffffe]" />
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[.58rem] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">20</div>
          </button>
        </div>
      </div>
      <main className="mx-5 mt-5">
        <section>
          <p className="text-center">Beranda</p>
        </section>
      </main>
      <Navigation />
    </>
  )
}

export default Dashboard