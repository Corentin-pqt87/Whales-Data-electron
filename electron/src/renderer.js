/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 */

import './style/index.css';

console.log(
  '👋 This message is being logged by the renderer process, included via Vite',
);



// BOUTON : Nouvelle Base
document.querySelector('.new-base')?.addEventListener('click', async () => {
  // valeur par défaut
  const result = await window.api.createSave({
    baseName: "Nouvelle sauvegarde",
    baseDescription: "Description de la sauvegarde"
  });

  if (result.success) {
    console.log("Fichier de sauvegarde créé :", result.path);
  } else {
    console.log("Action annulée ou erreur :", result.message || result.error);
  }
});

// BOUTON : Ouvrir et Ajouter un fichier de sauvegarde
document.querySelector('.add-base')?.addEventListener('click', async () => {
  const result = await window.api.openSave({
    baseName: null,
    baseDescription: null
  });

  if (result.success) {
    console.log(
      result.alreadyRegistered
        ? "Sauvegarde déjà connue :" 
        : "Sauvegarde ouverte et enregistrée :",
      result.path
    );
  } else {
    console.log("Action annulée ou erreur :", result.message || result.error);
  }
});