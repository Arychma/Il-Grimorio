# 📂 Il Grimorio — Guida ai File

---

## Struttura del progetto

```
grimorio/
│
├── .eleventy.js        ← Cervello del builder (non toccare)
├── .gitignore          ← Config Git (non toccare)
├── netlify.toml        ← Config Netlify (non toccare)
├── package.json        ← Info progetto (non toccare)
│
└── src/
    ├── index.md                    ← Home page
    │
    ├── _includes/
    │   └── base.njk                ← Template master (design, sidebar, layout)
    │
    ├── sistemi/
    │   ├── dnd55e/
    │   │   ├── index.md            ← Pagina sistema D&D 5.5e
    │   │   ├── guida/              ← Pagine guida al sistema
    │   │   ├── avventure/
    │   │   │   └── nome-avventura/
    │   │   │       ├── index.md    ← Pagina presentazione avventura
    │   │   │       └── sessioni/   ← File .md per ogni sessione
    │   │   └── archivio/
    │   │       ├── personaggi/
    │   │       ├── luoghi/
    │   │       ├── regole/
    │   │       ├── oggetti/
    │   │       └── altro/
    │   └── gurps/                  ← Stessa struttura di dnd55e
    │
    ├── ambientazioni/
    │   ├── index.njk
    │   ├── forgotten-realms/
    │   │   └── index.md
    │   └── khaesil/
    │       └── index.md
    │
    ├── comunicazioni/
    │   ├── blog/                   ← Post .md con date
    │   ├── newsletter/             ← Newsletter .md con date
    │   └── downloads/              ← File statici + index.md
    │
    └── jolly/                      ← Pagine varie
```

---

## Operazioni comuni

### Aggiungere una sessione (D&D 5.5e)

1. Copia `src/sistemi/dnd55e/avventure/esempio-avventura/sessioni/sessione-01.md`
2. Rinominala (es. `sessione-02.md`)
3. Modifica il front matter:
   - `title`: titolo della sessione
   - `date`: data in formato `YYYY-MM-DD`
   - `description`: riassunto breve
4. Scrivi il contenuto sotto il `---`

### Aggiungere un personaggio

1. Copia `src/sistemi/dnd55e/archivio/personaggi/esempio-personaggio.md`
2. Rinominala con il nome del personaggio (es. `aldric-ferrante.md`)
3. Modifica `title`, `role`, `status` nel front matter
4. Scrivi la scheda

### Aggiungere una nuova avventura

1. Crea una cartella in `src/sistemi/dnd55e/avventure/nome-avventura/`
2. Crea `index.md` dentro (copia da `esempio-avventura/index.md`)
3. Crea la sottocartella `sessioni/`
4. Aggiungi le sessioni come file `.md`

### Aggiungere un nuovo sistema di gioco

1. Crea la cartella `src/sistemi/nuovo-sistema/` con la stessa struttura di `dnd55e/`
2. In `.eleventy.js` aggiungi le collection (copia il blocco D&D 5.5e e sostituisci `dnd55e` con il nome del nuovo sistema)
3. In `src/_includes/base.njk` aggiungi la sezione nella sidebar

### Aggiungere una nuova ambientazione

1. Crea `src/ambientazioni/nome-ambientazione/index.md`
2. In `src/_includes/base.njk` aggiungi il link nella sidebar (sezione Ambientazioni)
3. In `src/ambientazioni/index.njk` aggiungi la card

### Aggiungere un file da scaricare

1. Metti il file in `src/comunicazioni/downloads/`
2. Apri `src/comunicazioni/downloads/index.md`
3. Aggiungi il blocco:

```html
<a class="download-box" href="/comunicazioni/downloads/NOMEFILE.pdf" download>
  <span class="dl-icon">📄</span>
  <div class="dl-info">
    <strong>Nome visualizzato</strong>
    <span>PDF · Descrizione</span>
  </div>
</a>
```

---

## Personalizzare il design

Tutto il design è in `src/_includes/base.njk`, nella sezione `<style>`.

### Cambiare i colori

Trova `:root {` (prime righe dello stile) e modifica i valori:

```css
:root {
  --parchment:      #f2e8d5;   ← sfondo principale
  --parchment-dark: #e0d0b0;   ← bordi e divisori
  --ink:            #1a1209;   ← testo principale
  --ink-faded:      #4a3728;   ← testo secondario
  --red:            #8b1a1a;   ← accento (titoli, link)
  --gold:           #c8922a;   ← oro (bordi sidebar)
  --gold-light:     #e8b84b;   ← oro chiaro (titolo sidebar)
  --dark-bg:        #12090a;   ← sfondo scuro sidebar/body
  --sidebar-w:      260px;     ← larghezza sidebar
}
```

### Cambiare la password

In `base.njk` cerca `SITE_PASSWORD` e modifica il valore:
```js
const SITE_PASSWORD = "NuovaPassword";
```

### Cambiare il nome del sito

- Nel tab del browser: cerca `<title>` in `base.njk`
- Nell'header mobile e sidebar: cerca `✦ IL GRIMORIO ✦` in `base.njk`
- Nelle singole pagine: modifica `siteName:` nel front matter

---

## Front matter — campi disponibili

| Campo | Dove si usa | Cosa fa |
|-------|-------------|---------|
| `title` | Tutti | Titolo della pagina |
| `siteName` | Tutti | Nome campagna nella sidebar |
| `breadcrumb` | Tutti | Livello corrente nel percorso |
| `breadcrumb2` | Sottopagine | Livello intermedio nel percorso |
| `breadcrumb2url` | Sottopagine | URL del livello intermedio |
| `date` | Sessioni, blog, newsletter | Data (formato YYYY-MM-DD) |
| `description` | Sessioni, blog | Riassunto breve |
| `role` | Personaggi | Ruolo/professione |
| `status` | Personaggi | Es. Alleato, Ostile, Morto |
| `type` | Luoghi, oggetti, regole | Tipo/categoria |
| `region` | Luoghi | Area geografica |
| `ambientazione` | Avventure | Mondo di gioco |
| `stato` | Avventure | Es. In corso, Conclusa |

---

*Qualcosa non è qui spiegato? Chiedimi.*
