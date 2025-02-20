$(document).ready(function() {
    // Event listener untuk tombol login dengan QR Code
    $('#qr-login-btn').click(function() {
        $('#video').show(); // Tampilkan video
        startQRScanner(); // Mulai pemindaian QR Code
    });

    // Fungsi untuk memulai pemindaian QR Code
    function startQRScanner() {
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();
                requestAnimationFrame(scanQRCode);
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });

        function scanQRCode() {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);

                if (code) {
                    if (code.data === 'https://qr.me-qr.com/C5KluulN') { // Ganti dengan URL dari gambar code.png
                        alert("QR Code valid! Mengarahkan ke dashboard...");
                        window.location.href = "dashboard.html"; // Ganti dengan URL dashboard Anda
                    } else {
                        alert("QR Code tidak valid!");
                    }
                }
            }
            requestAnimationFrame(scanQRCode);
        }
    }
});