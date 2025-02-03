const films = [
    {
      id: 1,
      titre: "Le Fabuleux Destin d'Amélie Poulain",
      realisateur: "Jean-Pierre Jeunet",
      annee: 2001,
      genre: ["Comédie", "Romance"],
      duree: 122,
      pays: "France",
      acteurs: [
        "Audrey Tautou",
        "Mathieu Kassovitz",
        "Rufus"
      ],
      note: 8.3,
      synopsis: "Une jeune serveuse parisienne décide d'améliorer la vie des autres tout en découvrant l'amour.",
      enSalles: false
    },
    {
      id: 2,
      titre: "Intouchables",
      realisateur: "Olivier Nakache et Éric Toledano",
      annee: 2011,
      genre: ["Comédie", "Drame"],
      duree: 112,
      pays: "France",
      acteurs: [
        "François Cluzet",
        "Omar Sy",
        "Anne Le Ny"
      ],
      note: 8.5,
      synopsis: "L'histoire vraie d'une amitié improbable entre un aristocrate tétraplégique et son aide-soignant.",
      enSalles: false
    },
    {
      id: 3,
      titre: "La Haine",
      realisateur: "Mathieu Kassovitz",
      annee: 1995,
      genre: ["Drame"],
      duree: 98,
      pays: "France",
      acteurs: [
        "Vincent Cassel",
        "Hubert Koundé",
        "Saïd Taghmaoui"
      ],
      note: 8.1,
      synopsis: "24 heures dans la vie de trois jeunes d'une banlieue parisienne après une nuit d'émeutes.",
      enSalles: false
    },
    {
      id: 4,
      titre: "Avatar",
      realisateur: "James Cameron",
      annee: 2009,
      genre: ["Science-fiction", "Action", "Aventure"],
      duree: 162,
      pays: "États-Unis",
      acteurs: [
        "Sam Worthington",
        "Zoe Saldana",
        "Sigourney Weaver"
      ],
      note: 7.8,
      synopsis: "Un ancien marine paraplégique est recruté pour une mission sur la planète Pandora.",
      enSalles: false
    },
    {
      id: 5,
      titre: "Le Cinquième Élément",
      realisateur: "Luc Besson",
      annee: 1997,
      genre: ["Science-fiction", "Action"],
      duree: 126,
      pays: "France",
      acteurs: [
        "Bruce Willis",
        "Milla Jovovich",
        "Gary Oldman"
      ],
      note: 7.7,
      synopsis: "Un chauffeur de taxi devient le gardien d'une arme mystérieuse contre le mal.",
      enSalles: false
    }
  ];

const FilteredArray = []

function Filter(Array, param){
    
    // console.log(JSON.stringify(Array));

    for (let i = 0; i < Array.length; i++) {

        // console.log(JSON.stringify(Array[i]));

        const ArrayIteration = JSON.stringify(Array[i])

        if(ArrayIteration.includes(param)){
    
            FilteredArray.push(ArrayIteration)
        }
    }

    return FilteredArray;
    
}

console.log(Filter(films, 'Drame'));