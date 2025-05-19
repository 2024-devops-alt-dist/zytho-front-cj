# ZythoFront : React + TypeScript + Vite

## Context 
Suite à la mise en place d'une API REST pour manipuler les données sur les bières, nous passons à la création d'une interface utilisateur intuitive et attrayante. Cette interface sera la vitrine de notre application et proposera une expérience fluide et agréable pour les amateurs de bières.

## Fonctionnalitées
L'application dispose :
- d'une page "Bières" : 
  - ✅ avec le catalogue de l'ensemble des bières artisanales disponible
  - ✅ possibilité de filtrer par : nom, origine et type de bière
  - ✅ la possibilité de voir le détail de chaque bière 
  - ✅ Possibilité d'éditer une bière si user authentifié comme "admin"
  - ✅ Possibilité de supprimer une bière si user authentifié comme "admin". Cependant la redirection après cette action ne fonctinne pas encore.

- Un répertoire de brasseries :
  - ✅ avec la liste de l'ensemble des brasseries existante
  - ✅ fiche detail de chaque brasserie disponible + l'ensemble des bières associées à cette dernière 
  - ✅ possibilité de filtrer par : nom et pays

- Un système d'authentification avec 2 rôles : user ou admin.
  - email: "admin@gmail.com", password: "123456789", role: 'admin'
  - email: "user@gmail.com", password: "123456789", role: 'user'

## Render
L'application est déployée sur le site Render : [Zythologue](https://zytho-front-cj.onrender.com).