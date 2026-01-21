import { toast } from "react-toastify";
import {
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../../api/adminApi";

const UserRow = ({ user }) => {
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleChange = async (e) => {
    try {
      await updateUserRole({
        id: user._id,
        data: { role: e.target.value.toLowerCase() },
      }).unwrap();

      toast.success("Role updated successfully");
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleStatusChange = async (e) => {
    try {
      await updateUserStatus({
        id: user._id,
        data: { accountStatus: e.target.value },
      }).unwrap();

      toast.success("Status updated successfully");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <tr>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
      <td>{user.userName}</td>

      {/* ROLE */}
      <td>
        <select
          className="select select-bordered select-sm"
          value={user.role}
          onChange={handleRoleChange}
        >
          <option value="operator">operator</option>
          <option value="management">Management</option>
          <option value="leadership">Leadership</option>
          <option value="auditor">Auditor</option>
          <option value="admin">Admin</option>
        </select>
      </td>

      {/* STATUS */}
      <td>
        <select
          className="select select-bordered select-sm"
          value={user.accountStatus}
          onChange={handleStatusChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </td>
    </tr>
  );
};

export default UserRow;
