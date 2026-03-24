export interface Profile {
  name: string;
  role: string;
  bio: string;
  contact: string;
  linkedin: string;
}

export interface Achievement {
  title: string;
  description: string;
  isPrimary: boolean;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  period: string;
  role: string;
  description: string;
}

export interface Certification {
  name: string;
  year?: string;
}

export interface PortfolioData {
  profile: Profile;
  achievements: Achievement[];
  skills: {
    categories: SkillCategory[];
    radarData: { subject: string; A: number; fullMark: number }[];
  };
  experience: Experience[];
  education: {
    degree: string;
    institution: string;
    completion: string;
  };
  certifications: Certification[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "João Felipe Silva Freitas",
    role: "Analista de Cibersegurança",
    bio: "Estudante de Ciência da Computação (7º período) focado em operações de Blue Team. Atuação focada na redução estratégica da superfície de ataque, mitigação de vulnerabilidades em endpoints, servidores e atuação direta em respostas a incidentes. Busco aliar governança e automação para elevar a maturidade de segurança em ambientes corporativos.",
    contact: "jfelipesfreitas@gmail.com",
    linkedin: "https://www.linkedin.com/in/joão-felipe-freitas-912392292"
  },
  achievements: [
    {
      title: "Vencedor Global NASA Space Apps Challenge (Equipe Pureflow)",
      description: "Única equipe brasileira premiada globalmente nesta edição.",
      isPrimary: true
    },
    {
      title: "4º Lugar no CTF FEBRABAN",
      description: "Competição de segurança cibernética em trio focada em desafios técnicos e defesa de infraestrutura.",
      isPrimary: false
    },
    {
      title: "Palestrante na Campus Party Aracaju",
      description: "Apresentação técnica sobre inovação tecnológica e o projeto premiado pela NASA.",
      isPrimary: false
    },
    {
      title: "Mentor de Cursos de TI (UNIT)",
      description: "Orientação e compartilhamento de práticas de mercado para estudantes de tecnologia.",
      isPrimary: false
    }
  ],
  skills: {
    categories: [
      {
        category: "Defesa de Endpoints",
        items: ["CrowdStrike", "Fortinet EDR", "Fortinet EMS"]
      },
      {
        category: "Defesa de Servidores e Perímetro",
        items: ["Ecotrust", "Datadog", "Firewall Fortinet"]
      },
      {
        category: "Governança e Compliance",
        items: ["Políticas de Segurança", "ISO 27001", "Framework NIST", "Gestão de Vulnerabilidades"]
      },
      {
        category: "Automação",
        items: ["Python", "Scripting", "Produtividade Operacional"]
      }
    ],
    radarData: [
      { subject: 'Defesa', A: 95, fullMark: 100 },
      { subject: 'Governança', A: 85, fullMark: 100 },
      { subject: 'Engenharia', A: 90, fullMark: 100 },
      { subject: 'Automação', A: 85, fullMark: 100 },
      { subject: 'Cloud/Redes', A: 80, fullMark: 100 }
    ]
  },
  experience: [
    {
      company: "DelTech",
      period: "Nov/2025 - Atual",
      role: "Analista de Cibersegurança",
      description: "Responsável pelas análises e respostas a incidentes de segurança (SOC) e redução acentuada de vulnerabilidades críticas. Gerenciamento das soluções Fortinet EDR, Fortinet EMS, Firewall Fortinet, FortiAnalyzer, Ecotrust e SIEM. Implantação de novos processos para atingir a ISO 27001 (NIST) e automação de tarefas rotineiras usando Python."
    },
    {
      company: "Banese Card",
      period: "Abr/2025 - Nov/2025",
      role: "Estágio em Cibersegurança",
      description: "Monitoramento proativo de alertas de segurança em tempo real, análise de tráfego de rede e análise de logs para identificar incidentes."
    },
    {
      company: "Grupo Tiradentes",
      period: "Fev/2023 - Nov/2025",
      role: "Desenvolvedor (Residência em Software)",
      description: "Participação no desenvolvimento de sistemas para clientes como UNIT Carreiras, Clínica Odontológica Estudantil da UNIT, Atos Capital e Climbe."
    }
  ],
  education: {
    degree: "Ciência da Computação (7º período)",
    institution: "Universidade Tiradentes",
    completion: "2027/1"
  },
  certifications: [
    { name: "Google Cybersecurity Professional Certificate V2", year: "2025" },
    { name: "Febraban Cyber Academy", year: "2025" },
    { name: "Fiap Nano Course Cybersecurity", year: "2025" },
    { name: "Alura Segurança de Redes", year: "2025" },
    { name: "Google Cloud", year: "2023" }
  ]
};
