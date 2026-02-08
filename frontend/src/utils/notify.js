import Swal from "sweetalert2";

export function success(message) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
}

export function error(message) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
}

export function confirmDelete(message = "Are you sure?") {
  return Swal.fire({
    icon: "warning",
    title: message,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
  });
}
