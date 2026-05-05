class HomeController < ApplicationController
  def index
    @skills = get_skills
    @presentation = get_presentation
  end

  private

  def get_presentation
    "Architecte digital de 20 ans passionné par la création d'écosystèmes web complets et immersifs. Mon expertise se concentre sur le développement Fullstack avec Ruby on Rails et React, ainsi que sur la conception d'architectures temps-réel performantes. Créateur de l'écosystème Insight Sphere, je m'efforce de repousser les limites de l'interactivité web, que ce soit à travers des plateformes de communication complexes comme Insight Spirits ou des sites de guides et d'articles comme Insight Nexus."
  end

  def get_skills
    [
      { name: "Ruby on Rails", level: "Expert" },
      { name: "React & Next.js", level: "Avancé" },
      { name: "PostgreSQL & Redis", level: "Avancé" },
      { name: "WebSockets / ActionCable", level: "Avancé" },
      { name: "Docker & CI/CD", level: "Intermédiaire" },
      { name: "Vanilla CSS & Tailwind", level: "Expert" },
      { name: "TypeScript", level: "Intermédiaire" },
      { name: "Figma", level: "Avancé" }
    ]
  end
end
