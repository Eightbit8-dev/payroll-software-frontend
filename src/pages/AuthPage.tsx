const AuthPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col items-center justify-center px-8 md:w-1/2">
        {/* Logo */}
        <div className="flex w-[400px] flex-col gap-4">
          <div className="mb-6 text-center">
            <img
              src="./icons/logo-icon.svg"
              alt="Payroll Logo"
              className="mx-auto mb-4 h-24 w-24"
            />
            <p className="text-start text-xl font-medium text-gray-500">
              Please sign in!
            </p>
            <h2 className="head mt-1 text-start text-4xl font-medium">
              Welcome to Payroll
            </h2>
          </div>

          {/* Form */}
          <div>
            <form className="flex w-full max-w-sm flex-col gap-3">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="placeholder:paragraph-large-regular mt-1 w-full rounded-lg border-2 border-gray-300 px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter email address"
                  className="placeholder:paragraph-large-regular mt-1 w-full rounded-lg border-2 border-gray-300 px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="text-m flex items-center justify-between font-medium text-gray-500">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox border-2 border-black"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  className="paragraph-medium-medium text-blue-500 hover:underline"
                >
                  I forgot my password
                </a>
              </div>

              <button
                type="submit"
                className="text-m w-full rounded-[10px] bg-blue-500 px-3.5 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Text */}
      <div className="bg-primary rounded-m relative hidden w-1/2 items-center justify-center md:flex">
        <img
          src="./images/Login-image.png"
          alt="Login art"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      </div>
    </div>
  );
};

export default AuthPage;
