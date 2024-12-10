"""
  Développement d'un jeu : Space invaders 
  M'HAMED Hanan
  Décembre 2024
  
"""

# importation des bibliothéques nécessaires
from tkinter import *

"""
  Class vaisseau : gére l'apparition du vaisseau et leur deplacement
"""
class Vaisseau():
    def __init__(self, jeu, fenetre):
        self.jeu = jeu
        self.fenetre = fenetre
        # Position du vaisseau
        self.posx = 240
        self.posy = 450
        # Création du vaisseau (image)
        self.image_vaisseau = PhotoImage(file = 'joueur.gif')
        self.vaisseau_id = self.jeu.fenetre.canvas.create_image(self.posx, self.posy, anchor = 'center',image = self.image_vaisseau)
        # Lancement du déplacement du vaisseau
        self.jeu.fenetre.Space_invaders.bind('<Key>', self.callback)

    def callback(self, event):
        self.deplacer_vaisseau(event)
        self.jeu.fire_projectile(event)
    
    def deplacer_vaisseau(self, event):
        
        # création de l'évenement event sur une touche de clavier
        touche = event.keysym
        print(touche)
        # deplacément du vaisseau vers la droite
        if touche == 'Right':
            self.posx += 10
            if self.posx > 550: 
                self.posx = 550
        # deplacement du vaisseau vers la gauche
        if touche  == 'Left':
            self.posx -= 10
            if self.posx < 10:
                self.posx = 10
        # deplacement
        self.jeu.fenetre.canvas.coords(self.vaisseau_id, self.posx, self.posy)

      
