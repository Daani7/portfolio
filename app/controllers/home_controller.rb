class HomeController < ApplicationController
  def index
    @skills = get_skills
    @presentation = get_presentation
  end

  private

  def get_presentation
    "Bonjour ! Je m'appelle Dani, j'ai 19 ans et je suis passionné par le développement web, les jeux vidéo et la réalité virtuelle. Mon parcours dans le domaine du développement web m'a permis d'explorer les technologies comme Ruby on Rails, JavaScript, ainsi que le développement de jeux avec Unity et C#. À travers mes projets, j'explore la fusion entre la créativité et la technologie pour créer des expériences interactives captivantes. Bienvenue dans mon espace où je partage mes réalisations et mon exploration constante de ces domaines fascinants."
  end

  def get_skills
    [
      { name: "C#", level: "Intérmédiaire" },
      { name: "Ruby on Rails", level: "Intérmédiaire" },
      { name: "Unity", level: "Intérmédiaire" },
      { name: "Java", level: "Débutant" },
      { name: "HTML & CSS", level: "Advanced" },
      { name: "JavaScript", level: "Intermédiaire" },
      { name: "PostgreSql", level: "Intérmédiaire" },
      { name: "MySql", level: "Intérmédiaire" },
      {name: "Figma", level: "Intérmédiaire"}
    ]
  end
end
