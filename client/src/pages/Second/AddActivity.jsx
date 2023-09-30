import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import SecondLayout from '../../layouts/SecondLayout';
import Alert from '../../components/Alert';
import axios from './../../utils/axios'

const AddActivity = ({ verifyToken }) => {
  const [formData, setFormData] = useState({
    groupId: '',
    start: '00:00',
    end: '00:00',
    name: '',
    desc: '',
    location: '',
    outcome: '',
    note: '',
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setShowAlertMessage] = useState(null)
  const [userFieldWorks, setUserFieldWorks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserFieldwork()
  }, [])

  const getUserFieldwork = async () => {
    try {
      setIsLoading(true)
      const userData = JSON.parse(localStorage.getItem('userData'))
      const { data } = await axios.get(`/user/${userData.uuid}/groups`)
      setUserFieldWorks(data.data)
    } catch (error) {
      setShowAlertMessage(error.response?.data?.message || error.message)
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)

      const formDataObject = new FormData();
      const fields = ['groupId', 'start', 'end', 'name', 'desc', 'location', 'outcome', 'note'];

      fields.forEach(field => {
        formDataObject.append(field, formData[field]);
      });

      formDataObject.append('file', selectedFile)
      formDataObject.append('userId', JSON.parse(localStorage.getItem('userData')).uuid)

      const response = await axios.post('journal/add', formDataObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      console.log(response)
    } catch (error) {
      setShowAlertMessage(error.response?.data?.message || error.message)
      setShowAlert(true)
      window.scrollTo(0, 0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const allowedTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/gif"]
      if (!allowedTypes.includes(file.type)) {
        setShowAlertMessage('Jenis file tidak didukung. Pilih file dalam format SVG, PNG, JPG, atau GIF.')
        setShowAlert(true)
        e.target.value = null
        setSelectedFile(null)
        window.scrollTo(0, 0)
        return
      }

      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        setShowAlertMessage('Ukuran file terlalu besar. Maksimal 2MB.')
        setShowAlert(true)
        e.target.value = null
        setSelectedFile(null)
        window.scrollTo(0, 0)
        return
      }

      setSelectedFile(file)
    }
  }

  return (
    <>
      <SecondLayout
        title="Tambah Kegiatan"
        backButton={true}
        rightButtonLink="/bantuan/tambah-kegiatan"
        rightButtonIcon={
          <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4 text-[#fffffe]" />
        }
        verifyToken={verifyToken}
        isLoading={isLoading}
      >
        {showAlert && <Alert color="failure" onDismiss={() => setShowAlert(false)} alertMessage={alertMessage} />}
        <section className="mt-10">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-6 group">
              <label htmlFor="groupId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Jenis Kegiatan</label>
              <select
                id="groupId"
                name="groupId"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                onChange={(e) => setFormData({ ...formData, groupId: e.target.value })}
                value={formData.groupId}
              >
                <option value="" hidden>Pilih Jenis Kegiatan</option>
                {userFieldWorks.map((userFieldWork, key) => (
                  <option key={key} value={userFieldWork.uuid}>
                    {userFieldWork.fieldwork.name} ({userFieldWork.fieldwork.periode})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="time"
                  name="start"
                  id="start"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                  defaultValue="00:00"
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                />
                <label
                  htmlFor="start"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mulai
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="time"
                  name="end"
                  id="end"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                  defaultValue="00:00"
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                />
                <label
                  htmlFor="end"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Selesai
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nama Kegiatan
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                name="desc"
                id="desc"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
                rows="4"
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              ></textarea>
              <label
                htmlFor="desc"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Deskripsi Kegiatan
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="location"
                id="location"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <label
                htmlFor="location"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Lokasi
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                name="outcome"
                id="outcome"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                max={100}
                min={1}
              />
              <label
                htmlFor="outcome"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Capaian
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                name="note"
                id="note"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main-0 peer"
                placeholder=""
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows="4"
              ></textarea>
              <label
                htmlFor="note"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main-0 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Keterangan (Opsional)
              </label>
            </div>
            <div className="flex items-center justify-center w-full mb-6">
              <label htmlFor="dropzone-file" className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                {selectedFile && (
                  <div className="absolute z-0">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview Image"
                      className="w-full opacity-20"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload Dokumentasi</span> atau <i>Drag and Drop</i> disini</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="dokumentasi"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e)}
                />
              </label>
            </div>

            <button type="submit" className="text-white bg-main-0 hover:bg-main-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-main-0 dark:hover:bg-main dark:focus:ring-blue-800">Submit</button>
          </form>
        </section>
      </SecondLayout>
    </>
  )
}

export default AddActivity