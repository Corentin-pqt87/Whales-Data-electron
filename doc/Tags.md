---
tags:
  - documentation
---
# Tags/mots-clé

Les tags sont des mots clé qui permettant de classifier, décrire, organiser des fichiers afin de faire des recherches par caractéristique spécifique à un ou plusieurs fichiers qui ne sont pas stocker forcément dans le même répertoire.

Les tags sont enregistré dans la base de donnée sous le format kebab-case. 
Lors de la recherche par tags, un mot est spécifier comme un tags via un préfixe `#`.

---

*Exemple*
```json
"File" : [
	{
		"id_file" : 1,
		"path" : "./Fichier_exemple.txt",
		"type" : "texte"
	},
	{
		"id_file" : 2,
		"path" : "./Image_exemple1.png",
		"type" : "image"
	},
	{
		"id_file" : 3,
		"path" : "./Image_exemple2.txt",
		"type" : "image"
	}
],
"Tags" : [
	{
		"id_tag" : 1,
		"tag_name" : "image"
	},
	{
		"id_tag" : 2,
		"tag_name" : "texte"
	},
	{
		"id_tag" : 3,
		"tag_name" : "couleur"
	},
	{
		"id_tag" : 3,
		"tag_name" : "noire-et-blanc"
	}	
],
"File_tag" : [
	{
		"id_file_tag" : 1,
		"id_file" : 1,
		"id_tag" : 1
	},
	{
		"id_file_tag" : 2,
		"id_file" : 2,
		"id_tag" : 2
	},
	{
		"id_file_tag" : 3,
		"id_file" : 1,
		"id_tag" : 3
	}
] 
```
L'image `./Image_exemple1.png` possède 2 tags :
1. "image"
2. "couleur"

L'image `./Image_exemple2.png` possède 2 tags :
1. "image"
2. "noire-et-blanc"

Le texte `./Fichier_exemple.txt` possède 1 tag :
1. "texte"

les recherches suivante :
- `#image` 
	- renvois : `./Image_exemple1.png` et `./Image_exemple2.png`
- `#couleur`
	- renvois : `./Image_exemple1.png`
- `#noire-et-blanc`
	- renvois : `./Image_exemple2.png`
- `#texte`
	- revois : `./Fichier_exemple.txt`
- `#image #couleur`
	- renvois : `./Image_exemple1.png`
- `#image #texte`
	- renvois rien car il n'y a pas de fichier avec les tags "image" et "texte"