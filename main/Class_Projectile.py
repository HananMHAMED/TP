"""
  Développement d'un jeu : Space invaders 
  M'HAMED Hanan
  Décembre 2024
  
"""

# importation des bibliothéques nécessaires
from tkinter import *
from Class_Vaisseau import Vaisseau
from Class_Alien import Alien

"""
Class projectile : constituant les principales fonctions du tires 
 
    
"""
class projectile():
    def __init__(self, fenetre, x, y):
        self.fenetre = fenetre
        # création d'un projectile (line)
        self.id = self.fenetre.canvas.crate_line(x, y, x + 5, y + 10, fill = 'red')
        self.y_speed = -2
        
    def move_proj(self):
        # fonction qui gére le mouvement des projectiles
        # entrée : vide
        # sortie : vide
        self.fenetre.canvas.move(self.id, 0, self.y_speed)
    
    def get_position(self):
        return self.fenetre.canvas.coords(self.id)
    