const ManageUsers = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>admin@gmail.com</td>
              <td>
                <span className="badge badge-error">Admin</span>
              </td>
              <td>Active</td>
            </tr>

            <tr>
              <td>2</td>
              <td>user@gmail.com</td>
              <td>
                <span className="badge badge-primary">User</span>
              </td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
