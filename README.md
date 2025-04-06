# 🤝 Help-a-Hand

**Help-a-Hand** este o aplicație web dedicată sprijinirii comunităților prin conectarea **voluntarilor** cu **persoanele în nevoie** (vârstnici, persoane cu dizabilități sau în dificultate). Platforma permite cereri de ajutor simple și rapide, iar voluntarii pot accepta și finaliza aceste cereri în mod eficient.


---

## 🚀 Functionalități principale

### Pentru Beneficiari:
- 🖐 Creează cereri de ajutor (ex: cumpărături, ridicare pachet, plimbat câinele)
- 🧭 Selectează locația cu autocomplete (Google Maps)
- 🔔 Primește notificări și statusuri
- 💬 Comunică direct cu voluntarul prin chat
- 🎖 Alege un pachet de vizibilitate (Silver, Gold, Diamond)

### Pentru Voluntari:
- 📋 Vizualizează cereri disponibile în zona ta
- ✅ Acceptă și finalizează cereri
- 🧠 Sistem de leveling cu XP & progres vizual
- 💬 Chat cu beneficiarul în contextul fiecărei cereri
- 🏅 Vizualizează progresul și cererile finalizate

---

## 🛠 Tehnologii folosite

| Frontend | Backend / DB | Altele |
|----------|---------------|--------|
| React.js + Vite ⚡ | Firebase (Auth, Firestore) 🔥 | Google Maps API 📍 |
| TailwindCSS 🎨 | Firebase Hosting 🚀 | Framer Motion, Toasts |

---

## 🧪 Demo Tehnic

> Funcționalitățile cheie au fost testate pe baza unui flow complet:
1. Beneficiar creează cerere
2. Voluntar o acceptă și o finalizează
3. XP + leveling system + istoric cereri
4. Chat funcțional pentru fiecare cerere acceptată

---

## 💼 Business Model (pentru pitch)

- **Freemium**: aplicația e gratuită pentru toți utilizatorii
- **Abonamente Premium pentru Beneficiari** (Silver/Gold/Diamond)
- **Viitor**: colaborări B2B cu ONG-uri / autorități locale pentru centralizarea ajutorului

---

## 🧑‍💻 Echipă

| Nume | Rol |
|------|-----|
| George Talos | Full Flow & Sistem Level Up + Chat |
| Patric Molnar | Landing Page & Branding |
| Robert Csokmai | Voluntar Homepage |
| Calin Stroia | Beneficiar Homepage |
| Simonca Darius | Creare cerere & Google Maps integration |

---

## 📦 Instalare locală

```bash
git clone https://github.com/echipa/help-a-hand.git
cd help-a-hand
npm install
npm run dev
