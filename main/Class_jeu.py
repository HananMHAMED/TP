"""
  Développement d'un jeu : Space invaders 
  M'HAMED Hanan
  Décembre 2024
  
"""
# importation des bibliothéques nécessaires
from Class_Vaisseau import Vaisseau
from Class_Alien import Alien
from Class_protections import protection
from Class_Projectile import projectile


"""
  Class jeu constituant les principales fonctions du jeu 
  et sa gestion 
  
"""
class jeu():
    
    # Initialisation
    def __init__(self, fenetre):
        self.fenetre = fenetre
        self.score = 0  # Initialisation de score
        self.vies = 3   # nombre de vie de vaisseau
        # création du widget bouton (Bouton New game)
        self.fenetre.bouton1.config(text = 'Demarrer', command = self.start_game)
        self.aliens = []   # Initialisation de liste des aliens 
        self.protections = []   # liste de protections de vaisseau
        self.projectiles = []   # File de projectiles
        self.fenetre.Space_invaders.bind('<KeyPress>', self.fire_projectile)
        
        
    def start_game(self):
        # fonction qui met en place le lancement du jeu
        # en entrée : vide 
        # en sortie : vide
        
        self.vaisseau = Vaisseau(self, self.fenetre)
        self.create_aliens()
        self.move_aliens()
        self.create_protection()
        self.move_protections()
        self.game_loop()
        
        
    def create_aliens(self):
        # Fonction qui gére l'apparition des aliens
        # en entrée : vide
        # en sortie : la liste des aliens
        for row in range(4):
            for col in range(8):
                alien = Alien(self.fenetre, col*50, row*50)
                self.aliens.append(alien)
        return self.aliens
    
        
    def move_aliens(self):
        # Fonction qui gére les mouvements des aliens
        # en entrée : vide 
        # en sortie : vide
        for alien in self.aliens:
            alien.move_alien()
            self.fenetre.Space_invaders.after(500, self.move_aliens)
    
            
    def create_protection(self):
        for i in range(4):
            prot = protection(self.fenetre, 50 + i*100, 300)
            self.protections.append(prot)
            
    def move_protections(self):
        # Fonction qui gére les mouvements des aliens
        # en entrée : vide 
        # en sortie : vide
        for prot in self.protections:
            prot.move_Protection()
            self.fenetre.Space_invaders.after(1000, self.move_protections)
    
        
    def fire_projectile(self, event):
        # création de l'évenement event sur une touche de clavier
        touche = event.keysym
        print(touche)
        x, y, _, _, = self.fenetre.canvas.coords(self.vaisseau)
        proj = projectile(self.fenetre, x + 20, y)
        self.projectiles.append(proj)
        
    def game_loop(self):
        for proj in self.projectiles:
            proj.move_proj()
            x, y, _, _, = proj.get_position()
            if y <= 0:
                self.fenetre.canvas.delete(proj.id)
                self.projectiles.remove(proj)
        self.fenetre.Space_invaders.after(300, self.game_loop)
            
        
    
    
    
    