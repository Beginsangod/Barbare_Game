# Barbare_Game

## Description du projet

    Shooter 2D dans le style de mario, un soldat qui affronte des vagues d'ennemi de l'armee rouge 
    en mode Arcade sous forme de vague.

    theme couleur: vert rouge et jaune 

## Partitionnement du Developpement 

___

### IA et joueur + projectile
    
    Ici on va mettre en place les commandes du joueur : saute(espace), avancer(a), reculer(d), tirer(clic gauche)
    les animations du joueur pour chaque action dans le dossier asset il y'a tout le necessaire comme image 
    l'IA devra eviter les collisions meme si elle doit sauter le joueur le tire du joueur doit suivre la direction du curseur de la souris
    au moment du tire et la mort des entites

    **Contributeur** : FofaTakeBrianRich237.

___

### interface utilisateur + Gestion des Bonus + Sound Design 

    Ici on va gerer les popups qui vont s'afficher a l'ecran: l'interface du debut(choix du perso, choix du terrrain de jeu),
    affichage du Score, du level, de la barre de vie.la Gestion de la fenetre de jeu et du footer avec le nom des contributeurs
    Ajout de Bonus( qui vont affecter les caracteristiques des ennemis et du joueur). le sound Design choisir les son pour le tire et la musique qui va jouer en arriere plan, la fenetre de victoire/game over.

    **Contributeur** : LouisNdjie.

___

### Gestion logique Direct du jeu et Level editing, Moteur de Collision

    Ici on gere les conditions de victoire et defaite, le positionnement des plateformes, la logique d'apparition des ennemis,
    Les lois du monde(Gravite, condition de mort or combat ), l'augmentation de la difficulte selon le niveau et fourniture de la majorite
    des assets liees au jeu. Gestion des collision entre le joueur et un ennemi et collision avec un projectile et un joueur ou ennemi egalement collision avec le sol et Bonus. 

    **Contributeur** : Beginsan.