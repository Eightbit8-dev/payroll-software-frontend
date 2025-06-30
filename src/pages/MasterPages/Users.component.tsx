import type { UserDetails } from "../../utils/userData";

const UserAccessDetails = ({
  userData,
  setUserData,
}: {
  userData: UserDetails[];
  setUserData: React.Dispatch<React.SetStateAction<UserDetails[]>>;
}) => {
  const handleCheck = (id: number) => {
    setUserData(
      userData.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user,
      ),
    );
  };
  return (
    <section className="edit-access-section flex w-full flex-col gap-3">
      <h1 className="text-start text-lg font-semibold text-zinc-800">
        User access details
      </h1>
      <main className="scrollbar-visible flex max-h-[180px] w-full flex-col gap-3 overflow-y-auto">
        <fieldset className="inline-block w-full rounded-[14px] px-3">
          {userData.map((user) => (
            <article
              key={user.id}
              className="flex items-center justify-between gap-3 py-2"
            >
              <p className="w-min text-sm font-semibold text-zinc-800">
                {user.id}
              </p>
              <p className="w-full cursor-pointer text-start text-sm font-semibold text-zinc-800 hover:text-blue-500 hover:underline">
                {user.name}
              </p>
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  checked={user.isChecked}
                  onChange={() => handleCheck(user.id)}
                  className="sr-only"
                />
                <label
                  htmlFor={`user-${user.id}`}
                  className={`relative block h-5 w-5 cursor-pointer rounded-[8px] border-2 p-[12px] ${
                    user.isChecked
                      ? "border-green-500 bg-green-500"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {user.isChecked && (
                    <img
                      className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
                      src="/icons/tick-icon.svg"
                      alt="tick"
                    />
                  )}
                </label>
              </div>
            </article>
          ))}
        </fieldset>
      </main>
    </section>
  );
};

export default UserAccessDetails;
