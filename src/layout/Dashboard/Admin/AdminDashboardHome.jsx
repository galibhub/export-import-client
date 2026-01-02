const AdminDashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-4xl font-bold text-primary">—</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Total Products</h2>
            <p className="text-4xl font-bold text-secondary">—</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Total Imports</h2>
            <p className="text-4xl font-bold text-accent">—</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardHome;
