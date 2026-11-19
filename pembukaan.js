/* =====================================================
   ASEAN LITTLE EXPLORERS
   PEMBUKAAN - JAVASCRIPT
   ===================================================== */

// DATA KARAKTER
const characters = [
    {
        name: "ASEANball",
        file: "01_ASEAN.png",
        label: "Pemandu Petualangan",
        intro: "Halo, Penjelajah! Aku ASEANball, pemandu perjalanan kalian. Aku akan menemani kalian mengenal negara-negara di Asia Tenggara!",
        detail: "Apa kalian sudah mendengar lagu tadi? Nah! Lagu itu merupakan Mars ASEAN yang berjudul Anthem ASEAN: The ASEAN Way. Lagu ini menggambarkan semangat persatuan, persahabatan, dan kebersamaan negara-negara ASEAN."
    },
    {
        name: "Indonesia",
        file: "02_Indonesia.png",
        label: "Negeri Kepulauan",
        intro: "Halo! Aku Indonesia. Negaraku merupakan negara kepulauan yang memiliki ribuan pulau dan kekayaan alam yang luar biasa.",
        detail: "Indonesia memiliki beragam suku, bahasa daerah, rumah adat, tarian, dan makanan tradisional. Semboyan negaraku adalah Bhinneka Tunggal Ika."
    },
    {
        name: "Timor-Leste",
        file: "03_Timor-Leste.png",
        label: "Negeri di Timur Asia Tenggara",
        intro: "Salam kenal! Aku Timor-Leste. Negaraku terletak di bagian timur Pulau Timor.",
        detail: "Ibu kota negaraku adalah Dili. Timor-Leste memiliki pemandangan alam yang indah dan budaya yang beragam."
    },
    {
        name: "Malaysia",
        file: "04_Malaysia.png",
        label: "Negeri Jiran",
        intro: "Hai! Aku Malaysia. Negaraku berada di kawasan Asia Tenggara dan memiliki wilayah di Semenanjung Malaya serta Pulau Kalimantan.",
        detail: "Ibu kotaku adalah Kuala Lumpur. Malaysia dikenal dengan Menara Kembar Petronas dan masyarakatnya yang memiliki beragam budaya."
    },
    {
        name: "Singapura",
        file: "05_Singapura.png",
        label: "Negara Kota Modern",
        intro: "Halo semuanya! Aku Singapura. Negaraku merupakan negara kota yang terletak di sebelah selatan Semenanjung Malaya.",
        detail: "Singapura dikenal sebagai pusat perdagangan dan memiliki bangunan terkenal seperti Merlion serta Marina Bay Sands."
    },
    {
        name: "Brunei Darussalam",
        file: "06_Brunei.png",
        label: "Negeri Kaya Minyak",
        intro: "Salam kenal! Aku Brunei Darussalam. Negaraku terletak di bagian utara Pulau Kalimantan.",
        detail: "Ibu kotaku adalah Bandar Seri Begawan. Brunei memiliki kekayaan minyak dan gas alam serta bangunan terkenal Masjid Sultan Omar Ali Saifuddien."
    },
    {
        name: "Filipina",
        file: "07_Filipina.png",
        label: "Negeri Kepulauan",
        intro: "Hai, teman-teman! Aku Filipina. Negaraku merupakan negara kepulauan yang terletak di sebelah timur laut Indonesia.",
        detail: "Ibu kotaku adalah Manila. Filipina terkenal dengan ribuan pulau, pantai yang indah, dan budaya yang beragam."
    },
    {
        name: "Thailand",
        file: "08_Thailand.png",
        label: "Negeri Gajah Putih",
        intro: "Sawasdee! Aku Thailand. Negaraku terletak di daratan Asia Tenggara dan memiliki sejarah serta tradisi yang menarik.",
        detail: "Ibu kotaku adalah Bangkok. Thailand terkenal dengan kuil-kuil Buddha, festival Songkran, dan kulinernya."
    },
    {
        name: "Laos",
        file: "09_Laos.png",
        label: "Negeri Tanpa Laut",
        intro: "Sabaidee! Aku Laos. Negaraku merupakan negara yang tidak memiliki wilayah laut dan dikelilingi oleh beberapa negara tetangga.",
        detail: "Ibu kotaku adalah Vientiane. Sungai Mekong menjadi salah satu bagian penting bagi kehidupan masyarakat Laos."
    },
    {
        name: "Vietnam",
        file: "10_Vietnam.png",
        label: "Negeri Naga Biru",
        intro: "Xin chào! Aku Vietnam. Negaraku memiliki wilayah memanjang di pesisir timur Semenanjung Indochina.",
        detail: "Ibu kotaku adalah Hanoi. Vietnam terkenal dengan Teluk Ha Long, sawah terasering, dan makanan khas seperti pho."
    },
    {
        name: "Kamboja",
        file: "11_Kamboja.png",
        label: "Negeri Angkor Wat",
        intro: "Suosdei! Aku Kamboja. Negaraku memiliki sejarah panjang dan peninggalan budaya yang sangat menarik.",
        detail: "Ibu kotaku adalah Phnom Penh. Kamboja terkenal dengan kompleks candi Angkor Wat yang menjadi salah satu warisan budaya dunia."
    },
    {
        name: "Myanmar",
        file: "12_Myanmar.png",
        label: "Negeri Seribu Pagoda",
        intro: "Mingalaba! Aku Myanmar. Negaraku terletak di bagian barat daratan Asia Tenggara.",
        detail: "Ibu kotaku adalah Naypyidaw. Myanmar memiliki banyak pagoda dan tradisi budaya yang menarik untuk dipelajari."
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