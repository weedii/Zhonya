import React from "react";

interface userDataProps {
  email: string;
  id: number;
  name: string;
  role: string;
}

const UsersTable = ({ userData }: { userData: userDataProps[] }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-600/30">
          <tr>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Action
            </th> */}
          </tr>
        </thead>
        <tbody>
          {userData.map((user, idx) => (
            <tr
              key={idx}
              className="odd:bg-white odd:dark:bg-gray-600/10 even:bg-gray-50 even:dark:bg-gray-600/25 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {user.id}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.role}</td>
              {/* <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
