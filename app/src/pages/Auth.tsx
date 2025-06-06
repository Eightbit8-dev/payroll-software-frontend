

const Auth = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        {/* Logo */}
        <div className="w-[400px]">
        <div className="mb-6 text-center">
          <img
            src="./Images/logo.svg"
            alt="Payroll Logo"
            className="w-24 h-24 mx-auto mb-2"/>
          <p className="text-gray-500 body-1 text-start">Please sign in!</p>
          <h2 className="text-2xl font-semibold mt-1 headline-5 text-start">Welcome to Payroll</h2>
        </div>

        {/* Form */}
        <form className="w-full max-w-sm space-y-4">
          <div>
            <label className="block  text-gray-700 button-m">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-3 mt-1 button-s  border-black border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block  text-gray-700  button-m">Password</label>
            <input
              type="password"
              placeholder="Enter email address"
              className="w-full px-3 py-3 mt-1 border-black button-s border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              I forgot my password
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
       </div>
      </div>

      {/* Right Side - Image & Text */}
      <div className="hidden md:flex w-1/2 bg-primary rounded-m items-center justify-center relative">
        <img
          src="./Images/Login-image.svg"
          alt="Login art"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />  
      </div>
    </div>
  );
};

export default Auth;
