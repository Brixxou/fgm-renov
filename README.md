# FGM RENOV — Site vitrine

Site vitrine pour **FGM RENOV**, artisan rénovation intérieure à Saint-Philibert-sur-Risle (27290).
Concept 1 — "L'Atelier" (warm · premium · artisanal).

## Stack

- HTML5 / CSS3 / JS vanilla (zéro dépendance).
- Mobile-first, responsive, accessibilité AA.
- SEO local : JSON-LD `HomeAndConstructionBusiness`, Open Graph, sitemap, robots.
- Netlify Forms pour le formulaire de contact (`data-netlify="true"`).

## Structure

```
.
├── index.html          # Page principale
├── merci.html          # Confirmation formulaire
├── css/style.css       # Styles mobile-first
├── js/main.js          # Menu + comparateur avant/après + smooth scroll
├── img/                # Photos réalisations (Avant/Après)
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── netlify.toml        # Headers + cache + redirects
```

## Déploiement

### Option 1 — Netlify (recommandé, formulaire inclus)

1. Pousser le repo sur GitHub.
2. Sur [Netlify](https://app.netlify.com) : **Add new site → Import from Git**.
3. Sélectionner le repo, laisser `Publish directory = .`, pas de build command.
4. Déployer. Les formulaires Netlify sont automatiquement détectés.
5. (Optionnel) Ajouter le domaine `www.fgm-renov.fr` dans **Domain management**.

### Option 2 — GitHub Pages

1. Repo public, Settings → Pages → Source `main / root`.
2. Le formulaire ne fonctionnera pas nativement — remplacer par [Formspree](https://formspree.io) ou similaire.

## Contact (client)

- **Tel** : 07 68 81 31 52
- **Email** : fgmrenov@gmail.com
- **Base** : Saint-Philibert-sur-Risle (27290)
- **Zone** : Saint-Philibert-sur-Risle, Pont-Audemer, Montfort-sur-Risle, Brionne, Bernay, Bourg-Achard, Beuzeville, Bourgtheroulde, 40 km autour.

## Éléments SEO à compléter après déploiement

- [ ] Remplacer `www.fgm-renov.fr` par le vrai domaine (index.html, sitemap.xml, robots.txt, netlify.toml).
- [ ] Créer la fiche **Google Business Profile** puis ajouter l'URL dans `sameAs` du JSON-LD.
- [ ] Soumettre `sitemap.xml` dans Google Search Console.
- [ ] Générer `apple-touch-icon.png` (180×180 px).
- [ ] Convertir les photos en WebP pour performance (optionnel).
