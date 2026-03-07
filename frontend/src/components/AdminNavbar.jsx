import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearToken } from "../utils/auth";

export default function AdminNavbar() {

  const navigate = useNavigate();

  async function handleLogout(){

    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be logged out of the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel"
    });

    if(result.isConfirmed){

      clearToken();

      Swal.fire({
        icon:"success",
        title:"Logged out",
        timer:1200,
        showConfirmButton:false
      });

      navigate("/admin/login");

    }

  }

  return (

    <div className="flex justify-between items-center p-4 bg-white border-b">

      <h1 className="font-semibold text-lg">
        Admin Dashboard
      </h1>

      <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

    </div>

  );

}