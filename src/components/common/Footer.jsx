
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 w-[100%] ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            © 2024 Your Company Name. All rights reserved.
          </p>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Email us:</span>
            <a
              href="mailto:contact@yourcompany.com"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              contact@yourcompany.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}