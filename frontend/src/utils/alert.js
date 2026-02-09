import Swal from "sweetalert2";

export const success = (msg) =>
  Swal.fire("Success", msg, "success");

export const error = (msg) =>
  Swal.fire("Error", msg, "error");
