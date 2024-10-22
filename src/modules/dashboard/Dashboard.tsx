import DashboardKyc from "./features/DashboardKyc";
import DashboardMain from "./features/DashboardMain";

function Dashboard() {
  const isKycCompleted = false;
  return <>{isKycCompleted ? <DashboardMain /> : <DashboardKyc />}</>;
}

export const Component = Dashboard;

export default Dashboard;
