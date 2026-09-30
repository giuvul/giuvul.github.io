# giuvul.github.io

Portfolio personale di **Giuseppe Vulduraro**, Chief Data Officer e Data & AI Engineer.
Sito statico in **HTML + Sass + Bootstrap 5**, senza JavaScript, pubblicato su
GitHub Pages: <https://giuvul.github.io/>.

Nato come progetto del modulo HTML e CSS del Master in AI e Agenti AI per il
Business (Università degli Studi Guglielmo Marconi), resta il mio sito personale
anche dopo il master.

## Pagine

| URL | Contenuto |
|---|---|
| `/` | home: presentazione e accesso ai lavori |
| `/work/` | nove case study, filtrabili per area (Data, Analytics, Platform, AI) |
| `/work/<slug>/` | un case study: problema, approccio, risultato e diagramma interattivo |
| `/about/` | profilo, aree di lavoro, attività fuori dal lavoro |
| `/cv/` | curriculum in HTML, con PDF scaricabile e foglio di stile per la stampa |
| `/contact/` | contatti e form (FormSubmit) |
| `/contact/thanks/` | conferma dopo l'invio del form (`noindex`) |

## Struttura delle cartelle

```
.
├── index.html                  home
├── favicon.svg
├── .nojekyll                   GitHub Pages pubblica i file così come sono
├── work/
│   ├── index.html              griglia dei progetti con filtri
│   └── <slug>/index.html       nove case study
├── about/index.html
├── cv/index.html
├── contact/
│   ├── index.html              contatti + form
│   └── thanks/index.html
└── assets/
    ├── css/
    │   ├── style.css           GENERATO da Sass (Bootstrap incluso)
    │   └── fonts.css           @font-face dei font self-hosted
    ├── cv/                     CV in PDF
    ├── fonts/                  Archivo, Barlow, Saira (subset latin, woff2)
    ├── img/
    │   ├── projects/           anteprime SVG delle card
    │   ├── photos/             ritratto
    │   ├── icons.svg           sprite delle icone dei diagrammi
    │   ├── hero-mountain.webp  immagine della home
    │   ├── nav-monoliths.webp  immagine del menu
    │   └── og-cover.png        anteprima per la condivisione social (1200×630)
    └── scss/
        ├── vendor/             Bootstrap dai sorgenti: reboot, griglia, helper, utility
        ├── abstracts/          design token, mixin, funzioni di Bootstrap
        ├── base/               reset e tipografia
        ├── layout/             cornice e linee guida, header, sezioni, footer
        ├── components/         menu, pulsanti, card, form, timeline, diagrammi
        ├── pages/              stili specifici di ogni pagina
        └── main.scss           punto di ingresso
```

Ogni pagina vive in una cartella con il proprio `index.html`, così gli URL restano
puliti (`/work/`, `/cv/`); le risorse statiche stanno tutte sotto `assets/`.

## Come lavorarci

```bash
npm install          # Sass e Bootstrap, solo per lo sviluppo
npm run watch:css    # ricompila assets/css/style.css a ogni salvataggio
npm run build:css    # build finale, CSS compresso
python -m http.server 5173   # anteprima locale su http://127.0.0.1:5173
```

`assets/css/style.css` è generato: si modifica il Sass in `assets/scss/`, mai il
CSS compilato. Il sito va aperto da un server (anche locale), non come file: lo
sprite `icons.svg` viene richiamato con `<use href>` e i browser lo bloccano su
`file://`.

## Scelte tecniche

| Requisito | Come è risolto |
|---|---|
| HTML semantico | `header`, due `nav` con `aria-label` distinti più quella del footer, `main`, `article` per le card, `figure`/`figcaption` per i diagrammi, `dl` per i metadati dei case study |
| Sass | architettura 7-1 semplificata caricata con `@use`/`@forward`; design token in `abstracts/_variables.scss`, scala tipografica fluida in `clamp()` |
| Bootstrap 5 | compilato dai sorgenti Sass con solo reboot, griglia, helper e le utility di impaginazione. Griglia per le card di Work, le colonne di About e il form; `media-breakpoint-up/down` per tutti i breakpoint del Sass |
| Flexbox / Grid | griglia di Bootstrap (flexbox) per card e form, CSS Grid per le intestazioni di pagina e il CV, Flexbox per header, footer e liste |
| Menu sticky | header `position: sticky` su ogni viewport; sotto i 992px il menu si apre a tutto schermo |
| Responsive | tre colonne → due → una per le card, intestazioni su una colonna sotto i 992px, nessuno scorrimento orizzontale da 280px in su |
| Pagina CV | HTML generato dalla stessa fonte dati del PDF; stili di stampa dedicati |
| Form di contatto | `required`, `type="email"`, `minlength`, `autocomplete`; errore mostrato solo dopo l'interazione (`:not(:placeholder-shown):invalid`); honeypot anti-spam; invio con un normale POST a FormSubmit e ritorno su `/contact/thanks/` |
| Favicon e condivisione | `favicon.svg`; meta description, `canonical`, Open Graph e Twitter card su ogni pagina |

### Interazione senza JavaScript

La cartella `assets/js/` è vuota: tutta l'interazione passa da input nascosti
e selettori CSS.

- **Menu a tutto schermo**: una checkbox invisibile ma raggiungibile da tastiera
  (Tab, poi Spazio) apre e chiude il menu; il focus si vede sul pallino ciano.
- **Filtri di Work**: un radio per categoria; `:checked ~` evidenzia la voce e
  nasconde le card fuori categoria. I selettori sono generati con `@each`.
- **Diagrammi dei case study**: su desktop la spiegazione di ogni passo compare
  in hover o con il focus, agganciata alla casella con l'anchor positioning
  (`position-anchor`) dove il browser lo supporta; su mobile un tocco apre un
  pannello sopra il diagramma.

### Contenuti generati

I diagrammi dei case study, le anteprime delle card, lo sprite delle icone e il
partial `components/_diagram-hits.scss` (posizione delle aree attive, una mappa
Sass trasformata in regole da un ciclo `@each`/`@for`) sono prodotti da script
Python di supporto a partire da una specifica per ogni progetto. Lo stesso vale
per la pagina CV e il PDF, generati da un'unica fonte dati. Gli script non fanno
parte del sito pubblicato.

### Accessibilità

- i grigi del testo rispettano il contrasto AA: il più chiaro, `$color-faint`,
  è ad almeno 4.6:1 su tutte le superfici del sito;
- `aria-current` sulla voce di menu attiva, `aria-label` sui controlli senza testo;
- menu, filtri e diagrammi utilizzabili da tastiera;
- le pagine sono raggiungibili anche dai link del footer;
- l'email è scritta in entità HTML ovunque, per non comparire in chiaro nel sorgente.

## Pubblicazione

Il sito è pubblicato da GitHub Pages dal branch `main` (cartella radice) del
repository `giuvul/giuvul.github.io`. Il file `.nojekyll` disattiva Jekyll, che
altrimenti escluderebbe i file che iniziano con `_`, come i partial Sass.
