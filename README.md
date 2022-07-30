# Site internet "Les Petits Plats" - Implémentation d'un algorithme de recherche

L’entreprise "Les Petits plats" a décidé de se lancer son propre site de recettes de cuisine.  
L'objectif est d'implémenter un algorithme de recherche performant permettant à un utilisateur de faire une recherche rapide et quasi instantanée.

Fonctionnement:
1. La recherche se fait via le champ principal ou via les tags (ingrédients,ustensiles ou appareil)
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients , ustensiles et appareil de la recherche avancée proposent seulement les éléments restant dans les recettes présentes sur la page
6. Les retours de recherche sont une intersection des résultats. Si l’on ajoute les tags “coco” et “chocolat” dans les ingrédients, on récupére les recettes qui ont à la
fois du coco et du chocolat.
