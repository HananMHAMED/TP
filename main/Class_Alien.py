
"""
  Développement d'un jeu : Space invaders 
  M'HAMED Hanan
  Décembre 2024
  
"""

# importation des bibliothéques nécessaires
from tkinter import *

"""
  Class Alien :  constituant les principales fonctions relatives aux aliens.
"""
class Alien:
    # Initialisation
    def __init__(self, fenetre,x ,y):
        # entrée : x et y position d'alien
        # sortie : vide
        self.fenetre = fenetre
        # Création d'un alien (image)
        self.image_alien = PhotoImage(file = 'alien.gif')
        self.id = self.fenetre.canvas.create_image(x, y, anchor = 'nw', image = self.image_alien)
        self.x_speed = 1
        
    def move_alien(self):
        # Fonction génerant le déplacement d'un alien 
        # entrée : vide
        # sortie : vide
        self.fenetre.canvas.move(self.id, self.x_speed, 0)
        pos = self.fenetre.canvas.coords(self.id)
        if pos[1] >= 480 or pos[0]<= 0:
            self.x_speed *= -1
    
    
""""   
class Alien():
    Compteur=0
    def __init__(self, fenetre):
        
        Alien.Compteur += 1
        self.fenetre = fenetre
        self.Compteur=Alien.Compteur
        self.vivant=True
        self.x=self.Compteur*(ecart_alien+largeur_alien)
        Alien.y=hauteur_alien_ligne1
        Alien.dir=1
        Alien.vitesse=VitesseAlien
        self.Creation()
        self.Affichage()
        #self.deplacer()
        #self.descendre()
        #self.deplacer_aliens()
    def Creation(self):
        self.image_alien = PhotoImage(file = 'alien.gif')
        self.apparence = self.fenetre.canvas.create_image(300, 300, anchor = 'nw', image = self.image_alien)
        
    def Affichage(self):
        self.fenetre.canvas.coords(self.apparence,self.x,self.y)
        
"""
   
"""" 
    def deplacer(self):
        self.x += self.dir * self.vitesse
        if self.x > self.fenetre.Largeur - largeur_alien or self.x < 0:
            self.dir *= -1
            self.descendre()

    
    def descendre(self):
        self.y += descente_alien
        self.Affichage()
        

    def deplacer_aliens(self):
        self.aliens = []
        for i in range(nbre_alien_par_ligne):
            for j in range(4):
                x = i * (ecart_alien + largeur_alien)
                y = j * (ecart_alien + hauteur_alien)
                self.alien = Alien(self,x , y)
                self.aliens.append(alien)
        
        for alien in self.aliens:
            self.alien.deplacer()
    
        for alien in self.aliens:
            if self.alien.x > 800 - largeur_alien or alien.x < 0:
                for alien in self.aliens:
                    self.alien.descendre()
                break
        
        self.fenetre.after(int(VitesseDeplacement), self.deplacer_aliens)
"""