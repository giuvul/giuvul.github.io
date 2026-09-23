# Portfolio — progetto Master

Sito portfolio statico costruito in **HTML + Sass + Bootstrap**, senza JavaScript.
Il layout riproduce il concept grafico del progetto: tema scuro, accento ciano,
tipografia display molto ampia e griglia visibile sullo sfondo.

## Struttura delle cartelle

```
.
├── index.html                          home (hero)
├── favicon.svg
├── work/
│   ├── index.html                      elenco dei progetti
│   └── real-time-data-platform/
│       └── index.html                  case study di dettaglio
├── about/index.html
├── blog/index.html
├── contact/index.html                  pagina contatti + form
├── cv/index.html                       curriculum in HTML
└── assets/
    ├── css/
    │   ├── style.css                   foglio di stile compilato da Sass
    │   ├── fonts.css                   @font-face dei font self-hosted
    │   └── vendor/bootstrap.min.css    framework front end
    ├── fonts/                          Archivo, Barlow, Saira (subset latin, woff2)
    ├── img/
    │   ├── projects/                   anteprime dei progetti
    │   ├── photos/                     foto
    │   └── og-cover.png                immagine per la condivisione social
    ├── js/                             (vuota: il sito non usa JavaScript)
    └── scss/                           sorgenti Sass
        ├── abstracts/                  variabili e mixin
        ├── base/                       reset e tipografia
        ├── layout/                     header, footer, sezioni, griglia
        ├── components/                 card, form, menu, pulsanti…
        ├── pages/                      stili specifici di ogni pagina
        └── main.scss                   punto di ingresso
```

Ogni pagina vive in una cartella con il proprio `index.html`: l'URL resta pulito
(`/work/`, `/cv/`) e i server trovano da soli il file di ingresso. Le risorse
statiche stanno tutte sotto `assets/`, separate dalle pagine.

## Come lavorarci

```bash
npm install          # installa Sass e Bootstrap (solo per lo sviluppo)
npm run watch:css    # ricompila assets/css/style.css a ogni salvataggio
npm run build:css    # build finale (CSS compresso)
```

Per vedere il sito in locale basta un server statico, per esempio l'estensione
**Live Server** di VS Code oppure:

```bash
python -m http.server 5173
```

`assets/css/style.css` è **generato**: va modificato il Sass in `assets/scss/`,
mai il CSS compilato.

## Scelte tecniche

| Requisito | Come è stato risolto |
|---|---|
| Pagina CV in HTML | `cv/index.html`, con foglio di stile dedicato alla stampa (Ctrl/Cmd + P per il PDF) |
| Pagina contatti con form | `contact/index.html`, campi con `required`, `type="email"`, `minlength` |
| Framework front end | Bootstrap 5 (reboot, griglia, utility), caricato in locale da `assets/css/vendor/` |
| Favicon | `favicon.svg` |
| Menu sticky | header `position: sticky` su tutte le viewport; su mobile il menu si apre a tutto schermo |
| Flexbox / Grid | CSS Grid per la griglia progetti, le sezioni e il form; Flexbox per header, footer, statistiche e liste |
| Sass | architettura 7-1 semplificata in `assets/scss/` |
| Responsive | scala tipografica fluida (`clamp` + `vw`), verificata a 390, 768 e 1440 px |
| Open Graph | meta `og:*` e `twitter:*` su ogni pagina, con `assets/img/og-cover.png` |

Il menu a tutto schermo è realizzato con una checkbox nascosta e il selettore
`:checked`: nessun JavaScript, quindi la cartella `assets/js/` resta vuota.

## Contenuti da personalizzare

Il sito è completo dal punto di vista tecnico, ma i contenuti sono ancora quelli
del concept e vanno sostituiti:

- nome, bio, statistiche, testi delle pagine e voci del CV;
- link social (LinkedIn, GitHub `giuvul`, email) e CV in PDF in `assets/cv/`;
- URL del sito nei meta `og:url` e `canonical` di ogni pagina;
- le immagini in `assets/img/`: sono **segnaposto vettoriali** generati a mano,
  pensati per essere rimpiazzati da foto e screenshot reali;
- l'`action` del form in `contact/index.html`: va puntato al proprio endpoint
  (Formspree, Basin, Netlify Forms) oppure collegato a EmailJS.

L'indirizzo email nella pagina contatti è scritto con entità HTML numeriche e non
è un `mailto:`: resta leggibile per chi visita il sito ma non è testo semplice
per i bot che raccolgono indirizzi.

## Pubblicazione su GitHub Pages

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<utente>/<repo>.git
git push -u origin main
```

Poi su GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
Il file `.nojekyll` serve a far pubblicare anche le cartelle il cui nome inizia
con `_`. Dopo il primo deploy va aggiornato il dominio nei meta `og:url` e
`canonical` di ogni pagina.
