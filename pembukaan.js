/* =====================================================
   ASEAN LITTLE EXPLORERS
   PEMBUKAAN - JAVASCRIPT
   ===================================================== */

// DATA KARAKTER
const characters = [
    {
        name: "ASEANball",
        file: "01_ASEAN.png",
        audio: "audio/Anthem ASEAN The ASEAN Way.mp3", // (kosong = belum ada audio, isi nanti: "audio/namafile.mp3")
        label: "Pemandu Petualangan",
        intro: "Halo, Penjelajah! Aku ASEANball, pemandu perjalanan kalian. Aku akan menemani kalian mengenal negara-negara di Asia Tenggara!",
        detail: "Apa kalian sudah mendengar lagu tadi? Nah! Lagu itu merupakan Mars ASEAN yang berjudul Anthem ASEAN: The ASEAN Way. Lagu ini menggambarkan semangat persatuan, persahabatan, dan kebersamaan negara-negara ASEAN."
    },
    {
        name: "Indonesia",
        file: "02_Indonesia.png",
        audio: "audio/indonesia.mp3",
        label: "Negeri Kepulauan",
        intro: "Halo! Aku Indonesia. Negaraku merupakan negara kepulauan yang memiliki ribuan pulau dan kekayaan alam yang luar biasa.",
        detail: "Indonesia memiliki beragam suku, bahasa daerah, rumah adat, tarian, dan makanan tradisional. Semboyan negaraku adalah Bhinneka Tunggal Ika. Lagu di bawah merupakan lagu kebangsaan ku berjudul Indonesia Raya."
    },
    {
        name: "Timor-Leste",
        file: "03_Timor-Leste.png",
        audio: "audio/timor leste.mp3",
        label: "Negeri di Timur Asia Tenggara",
        intro: "Salam kenal! Aku Timor-Leste. Negaraku terletak di bagian timur Pulau Timor.",
        detail: "Ibu kota negaraku adalah Dili. Timor-Leste memiliki pemandangan alam yang indah dan budaya yang beragam. Lagu di bawah merupakan lagu kebangsaan ku berjudul Pátria."
    },
    {
        name: "Malaysia",
        file: "04_Malaysia.png",
        audio: "audio/Malaysia.mp3",
        label: "Negeri Jiran",
        intro: "Hai! Aku Malaysia. Negaraku berada di kawasan Asia Tenggara dan memiliki wilayah di Semenanjung Malaya serta Pulau Kalimantan.",
        detail: "Ibu kotaku adalah Kuala Lumpur. Malaysia dikenal dengan Menara Kembar Petronas dan masyarakatnya yang memiliki beragam budaya. Lagu di bawah merupakan lagu kebangsaan ku berjudul Negaraku."
    },
    {
        name: "Singapura",
        file: "05_Singapura.png",
        audio: "audio/singapura.mp3",
        label: "Negara Kota Modern",
        intro: "Halo semuanya! Aku Singapura. Negaraku merupakan negara kota yang terletak di sebelah selatan Semenanjung Malaya.",
        detail: "Singapura dikenal sebagai pusat perdagangan dan memiliki bangunan terkenal seperti Merlion serta Marina Bay Sands. Lagu di bawah merupakan lagu kebangsaan ku berjudul Majulah Singapura."
    },
    {
        name: "Brunei Darussalam",
        file: "06_Brunei.png",
        audio: "audio/brunei.mp3",
        label: "Negeri Kaya Minyak",
        intro: "Salam kenal! Aku Brunei Darussalam. Negaraku terletak di bagian utara Pulau Kalimantan.",
        detail: "Ibu kotaku adalah Bandar Seri Begawan. Brunei memiliki kekayaan minyak dan gas alam serta bangunan terkenal Masjid Sultan Omar Ali Saifuddien. Lagu di bawah merupakan lagu kebangsaan ku berjudul Allah Peliharakan Sultan."
    },
    {
        name: "Filipina",
        file: "07_Filipina.png",
        audio: "audio/filipina.mp3",
        label: "Negeri Kepulauan",
        intro: "Hai, teman-teman! Aku Filipina. Negaraku merupakan negara kepulauan yang terletak di sebelah timur laut Indonesia.",
        detail: "Ibu kotaku adalah Manila. Filipina terkenal dengan ribuan pulau, pantai yang indah, dan budaya yang beragam. Lagu di bawah merupakan lagu kebangsaan ku berjudul Lupang Hinirang."
    },
    {
        name: "Thailand",
        file: "08_Thailand.png",
        audio: "audio/thailand.mp3",
        label: "Negeri Gajah Putih",
        intro: "Sawasdee! Aku Thailand. Negaraku terletak di daratan Asia Tenggara dan memiliki sejarah serta tradisi yang menarik.",
        detail: "Ibu kotaku adalah Bangkok. Thailand terkenal dengan kuil-kuil Buddha, festival Songkran, dan kulinernya. Lagu di bawah merupakan lagu kebangsaan ku berjudul Phleng Chat Thai."
    },
    {
        name: "Laos",
        file: "09_Laos.png",
        audio: "audio/laos.mp3", // (kosong = belum ada audio, isi nanti: "audio/namafile.mp3")
        label: "Negeri Tanpa Laut",
        intro: "Sabaidee! Aku Laos. Negaraku merupakan negara yang tidak memiliki wilayah laut dan dikelilingi oleh beberapa negara tetangga.",
        detail: "Ibu kotaku adalah Vientiane. Sungai Mekong menjadi salah satu bagian penting bagi kehidupan masyarakat Laos. Lagu di bawah merupakan lagu kebangsaan ku berjudul Pheng Xat Lao."
    },
    {
        name: "Vietnam",
        file: "10_Vietnam.png",
        audio: "audio/vietnam.mp3", // (kosong = belum ada audio, isi nanti: "audio/namafile.mp3")
        label: "Negeri Naga Biru",
        intro: "Xin chào! Aku Vietnam. Negaraku memiliki wilayah memanjang di pesisir timur Semenanjung Indochina.",
        detail: "Ibu kotaku adalah Hanoi. Vietnam terkenal dengan Teluk Ha Long, sawah terasering, dan makanan khas seperti pho. Lagu di bawah merupakan lagu kebangsaan ku berjudul Tiến Quân Ca."
    },
    {
        name: "Kamboja",
        file: "11_Kamboja.png",
        audio: "audio/kamboja.mp3", // (kosong = belum ada audio, isi nanti: "audio/namafile.mp3")
        label: "Negeri Angkor Wat",
        intro: "Suosdei! Aku Kamboja. Negaraku memiliki sejarah panjang dan peninggalan budaya yang sangat menarik.",
        detail: "Ibu kotaku adalah Phnom Penh. Kamboja terkenal dengan kompleks candi Angkor Wat yang menjadi salah satu warisan budaya dunia. Lagu di bawah merupakan lagu kebangsaan ku berjudul Nokor Reach."
    },
    {
        name: "Myanmar",
        file: "12_Myanmar.png",
        audio: "audio/myanmar.mp3", // (kosong = belum ada audio, isi nanti: "audio/namafile.mp3")
        label: "Negeri Seribu Pagoda",
        intro: "Mingalaba! Aku Myanmar. Negaraku terletak di bagian barat daratan Asia Tenggara.",
        detail: "Ibu kotaku adalah Naypyidaw. Myanmar memiliki banyak pagoda dan tradisi budaya yang menarik untuk dipelajari. Lagu di bawah merupakan lagu kebangsaan ku berjudul Kaba Ma Kyei."
    }
];


// DAFTAR EKSPRESI
const expressions = [
    "happy",
    "surprised",
    "thinking",
    "angry",
    "sad"
];


// MEMBUAT WAJAH KARAKTER
function createFace() {
    return `
        <div class="character-face expression-happy">
            <span class="brow brow-left"></span>
            <span class="brow brow-right"></span>

            <span class="eye eye-left">
                <span class="pupil"></span>
            </span>

            <span class="eye eye-right">
                <span class="pupil"></span>
            </span>

            <span class="blush blush-left"></span>
            <span class="blush blush-right"></span>

            <span class="mouth"></span>
        </div>
    `;
}


// MENAMPILKAN KARAKTER
const charactersGrid = document.getElementById("charactersGrid");

if (charactersGrid) {
    characters.forEach((character, index) => {

        const card = document.createElement("article");
        card.className = "character-card";

        card.innerHTML = `
            <button
                type="button"
                class="character-avatar"
                aria-label="Ubah ekspresi ${character.name}"
                title="Klik untuk mengubah ekspresi"
            >
                <img
                    src="countryball no background/${character.file}"
                    alt="${character.name}"
                    draggable="false"
                >

                ${createFace()}
            </button>

            <div class="character-info">
                <span class="character-country">${character.label}</span>

                <h3>${character.name}</h3>

                <p>${character.intro}</p>

                <p>${character.detail}</p>

                ${character.audio ? `<button type="button" class="character-audio-button" data-audio="${character.audio}" aria-pressed="false">🎵 Dengarkan lagu kebangsaan ${character.name}</button>` : ""}

                <p class="character-hint">
                    ✨ Klik karakter untuk melihat ekspresi lainnya!
                </p>
            </div>
        `;

        charactersGrid.appendChild(card);
    });
}


// PERGANTIAN EKSPRESI SAAT DIKLIK
document.querySelectorAll(".character-avatar").forEach(avatar => {

    let currentExpression = 0;

    avatar.addEventListener("click", () => {

        currentExpression =
            (currentExpression + 1) % expressions.length;

        const face = avatar.querySelector(".character-face");

        face.className =
            "character-face expression-" +
            expressions[currentExpression];

        avatar.classList.remove("is-blinking");
    });
});


// ANIMASI KEDIPAN OTOMATIS
document.querySelectorAll(".character-avatar").forEach(avatar => {

    function blink() {
        avatar.classList.add("is-blinking");

        setTimeout(() => {
            avatar.classList.remove("is-blinking");
        }, 180);

        setTimeout(blink, 2500 + Math.random() * 2500);
    }

    setTimeout(blink, 1000 + Math.random() * 2000);
});


// MODE BACA DAN DENGARKAN
const readMode = document.getElementById("readMode");
const listenMode = document.getElementById("listenMode");

const narration = document.getElementById("aseanNarration");

if (readMode && listenMode) {

    readMode.addEventListener("click", () => {
        document.body.classList.remove("listening-mode");

        readMode.classList.add("active");
        listenMode.classList.remove("active");

        if (narration) {
            narration.pause();
        }
    });

    listenMode.addEventListener("click", () => {
        document.body.classList.add("listening-mode");

        listenMode.classList.add("active");
        readMode.classList.remove("active");

        if (narration) {
            narration.play().catch(() => {
                alert("Tekan tombol putar untuk memulai audio.");
            });
        } else {
            alert("Audio narasi materi belum ditambahkan.");
        }
    });
}


// KONTROL AUDIO NARASI
const playButton = document.getElementById("playNarration");
const pauseButton = document.getElementById("pauseNarration");
const restartButton = document.getElementById("restartNarration");

const audioControls = document.querySelector(".audio-controls");

if (!narration && audioControls) {
    audioControls.hidden = true;
}

if (narration) {

    if (playButton) {
        playButton.addEventListener("click", () => {
            narration.play();
        });
    }

    if (pauseButton) {
        pauseButton.addEventListener("click", () => {
            narration.pause();
        });
    }

    if (restartButton) {
        restartButton.addEventListener("click", () => {
            narration.currentTime = 0;
            narration.play();
        });
    }
}


// AUDIO LAGU KEBANGSAAN TIAP NEGARA
(function () {

    // Gaya tombol audio (boleh dipindah ke pembukaan.css)
    const style = document.createElement("style");
    style.textContent = `
        .character-audio-button {
            margin: 4px 0 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            background: #3c8952;
            color: #fff;
            font-weight: bold;
            font-family: inherit;
            cursor: pointer;
        }
        .character-audio-button:hover { background: #28633b; }
    `;
    document.head.appendChild(style);

    let currentAudio = null;
    let currentButton = null;

    function stopCurrent() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
        if (currentButton) {
            currentButton.textContent = currentButton.dataset.label;
            currentButton.setAttribute("aria-pressed", "false");
            currentButton = null;
        }
    }

    document.querySelectorAll(".character-audio-button").forEach(button => {

        button.dataset.label = button.textContent;

        button.addEventListener("click", () => {

            // klik lagi pada tombol yang sedang memutar = berhenti
            if (currentButton === button) {
                stopCurrent();
                return;
            }

            stopCurrent();

            const audio = new Audio(encodeURI(button.dataset.audio));
            currentAudio = audio;
            currentButton = button;

            button.textContent = "⏹ Berhenti";
            button.setAttribute("aria-pressed", "true");

            audio.addEventListener("ended", stopCurrent);

            audio.addEventListener("error", () => {
                stopCurrent();
                button.textContent = "⚠ Audio belum bisa diputar";
                setTimeout(() => { button.textContent = button.dataset.label; }, 2500);
            });

            audio.play().catch(() => {
                stopCurrent();
                button.textContent = "⚠ Tekan lagi untuk memutar";
                setTimeout(() => { button.textContent = button.dataset.label; }, 2500);
            });
        });
    });
})();