import Swal from "sweetalert2";

function swalNotify({
  title: newTitle,
  text: newText,
  icon: newIcon,
  timer: newTimer,
  timerProgressBar: newTimerProgressBar,
}) {
  const config = {
    title: newTitle,
    text: newText,
    icon: newIcon,
    timer: newTimer,
    timerProgressBar: newTimerProgressBar,
  };
  Swal.fire(config);
}

export { swalNotify };
