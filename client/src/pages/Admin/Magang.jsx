import { Button, Table } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "./../../utils/axios"
import { Link } from "react-router-dom"

const Magang = ({ verifyToken }) => {
  const [dataMagang, setDataMagang] = useState([])

  useEffect(() => {
    try {
      getData()
    } catch (error) {

    } finally {

    }
  }, [])

  const getData = async () => {
    const { data } = await axios.get(`/admin/fieldwork?type=Magang`)
    setDataMagang(data.data)
  }

  return (
    <>
      <AdminLayout verifyToken={verifyToken}>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Magang</h1>
          <Button className="bg-main-0">
            Tambah
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Nama
            </Table.HeadCell>
            <Table.HeadCell>
              Periode
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Aksi
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataMagang.map((e, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  {e.name}
                </Table.Cell>
                <Table.Cell>
                  {e.periode}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/administrator/magang/${e.uuid}`} className="font-bold text-main-0">
                    Detail
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AdminLayout>
    </>
  )
}

export default Magang
