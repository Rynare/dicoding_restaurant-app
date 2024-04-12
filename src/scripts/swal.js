import Swal from 'sweetalert2';

function swalNotify(config) {
    Swal.fire({
        title: config.title || null,
        text: config.text || null,
        icon: config.icon || "question",
        timer: config.timer || 1500,
        timerProgressBar: config.timerProgressBar || config.timer > 0 ? true : false,
    });
}

export { swalNotify }