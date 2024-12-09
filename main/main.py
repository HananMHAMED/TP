
"""
  Développement d'un jeu : Space invaders 
  M'HAMED Hanan
  Décembre 2024  
"""
# importation des bibliothéques nécessaires
from tkinter import *
from  Class_Fenetre import Fenetre
from Class_jeu import jeu

def main():
    Space_invaders = Tk() # création de la fenetre graphique
    Space_invaders.title("Space invaders")
    fenetre = Fenetre(Space_invaders)
    monjeu = jeu(fenetre)
    Space_invaders.mainloop() # Lancement du gestionnaire d'événements
main()
