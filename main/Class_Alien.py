
"""
  Développement d'un jeu : Space invaders 
  M'HAMED Hanan
  Décembre 2024
  
"""

# importation des bibliothéques nécessaires
from tkinter import *
from Class_Projectile import projectile

"""
  Class Alien :  constituant les principales fonctions relatives aux aliens.
"""
class Alien:
    x_speed = 2
    # Initialisation
    def __init__(self, fenetre,x ,y):
        # entrée : x et y position d'alien
        # sortie : vide
        self.fenetre = fenetre
        # Création d'un alien (image)
        self.image_alien = PhotoImage(file = 'alien.gif')
        self.rect_id = self.fenetre.canvas.create_rectangle(x, y, x + 22, y + 16)
        self.id = self.fenetre.canvas.create_image(x, y, anchor = 'nw', image = self.image_alien)

    def get_position(self):
        return self.fenetre.canvas.coords(self.rect_id)
        
    def aux_font(self):
        # Fonction génerant le déplacement d'un alien 
        # entrée : vide
        # sortie : vide
        pos = self.fenetre.canvas.coords(self.id)
        if pos[0] >= 520 or pos[0] < 0:
            return True
        return False

    def move(self, x_speed, y_offset):
        self.fenetre.canvas.move(self.id, x_speed, y_offset)
        self.fenetre.canvas.move(self.rect_id, x_speed, y_offset)

    def Tire_Alien(self):
        x, y = self.fenetre.canvas.coords(self.id)
        proj = projectile(self.fenetre, x, y)
