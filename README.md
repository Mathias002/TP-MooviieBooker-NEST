# Movie Reservation App

## Description
Cette application permet de réserver des films. Elle récupère les informations des films via l'API TMDB et offre des fonctionnalités de gestion de réservations et d'authentification avec JWT. Le frontend est séparé de l'API et communique avec celle-ci pour afficher et gérer les films et les réservations.

### Fonctionnalités principales
- Consultation des films populaires.
- Détails des films individuels.
- Réservation de films avec possibilité de supprimer une réservation.
- Authentification des utilisateurs pour accéder à des informations personnelles et gérer les réservations.

## Routes

### Routes publiques

1. **POST** `/auth/login`
   - Description : Permet à un utilisateur de se connecter et de récupérer un JWT.
   - Paramètres : 
     - `email` : Email de l'utilisateur.
     - `password` : Mot de passe de l'utilisateur.

2. **POST** `/auth/signup`
   - Description : Permet à un utilisateur de s'inscrire en créant un compte.
   - Paramètres :
     - `name` : nom de l'utilisateur.
     - `email` : Email de l'utilisateur.
     - `password` : Mot de passe de l'utilisateur.
     - `roles` : Le role par défaut est USER.

### Routes protégées (requièrent un JWT)

1. **GET** `/movies/popular`
   - Description : Récupère la liste des films populaires.
   - Paramètres : Aucun.
   
2. **GET** `/movies/popular/{param}`
   - Description : Récupère la liste des films populaires filtrés par un paramètre.
   - Paramètres :
     - `param`: Le paramètre de filtrage (par exemple, année, genre, etc.).
   
3. **GET** `/movies/{id}`
   - Description : Récupère les détails d'un film spécifique par son `id`.
   - Paramètres :
     - `id`: L'ID du film.
4. **GET** `/reservation/my_reservation`
   - Description : Récupère les réservations en cours de l'utilisateur connecté.
   - Paramètres : Aucun.

5. **DELETE** `/reservation/my_reservation/delete/{idReservation}`
   - Description : Supprime une réservation par son `idReservation`.
   - Paramètres :
     - `idReservation`: L'ID de la réservation à supprimer.

6. **GET** `/auth/profile`
   - Description : Récupère le profil de l'utilisateur connecté.
   - Paramètres : Aucun.

## Documentation Swagger
La documentation API est disponible à deux endroits :

- **En local** : [Swagger Documentation (localhost)](http://localhost:3000/api/docs#/).
- **En ligne** : [Swagger Documentation (online)](https://tp-mooviiebooker-nest.onrender.com/api/docs).

## Frontend
L'interface utilisateur est disponible sur [mooviie-booker](https://mooviie-booker.netlify.app).

### Tests Unitaire
- La majorités des test fonctionent bien
- Néanmoins les tests des **controllers.reservation** et **services.reservation** ne fonctionnent pas actuellement. Ils doivent être examinés et corrigés pour assurer une couverture correcte.

### Profil utilisateur test
   - Email : user@example.com
   - Paramètres : password123

### Condition d'intervalle de réservation
- La condition qui vérifie qu'il y a un intervalle minimum de deux heures avant de pouvoir réserver un film est codée dans la fonction `createReservation` du fichier **service.reservation**. Cependant, cette condition ne fonctionne pas comme prévu et nécessite une correction. Le mécanisme de validation doit être révisé pour garantir que la réservation ne peut pas être effectuée si moins de deux heures s'écoulent entre la réservation et la date actuelle.

## Installation et démarrage

### Environnement de développement
1. Clonez ce dépôt :
   ```bash
   git clone [repository-url](https://github.com/Mathias002/TP-MooviieBooker-NEST)

2. installer les dépendances :
   npm install

3. Lancer le projet :
   npm run start

3. Adresse de l'API en local :
   L'API sera disponible à http://localhost:3000

