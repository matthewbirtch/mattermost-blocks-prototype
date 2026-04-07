import userLeonardRiley from '@/assets/user-leonard-riley.png';
import userAikoTan from '@/assets/user-aiko-tan.png';
import userArjunPatel from '@/assets/user-arjun-patel.png';
import userDanielleOkoro from '@/assets/user-danielle-okoro.png';
import userDariusCole from '@/assets/user-darius-cole.png';
import userDavidLiang from '@/assets/user-david-liang.png';
import userEmmaNovak from '@/assets/user-emma-novak.png';
import userEthanBrooks from '@/assets/user-ethan-brooks.png';
import userIsabellaCruz from '@/assets/user-isabella-cruz.png';
import userLeilaHaddad from '@/assets/user-leila-haddad.png';
import userLukasMeyer from '@/assets/user-lukas-meyer.png';
import userMarcoRinaldi from '@/assets/user-marco-rinaldi.png';
import userSofiaBauer from '@/assets/user-sofia-bauer.png';

export type DemoUser = {
  avatarSrc: string;
  name: string;
  role: string;
};

/** Full persona list for component showroom and multi-user demos */
export const demoUsers: DemoUser[] = [
  {
    avatarSrc: userLeonardRiley,
    name: 'Leonard Riley',
    role: 'Director, Security Engineering',
  },
  { avatarSrc: userAikoTan, name: 'Aiko Tan', role: 'Senior Manager' },
  {
    avatarSrc: userArjunPatel,
    name: 'Arjun Patel',
    role: 'Platform Administrator',
  },
  {
    avatarSrc: userDanielleOkoro,
    name: 'Danielle Okoro',
    role: 'Software Engineer',
  },
  { avatarSrc: userDariusCole, name: 'Darius Cole', role: 'Product Designer' },
  { avatarSrc: userDavidLiang, name: 'David Liang', role: 'Product Manager' },
  { avatarSrc: userEmmaNovak, name: 'Emma Novak', role: 'Frontend Engineer' },
  {
    avatarSrc: userEthanBrooks,
    name: 'Ethan Brooks',
    role: 'Backend Engineer',
  },
  { avatarSrc: userIsabellaCruz, name: 'Isabella Cruz', role: 'UX Researcher' },
  {
    avatarSrc: userLeilaHaddad,
    name: 'Leila Haddad',
    role: 'Engineering Manager',
  },
  { avatarSrc: userLukasMeyer, name: 'Lukas Meyer', role: 'DevOps Engineer' },
  {
    avatarSrc: userMarcoRinaldi,
    name: 'Marco Rinaldi',
    role: 'Security Analyst',
  },
  { avatarSrc: userSofiaBauer, name: 'Sofia Bauer', role: 'Sales Engineer' },
];

/** Default face for single-avatar component demos (sizes, status ring) */
export const leonardRileyDemoUser = demoUsers.find(
  (u) => u.name === 'Leonard Riley',
)!;

const entraPagerDutyUserNames = [
  'Leonard Riley',
  'Aiko Tan',
  'Arjun Patel',
  'Danielle Okoro',
  'Darius Cole',
  'David Liang',
] as const;

function pickDemoUsers(names: readonly string[]): DemoUser[] {
  return names.map((name) => {
    const u = demoUsers.find((d) => d.name === name);
    if (!u) {
      throw new Error(`demoUsers fixture: missing "${name}"`);
    }
    return u;
  });
}

/** Subset for Entra ↔ PagerDuty integration frames */
export const entraPagerDutyUsers = pickDemoUsers(entraPagerDutyUserNames);
