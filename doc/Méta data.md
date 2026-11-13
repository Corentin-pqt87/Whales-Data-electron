---
tags:
  - documentation
---
# Les méta-data
Les méta-data sont des données enregistré dans les propriété d'un fichier, que se sois ça date de création, de modification, son auteur ...
L'utilisateur doit pouvoir ajouter des méta-data à un fichier afin d'améliorer et par la suite perfectionner les recherche.

### Auteur
Dans certains cas comme celui des fichiers audio, l'auteur peu être spécifier. 

Une recherche par auteur ce fait avec le préfixe `@`.
*exemple :* `@"Jhon Doe"` ou `@Jhon-Doe.` 

### Date
Il existe plusieurs méta-data lier au date :
- date de création
- date de modification
- date du dernier accès 

### Version
Dans le cas des fichier exécutable, il existe une méta-data avec pour information la version, cela sert par exemple a vérifier si une application est à jours.

Une recherche par version ce fait via le préfixe `$`.
*Exemple :* `$v1.15.2`


---

*Exemple*

```json
"Mon_fichier_texte.docx" : {
	"date de création" : '19-09-2025',
	"data de modification" : '02-02-2026',
	"dernier acces" : '09-09-2026',
	"auteur" : "Jhon Doe"
},
"Mon_application.appage" : {
	"auteur" : "Jhon Doe",
	"version" : 'v1.15.2'
}
```
