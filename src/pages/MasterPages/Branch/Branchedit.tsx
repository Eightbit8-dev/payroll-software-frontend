import React, { useState } from 'react';
import Input from '../../../components/common/Input';
import Textarea from '../../../components/common/Textarea';

const Branchedit = () => {
  // Sample user data
  const usersData = [
    { id: 1, name: 'Sabarish Vijayakumar', role: 'Human resource manager', isChecked: false },
    { id: 2, name: 'Shanthi Saba', role: 'Human resource manager', isChecked: false },
    { id: 3, name: 'Sachin S', role: 'Human resource manager', isChecked: false },
    { id: 4, name: 'Santosh V VP', role: 'Human resource manager', isChecked: false },
    { id: 5, name: 'Panther parama', role: 'Human resource manager', isChecked: true },
    { id: 6, name: 'Santosh V VP', role: 'Human resource manager', isChecked: false },
    { id: 7, name: 'Panther parama', role: 'Human resource manager', isChecked: true },
  ];

  const [users, setUsers] = useState(usersData);

  const handleCheck = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isChecked: !user.isChecked } : user
      )
    );
  };

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div>
          <div className="flex items-start">
            <div className="flex flex-col gap-[5px]">
              <div>
                <p className="text-2xl font-bold text-zinc-800">Chennai Branch configuration</p>
              </div>
              <div>
                <p className="text-base font-medium text-slate-500">
                  Manage different office branches to streamline your organizational structure.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 rounded-[20px] px-11 py-9 gap-[10px] w-full">
          <div className="flex flex-col gap-8 w-full">
            <div>
              <p className="text-2xl font-medium text-zinc-800 text-start">Branch Details</p>
            </div>

            <div className="flex flex-wrap w-[804px] gap-4">
              <div className="w-full md:w-[48%]">
                <Input title="Company Name" inputValue={'8-Bit-Tech'} onChange={(val) => console.log(val)} type="str" prefixText="" max={100} />
              </div>
              <div className="w-full md:w-[48%]">
                <Input title="Branch Name" inputValue={'Coimbatore branch - in chennai'} onChange={(val) => console.log(val)} type="str" prefixText="" max={100} />
              </div>
              <div className="w-full md:w-[48%]">
                <Input title="Address 1" inputValue={'26,4d murugan layout coimbatore'} onChange={(val) => console.log(val)} type="str" prefixText="" max={100} />
              </div>
              <div className="w-full md:w-[48%]">
                <Input title="Address 2" inputValue={'Tamil nadu'} onChange={(val) => console.log(val)} type="str" prefixText="" max={100} />
              </div>
              <div className="w-full">
                <Textarea title="Remarks" placeholder="Please enter your remarks" inputValue={"The designation clearly outlines the individual's position and level within the organization, helping to "} onChange={(val) => console.log(val)} name="" prefixText="" maxLength={500} />
              </div>
            </div>

<div className="flex flex-col gap-[16px]">
  <div>
    <p className="text-2xl font-medium text-zinc-700">User access details</p>
  </div>

  {/* Columns Container */}
  <div className="flex gap-6">
    {Array.from({ length: Math.ceil(users.length / 5) }, (_, colIndex) => {
      const columnUsers = users.slice(colIndex * 5, colIndex * 5 + 5);

      return (
        <div
          key={colIndex}
          className="w-[400px] p-4 overflow-y-auto bg-white shadow-sm px-6 items-start rounded-[12px] space-y-4"
        >
          {columnUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 py-2"
            >
              {/* ID */}


              {/* User Info */}
              <div className="flex-1">
<div className='flex items-center gap-2'>
                                <div className="text-base font-semibold text-zinc-800">
                <p>{user.id}</p>
              </div>
                <div className="text-m font-semibold text-zinc-800">{user.name}</div>
</div>
                <div className=" ml-4 text-sm font-normal text-slate-400">{user.role}</div>
              </div>

              {/* Checkbox */}
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
                  className={`block w-5 h-5 p-[12px] border-2 rounded-[8px] cursor-pointer relative outline-none focus:outline-none ${
                    user.isChecked ? 'border-green-500 bg-green-500' : 'border-slate-300 bg-white'
                  }`}
                >
                  {user.isChecked && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>
      );
    })}
  </div>
</div>

            <div className="w-full flex justify-end gap-2">
              <button className="border cursor-pointer border-blue-500 bg-transparent text-blue-500 px-6 py-2 rounded-[10px]">
                Cancel
              </button>
              <button className="border cursor-pointer border-blue-500 bg-blue-500 text-white px-6 py-2 rounded-[10px]">
                Save Changes
              </button>
            </div>

            <div>
              <div className='flex flex-col gap-1'>
                <p className='text-2xl font-medium text-red-600'>Delete Branch</p>
                <div>
                  <p className='text-base font-medium text-slate-500'>By deleting this branch the configured users statuses will be affected, this action is irreversible</p>
                  <div>
                    <button className="border mt-1 cursor-pointer border-red-500 bg-red-500 text-white px-3 py-2 rounded-[9px]">
                    Delete Branch
                  </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branchedit;