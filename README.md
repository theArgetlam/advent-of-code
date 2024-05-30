# Advent of Code

Ce mini projet est un template pour répondre aux énigmes journalières du [advent of code](https://adventofcode.com/).

## Technos

Ce template vous permet de répondre aux énigmes en :
- JavaScript
- TypeScript
- TDD

## Initialisation

- Fork le projet
- Récupérez le template localement
- Installez les dépendances

```bash
$ yarn install
```

## Utilisation

- Créez le sous-dossier correspondant à la journée:

```bash
$ ./createDay.sh <année> <jour>
```

- Placez l'input dans le fichier `<année>/<jour>/input.txt`.

- Faites tourner votre solution:

```bash
$ yarn start <année>/<jour>
```

## Commandes

- Créer un sous-dossier

```bash
$ ./createDay.sh <année> <jour>
```

- Lancer le code

```bash
$ yarn start <année>/<jour>
```

- Lancer les tests

```bash
$ yarn test <année>/<jour>
```

- Tests lint et typescript

```bash
$ yarn lint
$ yarn type-check
```

## Template collaboratif

Si vous voyez des améliorations à apporter à ce template, sentez vous libre d'y apporter des modifications ! :) 

Happy Advent of Code !
