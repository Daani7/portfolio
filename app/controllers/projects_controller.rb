class ProjectsController < ApplicationController
  def index
    @projects = get_projects
  end

  private

  def get_projects
    [
      {
        project_name: "CryptoAlerts",
        description: "Dans le cadre de ce projet, j'ai développé un système de notification pour cryptomonnaies, destiné à alerter les utilisateurs lorsque les valeurs des cryptomonnaies atteignent des seuils spécifiques. Ce projet est construit avec Python et le framework Django, et utilise des APIs et des websockets pour récupérer les informations en temps réel.",
        language:"Python/Django",
        banner_url: "https://images.pexels.com/photos/5240548/pexels-photo-5240548.jpeg?auto=compress&cs=tinysrgb&w=400"},
      {
        project_name: "Jeu vidéo Python",
        description: "Dans ce projet, j'ai développé un jeu RPG en Python sans
        interface graphique. Le joueur peut enregistrer son pseudo
        et affronter des monstres. J'ai implémenté des
        fonctionnalités d'exploration où le joueur peut découvrir
        différentes zones, ce qui ajoute de la diversité et de
        l'immersion à l'expérience de jeu.",
        language: "Python CLI",
        banner_url: "https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
      {
        project_name: "MyCollection",
        description: "Ce projet personnel consiste en la création d'un site web permettant aux utilisateurs de gérer leurs collections d'albums et de mangas. Développé en Ruby on Rails, ce site offre des fonctionnalités complètes pour ajouter, consulter et organiser des albums ou des mangas, tout en fournissant une interface utilisateur conviviale.",
        language: "Ruby On Rails",
        banner_url: "https://images.pexels.com/photos/3803517/pexels-photo-3803517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
    ]
  end
end
