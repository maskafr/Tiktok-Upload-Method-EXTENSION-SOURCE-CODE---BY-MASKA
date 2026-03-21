# Règles de confidentialité — MASKA TikTok Upload Method

**Extension Chrome : MASKA TikTok Upload Method**  
**Dernière mise à jour : Mars 2026**  
**Développeur : Maska**

---

## 1. Introduction

Cette politique de confidentialité décrit comment l'extension Chrome **MASKA TikTok Upload Method** collecte, utilise et protège les données lorsque vous l'utilisez.

---

## 2. Installation (Mode Développeur)

1. Ouvrez Chrome et accédez à `chrome://extensions`.
2. Activez le **mode développeur**.
3. Cliquez sur **Charger l'extension non empaquetée**.
4. Sélectionnez le dossier : `Maska Upload Method`.
5. Épinglez/ouvrez le popup de l'extension et utilisez le commutateur principal.

---

## 3. Utilisation

- Cliquez sur l'icône de l'extension.
- Activez le commutateur sur **ON (ACTIVÉ)** pour activer le comportement.
- Ouvrez TikTok Studio (`https://www.tiktok.com/tiktokstudio...`).
- Téléchargez votre vidéo.
- Attendez la fin du compte à rebours et téléchargez (GG !!!).
- Pour désactiver, laissez le commutateur sur **OFF (DÉSACTIVÉ)** pour fonctionner sans modifications de requête.
- Lorsqu'elle est activée, l'extension injecte une logique d'exécution qui modifie certains champs du payload de requête d'upload avant leur envoi.

---

## 4. Ce que fait cette extension

- Ajoute une interface popup avec un commutateur ON/OFF (ACTIVÉ / DÉSACTIVÉ).
- Sauvegarde l'état du commutateur dans `chrome.storage.local` sous la clé `sysActive`.
- Injecte `app-utils.js` dans les pages TikTok Studio via un script de contenu.
- Affiche un toast visuel sur la page lorsque la méthode est active.
- Intercepte les requêtes `fetch` et `XMLHttpRequest` contenant `project/post` et modifie conditionnellement les données du payload JSON.

---

## 5. Fonctionnalités principales

### Commutateur principal
Changez instantanément le comportement depuis le popup de l'extension.

### État persistant
Conserve votre état sélectionné entre les redémarrages du navigateur via le stockage local de l'extension.

### Traitement des requêtes (lorsqu'actif)
Pour les corps de requête correspondants, l'extension tente de :
- Ajuster `post_common_info.post_type`
- Supprimer `vedit_common_info.draft`
- Supprimer `single_post_feature_info.vedit_segment_info`

### Retour visuel
Affiche un court toast dans la page : ✧ MASKA UPLOAD METHOD ACTIVE ✧

---

## 6. Fonctionnement technique

1. `background.js` initialise `sysActive` à `false` lors de la première installation.
2. `main-content.js` s'exécute sur les pages TikTok Studio au `document_start`.
3. `main-content.js` injecte `app-utils.js` dans le contexte de la page (nécessaire pour patcher les APIs natives de la page).
4. Le commutateur du popup met à jour `sysActive` dans le stockage et envoie un message `TOGGLE_STATE` à l'onglet actif.
5. La logique de la page reçoit les événements `SysStateUpdate` et active/désactive le comportement de modification des requêtes.

---

## 7. Aperçu des fichiers

| Fichier | Description |
|---|---|
| `manifest.json` | Configuration de l'extension (MV3, permissions, scripts de contenu, service worker en arrière-plan) |
| `popup.html` / `popup.js` | Interface popup de l'extension et logique de bascule |
| `main-content.js` | Pont de script de contenu + toast de statut dans la page |
| `app-utils.js` | Logique d'interception des requêtes et de mutation du payload |
| `background.js` | Configuration de l'état par défaut lors de l'installation |
| `icons/` | Icônes de l'extension utilisées dans le popup et l'interface du navigateur |

---

## 8. Permissions et accès aux hôtes

- **permissions : `storage`**  
  Utilisé uniquement pour sauvegarder/lire `sysActive`.

- **content_scripts.matches :**  
  `https://www.tiktok.com/tiktokstudio*`

- **web_accessible_resources.matches :**  
  `https://www.tiktok.com/*` (pour l'injection de `app-utils.js`)

---

## 9. Données collectées

Cette extension **ne collecte, ne transmet et ne stocke aucune donnée personnelle**.

Le seul élément sauvegardé est :
- **`sysActive`** (booléen) : l'état ON/OFF du commutateur — stocké localement dans votre navigateur via `chrome.storage.local`, jamais envoyé à un serveur externe.

L'extension n'a accès à aucune donnée de compte TikTok, aucune vidéo, aucun identifiant personnel.

---

## 10. Notes et limitations

- Cette extension cible les patterns de requêtes actuels de TikTok Studio ; si TikTok modifie les endpoints ou le schéma du payload, le comportement devra peut-être être mis à jour.
- Les modifications de requêtes ne s'exécutent que lorsque :
  - L'extension est active, **et**
  - L'URL de la requête contient `project/post`, **et**
  - Le corps est un JSON valide.
- `URL.createObjectURL` est remplacé lorsqu'il est actif dans le contexte de la page.

---

## 11. Scripts de build

`package.json` inclut :
- `build:protect` : `node scripts/build-protect.js`

> Dans cet instantané du dépôt, le fichier `scripts/build-protect.js` référencé n'est pas présent.

---

## 12. Licence

Copyright (c) 2026 Maska.

Ce projet est sous licence [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/).

Vous pouvez partager ce travail à des fins non commerciales avec attribution appropriée. L'utilisation commerciale et les œuvres dérivées nécessitent une permission explicite.

---

*Pour toute question concernant cette politique de confidentialité, veuillez ouvrir une issue sur ce dépôt GitHub.*
