# Guide de développement

## Convention de commits

Nous suivons la convention **[Conventional Commits](https://www.conventionalcommits.org/)**. Les messages doivent être rédigés en anglais (ou en français si défini dans le projet) et structurés comme suit :

```
<type>(<scope>): <description courte>
```

Types autorisés :

| Type       | Usage                                                                |
|:-----------|----------------------------------------------------------------------|
| `feat`     | Ajout d'une nouvelle fonctionnalité                                  |
| `fix`      | Correction de bug                                                    |
| `docs`     | Documentation uniquement (README, plan, commentaires)                |
| `style`    | Mise en forme (Sass, indentation...) sans changement de comportement |
| `refactor` | Réécriture de code sans changement de comportement observable        |
| `test`     | Ajout ou modification de tests                                       |
| `chore`    | Tâches techniques (config, dépendances, structure de dossiers...)    |

Exemples :
```
feat: ajout du chargement d'un arbre de compétences depuis un JSON
fix: correction du calcul du coût cumulé d'une compétence
docs: complétion de la section A.2 du plan de développement
chore: initialisation de la structure du projet
```

## Convention de branches

- `main` : version stable, toujours fonctionnelle.
- `develop` : branche d'intégration des fonctionnalités en cours.
- `feature/<nom-court>` : une fonctionnalité en développement (ex : `feature/arbre-competences`).
- `fix/<nom-court>` : correction de bug (ex : `fix/cout-competence`).
- `docs/<nom-court>` : documentation (ex : `docs/plan-architecture`).
- `chore/<nom-court>` : tâches techniques (ex : `chore/setup-sass`).

Les branches `feature/`, `fix/`, `docs/` et `chore/` partent de `develop` et y sont fusionnées par pull request. `develop` est fusionnée dans `main` lors des versions stables (ex : `v0.1.0`).

### Workflow de Pull Requests (PR)

1. **Titre clair :** Utilisez un titre descriptif (de préférence aligné avec Conventional Commits).
2. **Description détaillée :** Expliquez le *pourquoi* et le *comment* de votre changement. Référencez l'issue associée (`Closes #123`).
3. **Checklist avant soumission :**
   - [ ] Le code respecte le style et les règles de linting du projet.
   - [ ] Les tests unitaires et d'intégration passent avec succès.
   - [ ] La documentation a été mise à jour si nécessaire.
   - [ ] La branche est à jour par rapport à la branche cible (`git rebase` ou `git merge`).
4. **Revue de code :** Au moins un mainteneur doit valider la PR avant la fusion. Soyez prêt à répondre aux commentaires ou à effectuer des ajustements.

### Nom des dossiers et fichiers

| Type                     | Conventions d'écriture | Exemple                |
| ------------------------ | ---------------------- | ---------------------- |
| Dossier                  | camelCase              | components             |
| Pages/views              | kebab-case             | users-logins.php       |
| Composants               | PascalCase             | ButtonSubmit           |
| Fichiers de logique      | camelCase              | formatDate.js          |
| Fichier de documentation | snake_case             | schema_base_donnees.md |

### Documentations

La documentation se fait dans le dossier `./doc/` en markdown via obsidian avec des wikilinks au mots-clés.
```md
[[page]] : lien vers page.md
[[page|Pages]] : lien vers page.md qui s'affiche Pages
[[page#Titre]] : lien vers Titre de page.md
![[image]] : affiche l'image

```

Chaque fichier de documentation doit commencer par un frontmatter YAML définissant ses propriétés :
*Exemple :*
```md
---
tags:
  - db
---
```

Les brouillons de maquettes sont fait avec le plugin Excalidraw d'obsidian.

- **Documentation de la base de donnée** : `./doc/db/`
	- **schématique de la base de donnée** : `./doc/db/schematic.canvas` 
- **Documentation des composants** : `./doc/components/`
- **Maquettes des pages/views** : `./doc/maquettes` 

### Arborescence

```


```