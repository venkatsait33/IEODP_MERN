import DashboardRenderer from "../../../components/dashboard/DashboardRenderer";
import { useGetDashboardQuery } from "../../../api/dashboardApi";

const AdminDashboard = () => {
  const { data, isLoading } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="loading loading-spinner mx-auto flex justify-center" />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-base-content/70">
          System overview and user management insights
        </p>
      </div>

      <DashboardRenderer
        config={data.config}
        users={data.users}
        tickets={data.tickets}
      />
    </div>
  );
};

export default AdminDashboard;
