# ⏳ TimeTravel Agency

**TimeTravel Agency** est une application web immersive et futuriste simulant une agence de voyage temporelle.  
Elle permet aux utilisateurs de découvrir, planifier et réserver des séjours dans le passé (Égypte Antique, Rome…) ou le futur (Solarpunk 2150).

Le projet met l’accent sur une **expérience utilisateur fluide**, un **design immersif**, et l’**intégration de l’Intelligence Artificielle** pour personnaliser le parcours client.

---

## ✨ Fonctionnalités Implémentées

- **Design immersif**  
  Glassmorphism, effets néon et typographies futuristes.

- **Navigation fluide**  
  Architecture SPA avec transitions animées.

- **🤖 Chatbot IA – Chronos**  
  Assistant conversationnel intelligent capable de répondre aux questions sur :
  - les destinations
  - les périodes temporelles
  - les règles de sécurité temporelle
  - Et plus encore

- **🧠 Quiz de recommandation IA**  
  Analyse des préférences utilisateur pour proposer la destination idéale.

- **Catalogue interactif**  
  Cartes de destinations animées avec données dynamiques.

- **Formulaire de réservation**  
  Simulation complète d’un parcours de réservation multi-étapes.

---

## 🛠️ Stack Technique

Application construite avec une stack moderne orientée performance et UX.

| Catégorie | Technologie | Usage |
|--------|------------|-------|
| Core | React + TypeScript | SPA typée |
| Bundler | Vite | Build ultra-rapide |
| Routing | React Router | Navigation |
| Styling | Tailwind CSS | UI futuriste |
| Animations | Framer Motion | Transitions |
| IA | Google Gemini API | Chatbot & Quiz |
| Icônes | Lucide React | UI |

---

## 🤖 Transparence IA (AI Disclosure)

### 1. IA en production (fonctionnalités)

- **Modèle** : Google Gemini  
- **Utilisation** :
  - Chatbot conversationnel (`components/Chatbot.tsx`)
  - Algorithme de recommandation (`components/RecommendationQuiz.tsx`)

Les prompts sont enrichis avec les données provenant de `lib/destinations.ts`.

---

### 2. IA en développement

- Assistance au code (Copilot / Gemini 3 Pro Preview)
- Génération de concepts visuels (Leonardo AI / Runway / Hailuo AI /)

---

## 🚀 Installation et Démarrage

### Prérequis
- Node.js v18+
- Une clé API Google Gemini

---

### 1. Cloner le projet
```bash
git clone https://github.com/EoghanMarconi/TimeTravelAgency.git
cd TimeTravelAgency
```
### 2. Installer les dépendances
```bash
npm install
```
### 3. Configuration de l’environnement
```bash
echo "GEMINI_API_KEY=VOTRE_CLE_API_GEMINI" >> .env
```
### 4. Lancer le projet
```bash
npm run dev
```
### Application accessible sur :
### 👉 http://localhost:5173

### 📂 Structure du Projet
```bash
/
├── app/
│   ├── destinations/
│   │   └── page.tsx        # Page des destinations
│   ├── reservation/
│   │   └── page.tsx        # Page réservation
│   └── page.tsx            # Page d’accueil
│
├── components/
│   ├── Chatbot.tsx
│   ├── DestinationCard.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── RecommendationQuiz.tsx
│   └── ReservationForm.tsx
│
├── lib/
│   ├── destinations.ts     # Données des voyages
│   └── utils.ts            # Fonctions utilitaires
│
├── src/
│   └── assets/
│       ├── images/
│       └── video.mp4        # Vidéo hero
│
├── App.tsx                  # Layout & routing
├── main.tsx                 # Entrée React
├── index.html
├── metadata.json
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```
## 📄 Crédits
Images : Unsplash

Vidéos : Assets libres

Polices : Google Fonts (Orbitron, Space Grotesk)

Contexte : Projet pédagogique Digital & IA

© 2026 — TimeTravel Agency
Projet réalisé à des fins éducatives.
