const AuthPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        {/* Logo */}
        <div className="w-[400px] flex flex-col gap-4">
          <div className="mb-6 text-center">
            <img
              src="./icons/logo-icon.svg"
              alt="Payroll Logo"
              className="w-24 h-24 mx-auto mb-4 "
            />
            <p className="text-gray-500 text-xl font-medium text-start">
              Please sign in!
            </p>
            <h2 className="  mt-1 head text-4xl  font-medium text-start">
              Welcome to Payroll
            </h2>
          </div>

          {/* Form */}
          <div>
            <form className="w-full max-w-sm flex flex-col gap-3 ">
              <div>
                <label className="block  text-gray-700 text-lg  font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-3 mt-1  placeholder:paragraph-large-regular border-gray-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block  text-gray-700 text-lg  font-medium">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter email address"
                  className="w-full px-3 py-3 mt-1 border-gray-300 border-2 placeholder:paragraph-large-regular rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-gray-500 text-m  font-medium">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox border-2 border-black"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-blue-500 paragraph-medium-medium hover:underline"
                >
                  I forgot my password
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-3.5 bg-blue-500 text-m  font-medium text-white rounded-[10px] hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Text */}
      <div className="hidden md:flex w-1/2 bg-primary rounded-m items-center justify-center relative">
        <img
          src="./images/Login-image.png"
          alt="Login art"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
};

export default AuthPage;
