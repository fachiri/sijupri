import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import Navigation from '../components/Navigation'
import Header from '../components/Header'

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="half-bg">
        <div className="flex justify-between items-center bg-[#ffffff] px-5 py-3 mx-5 rounded-xl shadow border">
          <div className="grow">
            <span className="text-xs">531420003</span>
            <h2 className="font-medium">Muh. Fachry J.K. Luid</h2>
          </div>
          <button className="bg-[#6246ea] w-8 h-8 flex justify-center items-center rounded-lg ms-5">
            <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-[#fffffe]" />
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