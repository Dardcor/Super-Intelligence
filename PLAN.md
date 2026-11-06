# Rencana Pengembangan Super-Intelligence
## Fokus: sempurnakan v0.1.0 dulu — jangan naik versi dulu

**Status (diperbarui 2026-11-06):** v0.1.0 dirilis sebagai release
lengkap — meta-skill + 7 sub-skill + perbaikan `install.sh` +
installer yang menginstall semua skill — semuanya masuk v0.1.0,
bukan v0.1.1. Keputusan pemilik: rilis v0.1.0 sekarang agar bisa
dicek dan diinstall sendiri; Fase 1 (uji di tool sungguhan) tetap
jadi langkah berikutnya sebelum versi naik ke v0.2.0.

Dokumen ini adalah rencana kerja, bukan janji. Setiap fase punya
kriteria selesai yang bisa dicek, supaya "paling canggih" tidak
hanya jadi klaim di README.

---

## 1. Apa arti "bisa melakukan hal apapun" — diterjemahkan ke konkret

"Bisa apa aja" **tidak** berarti satu file `SKILL.md` berisi semua
kemampuan dunia. Itu tidak akan jalan: agent tidak tahu kapan harus
memakai skill itu, dan file-nya terlalu besar untuk dibaca tiap sesi.

Arti konkretnya di proyek ini:

> **Tugas terbuka apa pun yang masuk, Super-Intelligence bisa
> mengurusnya sampai selesai — karena ia tahu cara memecahnya,
> memilih skill sempit yang tepat untuk tiap langkah, memverifikasi
> tiap langkah, lalu menyampaikan hasilnya seperti manusia.**

Jadi ada 3 lapisan, bukan 1 file raksasa:

| Lapisan | Isi | Contoh |
|---|---|---|
| 1. Meta-skill (sudah ada di v0.1.0) | `super-intelligence` — loop Clarify → Plan → Do → Verify → Humanize → Deliver | Menerima permintaan samar, membuat rencana, mendelegasikan |
| 2. Sub-skill sempit (belum ada — ini pekerjaan utama) | Satu skill = satu pekerjaan yang jelas, dengan contoh + script + test | `research`, `code-review`, `plan-project`, `understand-code` |
| 3. Humanize layer (sudah ada dasarnya, perlu diperdalam) | Aturan tulis seperti manusia: spesifik, jujur, tanpa slop AI | Berlaku untuk semua output, di semua tool |

**Batas yang tidak dilanggar:**
- Tidak berpura-pura jadi manusia, tidak mengklaim identitas /
  pengalaman palsu.
- Tidak mengarang fakta, harga, tanggal, atau kutipan.
- Tidak melakukan pekerjaan ilegal / menipu karena diminta
  "dengan cara apa pun". Tawarkan alternatif yang sah.
- Tidak mengambil kredensial / token / kuota dari sistem lain.

---

## 2. Prinsip desain (dipakai di semua fase)

1. **Satu sumber kebenaran:** `skills/` adalah satu-satunya copy
   skill. Manifest plugin hanya menunjuk ke `./skills/`.
2. **Satu skill = satu pekerjaan.** Kalau deskripsinya butuh kata
   "dan" berkali-kali, pecah jadi dua skill.
3. **Progressive disclosure:** `SKILL.md` < 500 baris. Detail
   panjang pindah ke `references/`. Script yang bisa dieksekusi
   pindah ke `scripts/`.
4. **Bukti, bukan klaim:** tiap skill harus punya contoh input →
   output, dan cara mengujinya. Tanpa contoh, skill belum selesai.
5. **Satu format, semua tool:** Agent Skills (agentskills.io).
   Jangan fork `SKILL.md` per tool. Beda tool = beda cara install,
   bukan beda isi.

---

## 3. Fase kerja

### Fase 0 — Bekukan v0.1.0 (selesai, tinggal dijaga)
**Tujuan:** v0.1.0 yang sudah di-push tidak berubah-ubah.

- [x] Framework: Agent Skills
- [x] Meta-skill `super-intelligence` + 4 references + 1 contoh
- [x] Adapter plugin: Claude Code, Codex, Cursor
- [x] Install: `npx skills add`, `install.sh`, `install.ps1`
- [x] Validator: `scripts/check-skill.py` lolos
- [x] Perbaikan `install.sh` (rm -rf sebelum copy ulang) +
      installer yang menginstall semua skill → masuk rilis v0.1.0

**Kriteria selesai:** tidak ada commit baru sampai Fase 1 lolos.

### Fase 1 — Uji v0.1.0 di tool sungguhan (PRIORITAS SEKARANG)
**Tujuan:** buktikan v0.1.0 benar-benar jalan, bukan hanya valid
di atas kertas. Ini yang membedakan skill serius dari skill pajangan.

| # | Uji | Cara | Lolos kalau |
|---|---|---|---|
| 1.1 | Install Windows | Di laptop Dardcor (Windows): `npx skills add Dardcor/Super-Intelligence` atau `scripts/install.ps1` | Folder skill muncul di tool yang dituju, tanpa error |
| 1.2 | Load di 1 tool dulu | Pilih 1 dulu (OpenCode / Claude Code / Codex / Antigravity). Buka sesi baru, beri tugas samar | Agent memuat `super-intelligence` dan menjalankan loop Clarify → Plan → Do → Verify → Humanize → Deliver |
| 1.3 | Uji trigger | Beri 3 tugas: 1 samar, 1 spesifik (mis. Firebase), 1 kecil | Tugas samar → meta-skill dipakai. Tugas spesifik → skill sempit dipakai dulu (atau diakui belum ada). Tugas kecil → tidak diinterogasi berlebihan |
| 1.4 | Uji Humanize | Minta hasil tulisan / ringkasan | Hasil spesifik, jujur, tanpa hype / emoji bullet / statistik palsu |
| 1.5 | Uji install ulang | Jalankan installer 2x (macOS/Linux) | Tidak ada folder bersarang `super-intelligence/super-intelligence/` |

**Keputusan yang dibutuhkan dari Dardcor:** tool pertama yang
diuji (pilih 1), dan apakah uji dilakukan di laptop Windows-nya.

**Kriteria selesai Fase 1:** 1.1–1.4 lolos di 1 tool. Baru setelah
itu versi boleh naik.

### Fase 2 — Sub-skill gelombang A (bukti kerja nyata)
**Tujuan:** tambah 3 sub-skill sempit pertama. Ini yang membuat
"bisa apa aja" jadi nyata — meta-skill akhirnya punya sesuatu
untuk didelegasikan.

Urutan yang diusulkan (pilih 1 dulu, jangan ketiganya sekaligus):

| Prioritas | Sub-skill | Satu pekerjaan yang jelas | Kenapa dulu |
|---|---|---|---|
| A1 | `research` | Riset topik dari sumber terverifikasi → ringkasan + sumber + apa yang belum terverifikasi | Paling sering dipakai, paling mudah diuji |
| A2 | `plan-project` | Ubah ide samar jadi rencana: tujuan, langkah 3–7, kriteria selesai, out-of-scope | Pasangan alami meta-skill; dipakai di hampir semua proyek |
| A3 | `code-review` | Review perubahan kode: temuan bernomor + prioritas + perbaikan yang disetujui saja | Bukti paling kuat untuk developer; mudah diuji dengan contoh repo |

**Template tiap sub-skill (wajib sama):**
```
skills/<nama>/
├── SKILL.md            # name + description (≤1024 karakter) + langkah + contoh
├── references/         # detail yang dibaca saat dibutuhkan saja
├── scripts/            # HANYA kalau ada langkah yang benar-benar dieksekusi
└── examples/           # minimal 1 contoh input → output yang benar
```

**Kriteria selesai tiap sub-skill:**
- [ ] `check-skill.py` lolos (nama = folder, deskripsi ≤1024, body <500 baris)
- [ ] Ada 1 contoh yang bisa dijalankan dan hasilnya bisa dicek
- [ ] Ada bagian "kapan JANGAN pakai skill ini"
- [ ] Diuji di 1 tool (yang sama dengan Fase 1)

**Status draf lokal (dicek dari disk, 2026-11-06 — draf lokal saja,
belum diuji di tool sungguhan, belum di-push, versi tetap v0.1.0):**
- [x] `research` — `skills/research/SKILL.md` + contoh ada, validator lolos
- [x] `plan-project` — `skills/plan-project/SKILL.md` + contoh ada, validator lolos
- [x] `code-review` — `skills/code-review/SKILL.md` + contoh ada, validator lolos

### Fase 3 — Sub-skill gelombang B (perdalam)
**Tujuan:** tambah skill yang membuat agent terasa "pintar"
di pekerjaan sehari-hari developer.

| Sub-skill | Pekerjaan |
|---|---|
| `understand-code` | Petakan codebase: struktur, alur, dependensi → ringkasan yang bisa dibaca manusia (pola dari `understand-anything`) |
| `debug` | Dari error / bug report → reproduksi, penyebab, perbaikan minimal, cara mencegah terulang |
| `build-ui` | Bangun UI dengan filter anti-slop: purpose test tiap elemen visual, tanpa slop generik (pola dari `anti-slop`) |
| `write-human` | Tulis dokumen / copy / README seperti manusia: spesifik, jujur, tanpa hype (perdalam Humanize layer) |

**Kriteria selesai:** sama seperti Fase 2, plus 1 contoh
before/after untuk `build-ui` dan `write-human`.

**Status draf lokal (dicek dari disk, 2026-11-06 — draf lokal saja,
belum diuji di tool sungguhan, belum di-push, versi tetap v0.1.0):**
- [x] `understand-code` — `skills/understand-code/SKILL.md` + contoh ada, validator lolos
- [x] `debug` — `skills/debug/SKILL.md` + contoh ada, validator lolos
- [x] `build-ui` — `skills/build-ui/SKILL.md` + contoh ada, validator lolos
- [x] `write-human` — `skills/write-human/SKILL.md` + contoh ada, validator lolos

### Fase 4 — Humanize layer, diperdalam (bukan sekadar gaya bahasa)
**Tujuan:** "seperti manusia real" jadi aturan yang bisa dicek,
bukan sekadar instruksi "tulis natural".

- [x] Kumpulan contoh before/after per medium: chat, dokumen,
      kode (komentar), UI copy, README
- [x] Daftar larangan yang bisa dicek: statistik palsu, klaim
      "revolusioner / 10.000%", emoji bullet hype, pujian generik
- [x] Aturan bahasa: ikut bahasa user, salin nama / angka /
      tanggal persis seperti yang user tulis
- [x] Aturan kejujuran: "tidak tahu" dan "belum terverifikasi"
      ditulis eksplisit, bukan ditutupi dengan bahasa percaya diri

**Kriteria selesai:** ada file `references/humanize.md` versi
lengkap dengan contoh, dan 3 output uji lolos tanpa slop.
(Catatan: file lengkap sudah ada; uji 3 output nyata masih
terbuka — itu bagian Fase 1, perlu tool sungguhan.)

### Fase 5 — Script, test, dan CI (supaya tidak rusak saat tumbuh)
**Tujuan:** repo tetap rapi saat skill bertambah dari 1 jadi 10+.

- [x] `scripts/check-skill.py` — sudah ada; perluas untuk semua
      skill baru (otomatis, bukan manual)
- [x] Uji install di sandbox (HOME palsu): install 2x, pastikan
      tidak ada folder bersarang, semua target terisi
      → `scripts/test-install.sh` (lolos: 80 file, 2x jalan, 4 target,
      8 skill — installer kini menginstall SEMUA skill, bukan hanya
      meta-skill; `install.ps1` Windows juga diperbarui sama)
- [x] Uji JSON: semua `plugin.json` / `marketplace.json` valid
      → `check-skill.py` kini memvalidasi semua file JSON (5 file lolos)
- [x] GitHub Actions (opsional, setelah Fase 2): jalankan
      validator tiap push / pull request
      → `.github/workflows/check.yml` (draf, LOCAL ONLY — tidak bisa
      di-push lewat GitHub App karena aplikasinya tidak punya izin
      Workflows; tambahkan manual lewat web GitHub bila mau)
- [x] Perbaikan `install.sh` yang ditahan → masuk rilis v0.1.0
      (keputusan pemilik 2026-11-06: rilis lengkap sebagai v0.1.0)

**Kriteria selesai:** 1 perintah (`python3 scripts/check-skill.py`
+ uji install sandbox) bisa memverifikasi seluruh repo.

### Fase 6 — Dokumentasi & distribusi (supaya dipakai orang lain)
**Tujuan:** orang di luar Dardcor bisa install dalam 5 menit
tanpa bertanya.

- [x] README: cara install per tool (sudah ada di v0.1.0,
      perbarui tiap ada tool baru)
      → ditambah tabel 7 sub-skill draf + struktur baru (draf lokal,
      belum di-push)
- [x] `docs/` atau `references/compatibility.md`: tabel tool ×
      cara install × status uji (sudah diuji / belum)
      → ditambah bagian "Test status": validator + uji install lolos,
      load di tool sungguhan BELUM diuji (jujur ditulis)
- [ ] CHANGELOG: tiap rilis dicatat (apa yang tambah, apa yang
      diperbaiki, apa yang breaking)
- [x] Rilis GitHub: tag `v0.1.0` (2026-11-06) — jangan naik ke
      `v0.2.0` sebelum Fase 1 (uji di tool sungguhan) lolos
- [ ] (Opsional, nanti) Daftarkan ke direktori skill
      (mis. skills.sh) setelah ada 3+ sub-skill yang teruji

**Kriteria selesai:** orang baru bisa install + menjalankan 1
tugas contoh hanya dari README, tanpa bantuan Dardcor.

---

## 4. Aturan versi (supaya tidak naik versi sembarangan)

| Naik ke | Kalau |
|---|---|
| v0.1.1 | Hanya perbaikan bug kecil, tanpa skill baru. Contoh: perbaikan `install.sh` yang sedang ditahan. |
| v0.2.0 | Gelombang A selesai (3 sub-skill) + Fase 1 lolos di 1 tool. |
| v0.3.0 | Gelombang B selesai. |
| v1.0.0 | Semua ini lolos: 5+ sub-skill teruji, install teruji di 4 tool (Claude Code, Codex, OpenCode, Antigravity), ada pengguna di luar Dardcor yang berhasil install. Jangan klaim v1.0 sebelum itu. |

---

## 5. Risiko & yang TIDAK dilakukan

| Risiko | Mitigasi |
|---|---|
| 1 file "bisa segalanya" → agent bingung kapan memakainya | Tetap pecah jadi sub-skill sempit; meta-skill hanya router |
| Klaim "support semua tool" tanpa uji | Tabel kompatibilitas hanya berisi yang sudah diuji; sisanya ditulis "belum diuji" |
| Humanize disalahartikan jadi "berpura-pura jadi manusia" | Aturan eksplisit di SKILL.md + humanize.md: spesifik & jujur, tanpa identitas palsu |
| Repo tumbuh berantakan | `skills/` satu sumber kebenaran; validator + uji install di tiap perubahan |
| Naik versi terlalu cepat | Ikuti tabel versi di atas; v0.1.0 dibekukan sampai Fase 1 lolos |

---

## 6. Keputusan yang dibutuhkan dari Dardcor (2 saja)

1. **Tool pertama untuk uji Fase 1:** OpenCode / Claude Code /
   Codex / Antigravity — pilih 1 dulu.
2. **Sub-skill pertama Gelombang A:** `research` / `plan-project` /
   `code-review` — pilih 1 dulu.

Setelah 2 jawaban itu ada, pekerjaan berikutnya adalah Fase 1
(uji), lalu bangun sub-skill yang dipilih — bukan menambah
semuanya sekaligus.
