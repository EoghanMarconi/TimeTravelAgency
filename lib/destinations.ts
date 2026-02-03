import atlantideImg from '@assets/images/atlantide/hero.png';
import atlantideVideo from '@assets/images/atlantide/video.mp4';
import normandieImg from '@assets/images/normandie/hero.png';
import normandieVideo from '@assets/images/normandie/video.mp4';
import solarpunkImg from '@assets/images/solarpunk/hero.png';
import solarpunkVideo from '@assets/images/solarpunk/video.mp4';
import romeImg from '@assets/images/rome/hero.jpg';
import romeVideo from '@assets/images/rome/hero.jpg';
import florenceImg from '@assets/images/florence/hero.jpg';
import florenceVideo from '@assets/images/florence/hero.jpg';
import europeImg from '@assets/images/europe/hero.jpg';
import europevideo from '@assets/images/europe/hero.jpg';
import egyptImg from '@assets/images/egypt/hero.jpg';
import egyptvideo from '@assets/images/egypt/hero.jpg';

export interface Destination {
  id: string;
  name: string;
  period: string;
  shortDesc: string;
  longDesc: string;
  price: number;
  duration: string;
  difficulty: number; // 1 to 3
  highlights: string[];
  warning: string;
  image: string;
  video: string; // Nouvelle propriété pour la vidéo au survol
}

export const destinations: Destination[] = [
  {
    id: "atlantide",
    name: "L'Atlantide",
    period: "~9600 av. J.-C.",
    shortDesc: "Avant le Déluge : Le Royaume Englouti de Poséidon.",
    longDesc: "Découvrez la cité mythique décrite par Platon : une île concentrique dédiée à Poséidon, où l'or, l'orichalque et le cristal scintillent. Explorez les anneaux de terre et d'eau, le temple colossal et vivez l'âge d'or avant la colère de Zeus.",
    price: 15000,
    duration: "2 jours (avant submersion)",
    difficulty: 3,
    highlights: ["Temple aux colonnes d'orichalque", "Palais royaux d'ivoire", "Bains thermaux sacrés"],
    warning: "Évacuation d'urgence garantie avant le cataclysme.",
    image: atlantideImg,
    video: atlantideVideo,
  },
  {
    id: "egypte-antique",
    name: "Égypte Antique",
    period: "~2500 av. J.-C.",
    shortDesc: "Sous le Règne de Khéops : L'Âge d'Or des Pharaons.",
    longDesc: "Contemplez les pyramides dans leur splendeur originelle, revêtues de calcaire blanc étincelant et couronnées d'électrum. Assistez à la vie le long du Nil sous la IVe dynastie.",
    price: 8500,
    duration: "5 jours",
    difficulty: 2,
    highlights: ["Pyramides au revêtement blanc", "Temples polychromes", "Croisière en felouque"],
    warning: "Ne pas profaner les tombes royales (malédictions actives).",
    image: egyptImg,
    video: egyptvideo
  },
  {
    id: "rome-imperiale",
    name: "Rome Impériale",
    period: "80 ap. J.-C.",
    shortDesc: "Ave Caesar : Les Jeux inauguraux du Colisée.",
    longDesc: "Assistez aux spectacles grandioses de l'inauguration du Colisée sous Titus : 100 jours de jeux, des milliers d'animaux et les gladiateurs les plus célèbres de l'Empire dans une arène bondée.",
    price: 6200,
    duration: "3 jours",
    difficulty: 2,
    highlights: ["Combats de Gladiateurs", "Banquets Romains", "Visite des thermes"],
    warning: "Le pouce levé ne signifie pas toujours la grâce.",
    image: romeImg,
    video: romeVideo
  },
  {
    id: "europe-medievale",
    name: "Europe Médiévale",
    period: "~1250",
    shortDesc: "Au Temps des Tournois : L'Âge des Chevaliers.",
    longDesc: "Pénétrez dans un monde de châteaux forts blanchis à la chaux et de bannières claquant au vent. Participez aux grands tournois, joutes et banquets de la noblesse.",
    price: 5900,
    duration: "4 jours",
    difficulty: 2,
    highlights: ["Tournois de chevalerie", "Banquet seigneurial", "Châteaux forts opérationnels"],
    warning: "Hygiène d'époque respectée (kits sanitaires fournis).",
    image: europeImg,
    video: europevideo
  },
  {
    id: "florence-renaissance",
    name: "Florence",
    period: "~1490",
    shortDesc: "L'Aube de l'Humanisme à la cour des Médicis.",
    longDesc: "Flânez dans les rues de Florence où Botticelli peint et Michel-Ange sculpte. Rencontrez Laurent le Magnifique et vivez l'effervescence artistique et intellectuelle de la Renaissance.",
    price: 9800,
    duration: "6 jours",
    difficulty: 1,
    highlights: ["Atelier de Léonard de Vinci", "Jardins des Médicis", "Art et Philosophie"],
    warning: "Évitez les intrigues politiques des Pazzi.",
    image: florenceImg,
    video: florenceVideo
  },
  {
    id: "debarquement-normandie",
    name: "Normandie",
    period: "6 juin 1944",
    shortDesc: "Le Jour le Plus Long : Opération Overlord.",
    longDesc: "Soyez témoin depuis une zone sécurisée de la plus grande opération amphibie de l'histoire. Observez le courage des troupes alliées sur Omaha Beach et la libération de l'Europe.",
    price: 4500,
    duration: "24 heures",
    difficulty: 3,
    highlights: ["Observation du D-Day", "Rencontre avec la Résistance", "Ambiance années 40"],
    warning: "Zone de guerre active - Gilet pare-balles temporel obligatoire.",
    image: normandieImg,
    video: normandieVideo,
  },
  {
    id: "futur-solarpunk",
    name: "Futur Solarpunk",
    period: "~2150",
    shortDesc: "L'Harmonie Retrouvée : Nature & Technologie.",
    longDesc: "Explorez les mégalopoles de demain : tours végétalisées, énergie propre et harmonie parfaite entre humanité et biosphère. Une utopie réalisée inspirée de l'Art Nouveau et de la haute technologie.",
    price: 12000,
    duration: "3 jours",
    difficulty: 1,
    highlights: ["Gratte-ciels forêts", "Véhicules volants silencieux", "Cuisine moléculaire bio"],
    warning: "Ne pas introduire de polluants du passé.",
    image: solarpunkImg,
    video: solarpunkVideo
  }
];