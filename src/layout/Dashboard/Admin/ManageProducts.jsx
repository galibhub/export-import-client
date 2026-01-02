const ManageProducts = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Arabica Coffee</td>
              <td>$65</td>
              <td>300</td>
              <td>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
