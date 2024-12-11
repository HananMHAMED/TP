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
class Jeu():
    
    # Initialisation
    def __init__(self, fenetre):
        self.fenetre = fenetre
        self.score = 0  # Initialisation de score
        self.vies = 3   # nombre de vie de vaisseau
        # création du widget bouton (Bouton New game)
        self.fenetre.bouton1.config(text = 'Demarrer', command = self.bouton)
        self.aliens = []   # Initialisation de liste des aliens 
        self.protections = []   # liste de protections de vaisseau
        self.projectiles = []   # File de projectiles
        self.projectiles_alien= []
        self.x_speed = 1
        self.y_offset = 0

    def bouton(self):
        print(self.start_game)
        self.fenetre.bouton1.config(state = "disabled")
        
    def start_game(self):
        # fonction qui met en place le lancement du jeu
        # en entrée : vide 
        # en sortie : vide
        
        self.vaisseau = Vaisseau(self, self.fenetre)
        self.create_aliens()
        self.move_aliens()
        self.create_protection()
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
        self.y_offset = 0
        for alien in self.aliens:
            if alien.aux_font():
                self.x_speed *= -1
                self.y_offset += 20
                break

        for alien in self.aliens:
            alien.move(self.x_speed, self.y_offset)

    
            
    def create_protection(self):
        for i in range(4):
            prot = protection(self.fenetre, 50 + i*100, 300)
            self.protections.append(prot)
            
        
    def fire_projectile(self, event):
        # création de l'évenement event sur une touche de clavier
        touche = event.keysym
        if not touche == "space": return
        x, y = self.fenetre.canvas.coords(self.vaisseau.vaisseau_id)
        proj = projectile(self.fenetre, x, y)
        self.projectiles.append(proj)

    def check_collision(self, projec, alien):
        for alien in self.aliens:
            x1, x2, x3, x4 = alien.get_coords()
            px1, px2, px3, px4 = projec.get_coords()
            if  x1 < px3 and x3 > px1 and x2 < px4 and  x4 > px2: 
                self.aliens.remove(alien)
                self.fenetre.canvas.delete(alien.image)
                return True
        return False   
     
    def tire_alien(self, proj):
        self.proj = proj
        self.proj.Tire_Alien(self)
        self.projectiles_alien.append(proj)
        self.fenetre.Space_invaders.after(30, self.tire_alien )
      
    def game_loop(self):
        self.move_aliens()
        for proj in self.projectiles:
            proj.move_proj()
            x, y, _, _, = proj.get_position()
            if y <= 0:
                self.fenetre.canvas.delete(proj.id)
                self.projectiles.remove(proj)
        self.fenetre.Space_invaders.after(30, self.game_loop)
            
        
    
    
    
    
