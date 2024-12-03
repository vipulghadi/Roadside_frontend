import { Link } from 'react-router-dom'


export default function PageNotFound() {
  return (
    <div className=" flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?height=300&width=300"
          alt="404 Illustration"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="mt-5">
          <Link
            to={"/"}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}