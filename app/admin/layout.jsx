import AdminClientLayout from "./AdminClientLayout";

export const metadata = {
  title: "IMT-HYDERABAD",
  description: "IMT-HYDERABAD",
};

export default function AdminLayout({ children }) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
