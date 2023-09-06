import Navigation from '../components/Navigation'
import Header from '../components/Header'

const Activity = () => {
  return (
    <>
      <Header title="KEGIATAN" />
      <main className="max-w-lg mx-auto px-5 sm:px-2 mt-5 pb-20">
        <ul className="text-sm mb-6 font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <button className="inline-block w-full p-4 text-gray-900 bg-gray-100 rounded-l-lg active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Semua</button>
          </li>
          <li className="w-full">
            <button className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">Magang</button>
          </li>
          <li className="w-full">
            <button className="inline-block w-full p-4 bg-white hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">KKN</button>
          </li>
        </ul>
        <section>
          <div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 font-medium">Hari ini</p>
            </div>
            <div className="flex space-x-5 mb-5">
              <img className="h-max w-1/3 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="Activity Image" />
              <div>
                <h3 className="text-xl font-bold mb-1 line-clamp-1">Apel Pagi</h3>
                <div className="mb-1">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Magang
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400">
                    07:00 - 07:35
                  </span>
                </div>
                <p className="text-sm line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, odio magni, omnis expedita eum molestiae corrupti consectetur dolor doloribus beatae veritatis minima dicta voluptates rem alias quae saepe! Voluptatem.</p>
              </div>
            </div>
            <div className="flex space-x-5 mb-5">
              <img className="h-max w-1/3 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="Activity Image" />
              <div>
                <h3 className="text-xl font-bold mb-1 line-clamp-1">Lorem ipsum dolor sit amet consectetur</h3>
                <div className="mb-1">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Magang
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400">
                    07:00 - 07:35
                  </span>
                </div>
                <p className="text-sm line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, odio magni, omnis expedita eum molestiae corrupti consectetur dolor doloribus beatae veritatis minima dicta voluptates rem alias quae saepe! Voluptatem.</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 font-medium">Kemarin</p>
            </div>
            <div className="flex space-x-5 mb-5">
              <img className="h-max w-1/3 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="Activity Image" />
              <div>
                <h3 className="text-xl font-bold mb-1 line-clamp-1">Lorem ipsum dolor sit amet consectetur</h3>
                <div className="mb-1">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    Magang
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400">
                    07:00 - 07:35
                  </span>
                </div>
                <p className="text-sm line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, odio magni, omnis expedita eum molestiae corrupti consectetur dolor doloribus beatae veritatis minima dicta voluptates rem alias quae saepe! Voluptatem.</p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-500 font-medium">04 September 2023</p>
            </div>
            <div className="flex space-x-5 mb-5">
              <img className="h-max w-1/3 rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="Activity Image" />
              <div>
                <h3 className="text-xl font-bold mb-1 line-clamp-1">Lorem ipsum dolor sit amet consectetur</h3>
                <div className="mb-1">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    KKN
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400">
                    07:00 - 07:35
                  </span>
                </div>
                <p className="text-sm line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, modi, odio magni, omnis expedita eum molestiae corrupti consectetur dolor doloribus beatae veritatis minima dicta voluptates rem alias quae saepe! Voluptatem.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Navigation />
    </>
  )
}

export default Activity