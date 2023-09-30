import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import MainLayout from '../../layouts/MainLayout'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = ({ verifyToken }) => {
  return (
    <>
      <MainLayout verifyToken={verifyToken}>
        <div className="half-bg px-5">
          <div className="max-w-lg mx-auto flex justify-between items-center bg-[#ffffff] px-5 py-3 rounded-xl shadow border">
            <div className="grow">
              <span className="text-xs">531420003</span>
              <h2 className="font-medium">Muh. Fachry J.K. Luid</h2>
            </div>
            <button className="relative bg-[#6246ea] w-8 h-8 flex justify-center items-center rounded-lg ms-5">
              <FontAwesomeIcon icon={faBell} className="w-4 h-4 text-[#fffffe]" />
              <div className="absolute inline-flex items-center justify-center w-3 h-3 font-bold text-white bg-red-500 border border-white rounded-full -top-1 -right-1 dark:border-gray-900"></div>
            </button>
          </div>
        </div>
        <div className="mx-5 mt-5">
          <section>
            <p className="text-center">Beranda</p>
          </section>
        </div>
      </MainLayout>
    </>
  )
}

export default Dashboard