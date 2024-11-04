# Libraires 
from tkinter import *

Space_invaders = Tk()
Space_invaders.title("Space invaders")
Largeur = 600
Hauteur = 600
#class
class Fenetre():
    #initialisation
    def __init__(self, Space_invaders):
        self.image = PhotoImage(file = '\\Users\\CPE\\Downloads\\tp4_image')  
        self.canvas = Canvas(Space_invaders, width = Largeur, height = Hauteur)
        self.canvas.pack(padx = 10, pady = 10)
        self.canvas.create_image(0, 0, anchor = 'nw', image = self.image)
        self.label = Label(Space_invaders, text = 'score:')
        self.label.pack(padx = 10, pady = 10, side = 'top')
        self.bouton1 = Button(Space_invaders, text = 'New game')
        self.bouton1.pack(padx = 10, pady = 10, side = 'left')
        self.bouton2 = Button(Space_invaders, text = 'Quit', command = Space_invaders.destroy)
        self.bouton2.pack(padx = 10, pady = 10, side = 'right')
        self.menubar = Menu(Space_invaders)
        self.menufichier = Menu(self.menubar)
        self.menubar.add_cascade(label = 'A propos', menu = self.menufichier)
        Space_invaders.config(menu = self.menubar)
mf = Fenetre(Space_invaders)
Space_invaders.mainloop()