import { Button, Table } from "flowbite-react"
import AdminLayout from "../../layouts/AdminLayout"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import { Link, useParams } from "react-router-dom"

const MagangDetail = ({ verifyToken }) => {
  const [dataGroups, setDataGroups] = useState([])
  const { fieldworkId } = useParams()

  useEffect(() => {
    try {
      getData()
    } catch (error) {

    } finally {

    }
  }, [])

  const getData = async () => {
    const { data } = await axios.get(`/admin/groups/${fieldworkId}`)
    setDataGroups(data.data)
  }

  return (
    <>
      <AdminLayout verifyToken={verifyToken}>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl">Kelompok Magang</h1>
          <Button className="bg-main-0">
            Import 
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              NIM
            </Table.HeadCell>
            <Table.HeadCell>
              Nama
            </Table.HeadCell>
            <Table.HeadCell>
              Lokasi
            </Table.HeadCell>
            <Table.HeadCell>
              Pembimbing 1
            </Table.HeadCell>
            <Table.HeadCell>
              Pembimbing 2
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dataGroups.map((e, idx) => (
              <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  
                </Table.Cell>
                <Table.Cell>
                  
                </Table.Cell>
                <Table.Cell>
                  {e.location}
                </Table.Cell>
                <Table.Cell>
                  {e.pembimbing1}
                </Table.Cell>
                <Table.Cell>
                  {e.pembimbing2}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AdminLayout>
    </>
  )
}

export default MagangDetail
