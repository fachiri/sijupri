import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const MainLayout = ({ children, title, verifyToken, isLoading }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      const isTokenValid = await verifyToken()
      if (!isTokenValid) {
        return navigate("/login")
      }
    }
    checkToken()
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <Header title={title} />
      {children}
      <Navigation />
    </>
  )
}

export default MainLayout
