document.addEventListener('DOMContentLoaded', function() {
    const anggotaContainer = document.getElementById('anggota-container');
    const addMemberForm = document.getElementById('add-member-form');
    const memberNameInput = document.getElementById('member-name');
    const memberPositionInput = document.getElementById('member-position');
    const memberPhotoInput = document.getElementById('member-photo');

    // Fungsi untuk menampilkan anggota
    function displayMembers() {
        anggotaContainer.innerHTML = ''; // Kosongkan kontainer
        const members = JSON.parse(localStorage.getItem('members')) || [];
        members.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'anggota-card';
            memberCard.innerHTML = `
                <img src="${member.photo}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>Jabatan: ${member.position}</p>
                <button class="delete-button" data-index="${index}">Hapus</button>
            `;
            anggotaContainer.appendChild(memberCard);
        });

        // Tambahkan event listener untuk tombol hapus
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                deleteMember(index);
            });
        });
    }

    // Menambahkan anggota baru
    addMemberForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const newMember = {
            name: memberNameInput.value,
            position: memberPositionInput.value,
            photo: memberPhotoInput.value // Pastikan foto disimpan
        };
        members.push(newMember);
        localStorage.setItem('members', JSON.stringify(members));
        memberNameInput.value = '';
        memberPositionInput.value = '';
        memberPhotoInput.value = '';
        displayMembers();
    });

    // Menghapus anggota
    function deleteMember(index) {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        members.splice(index, 1); // Hapus anggota dari array
        localStorage.setItem('members', JSON.stringify(members)); // Simpan kembali ke localStorage
        displayMembers(); // Tampilkan anggota yang diperbarui
    }

    // Menampilkan anggota saat halaman dimuat
    displayMembers();

    // Kontak form
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Pesan Anda telah dikirim!');
        this.reset();
    });

    // Fungsi untuk mengganti warna latar belakang secara otomatis
    function changeBackgroundColor() {
        const colors = ['#6a11cb', '#2575fc', '#ff5722', '#4caf50', '#ffeb3b'];
        let index = 0;

        setInterval(() => {
            document.body.style.background = colors[index];
            index = (index + 1) % colors.length; // Loop kembali ke awal
        }, 3000); // Ganti warna setiap 3 detik
    }

    // Panggil fungsi untuk mulai mengganti warna latar belakang
    changeBackgroundColor();
});