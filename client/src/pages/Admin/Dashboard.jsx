import AdminLayout from "../../layouts/AdminLayout"

const Dashboard = ({ verifyToken }) => {
  return (
    <>
      <AdminLayout verifyToken={verifyToken}>
        Halaman Admin 
      </AdminLayout>
    </>
  )
}

export default Dashboard
