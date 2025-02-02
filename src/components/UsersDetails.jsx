const UsersDetails = ({user}) => {
  return (
      <ul className='mb-12 space-y-4 lg:w-[500px]'>
          {/* First Name */}
          <li className='font-semibold'>
              <label htmlFor='fname'>First Name</label>
              <p id='fname' className='font-light pl-2 h-6'>
                  {user?.first_name}
              </p>
          </li>

          {/* Last Name */}
          <li className='border-t-[1px] pt-2 font-semibold'>
              <label htmlFor='lname'>Last Name</label>
              <p id='lname' className='font-light pl-2 h-6'>
                  {user?.last_name}
              </p>
          </li>

          {/* Email */}
          <li className='border-t-[1px] pt-2 font-semibold'>
              <label htmlFor='email'>Email</label>
              <p id='email' className='font-light pl-2 h-6'>
                  {user?.email}
              </p>
          </li>

          {/* Username */}
          <li className='border-t-[1px] pt-2 font-semibold'>
              <label htmlFor='username'>Username</label>
              <p id='username' className='font-light pl-2 h-6'>
                  {user?.username}
              </p>
          </li>
      </ul>
  );
}
export default UsersDetails