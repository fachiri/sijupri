import Navigation from '../components/Navigation'
import Header from '../components/Header'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecondLayout = ({ children, title, backButton, rightButtonLink, rightButtonIcon, verifyToken }) => {
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

  return (
    <>
      <Header 
        title={title} 
        backButton={backButton} 
        rightButtonLink={rightButtonLink} 
        rightButtonIcon={rightButtonIcon} 
      />
      <main className="max-w-lg mx-auto px-5 sm:px-2 my-5">
        {children}
      </main>
    </>
  )
}

export default SecondLayout
