
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
    
    
