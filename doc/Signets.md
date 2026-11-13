---
tags:
  - documentation
---
# Signets et Groupe de signets

Un groupe de signet est un dossier virtuel contenant des fichiers dit "signet".
Un signet peut pointer vers un autre signet pour simuler des dossiers imbriquer à fin de créer une arborescence. 

---

*Exemple :*
```json
"File" : [
	{
		"id_file" : 1,
		"path" : "./Fichier_exemple.txt",
		"type" : "texte"
	},
	{
		"id_file" : 2,
		"path" : "./Image_exemple.png",
		"type" : "image"
	}
]
"Signet" : [
	{
		"id_signet" : 1,
		"signet_name" : "Mon regroupement de signet",
		"parent_id" : none
	},
	{
		"id_signet" : 2,
		"signet_name" : "Mes images",
		"parent_id" : 1
	},
		{
		"id_signet" : 3,
		"signet_name" : "Mes textes",
		"parent_id" : 1
	}
]
"Signet_file" : [
	{
		"id_signet_file" : 1,
		"id_signet" : 2,
		"id_file" : 2
	},
	{
		"id_signet_file" : 2,
		"id_signet" : 3,
		"id_file" : 1
	}
]
```
```
"Mon regroupement de signet"
	"Mes images"
		./Images_exemple.png
	"Mes textes"
		./Fichier_exemple.txt
```