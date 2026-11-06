# Libretto di volo · versione con Google

Ognuno accede con il proprio account Google. I dati di ciascuno vanno in una cartella privata del suo Google Drive: nessun altro li vede, nemmeno chi gestisce l'app. L'app funziona anche senza rete e si installa sul telefono con "Aggiungi alla schermata Home".

Nei passi qui sotto, `UTENTE` è il nome che sceglierai su GitHub. L'indirizzo dell'app sarà `https://UTENTE.github.io/libretto/`.

## 1. Pubblicare l'app su GitHub (gratis)

1. Vai su https://github.com/signup e crea un account. Il nome utente comparirà nell'indirizzo dell'app: scegline uno semplice, per esempio `dondario`.
2. In alto a destra tocca **+** e poi **New repository**. Nome: `libretto`. Lascialo **Public** e tocca **Create repository**.
3. Nella pagina del repository tocca **uploading an existing file**. Trascina **tutti i file e la cartella `icons`** che trovi dentro questo pacchetto (non la cartella che li contiene). Poi tocca **Commit changes**.
4. Vai su **Settings** e poi **Pages**. In "Branch" scegli `main` e la cartella `/ (root)`, poi **Save**. Dopo un paio di minuti l'app è online all'indirizzo `https://UTENTE.github.io/libretto/`.

Il repository è pubblico, ma contiene solo il programma. I dati di voli e diario non passano mai da GitHub.

## 2. Collegare l'app a Google (gratis)

1. Vai su https://console.cloud.google.com con **dondario.acquaroli@gmail.com**. Accetta i termini e crea un nuovo progetto chiamato `Libretto di volo`.
2. Cerca **Google Drive API** nella barra in alto, aprila e tocca **Abilita**.
3. Apri **Google Auth Platform** (nel menu: API e servizi → Schermata consenso OAuth) e tocca **Inizia**:
   - Nome app: `Libretto di volo`; email di assistenza: la tua.
   - Pubblico: **Esterno**.
   - Email di contatto: la tua. Accetta e crea.
4. Nella sezione **Accesso ai dati** tocca **Aggiungi o rimuovi ambiti** e aggiungi:
   - `.../auth/drive.appdata`
   - `.../auth/userinfo.email`

   Salva.
5. Nella sezione **Branding** inserisci:
   - Home page: `https://UTENTE.github.io/libretto/`
   - Informativa privacy: `https://UTENTE.github.io/libretto/privacy.html`
6. Nella sezione **Client** tocca **Crea client**, tipo **Applicazione web**, nome `Libretto`:
   - Origini JavaScript autorizzate: `https://UTENTE.github.io`
   - URI di reindirizzamento autorizzati: `https://UTENTE.github.io/libretto/` (con la barra finale)

   Tocca **Crea** e copia l'**ID client** (finisce con `.apps.googleusercontent.com`).
7. Su GitHub apri il file `config.js`, tocca la matita, incolla l'ID client al posto di `INCOLLA-QUI-IL-CLIENT-ID.apps.googleusercontent.com` e tocca **Commit changes**.

## 3. Invitare chi deve provarla

Finché l'app è "in test", la possono usare solo gli account Google che inserisci tu, fino a 100.

1. In **Google Auth Platform → Pubblico → Utenti di prova** tocca **Add users** e scrivi le loro email Google (Gmail o account Google della scuola).
2. Manda loro l'indirizzo `https://UTENTE.github.io/libretto/`.
3. Al primo accesso Google mostra l'avviso "Google non ha verificato questa app". È normale per un'app in prova: si tocca **Continua**.

Per aprirla a chiunque senza elenco bisogna passare l'app "in produzione" su Google. Lo faremo quando servirà.

## 4. Installarla sul telefono

- **iPhone**: apri l'indirizzo in **Safari**, tocca Condividi → **Aggiungi alla schermata Home**.
- **Android**: apri l'indirizzo in **Chrome**, menu ⋮ → **Installa app** (o "Aggiungi a schermata Home").

## Portare i dati dal libretto su Claude

1. Nel libretto su Claude, in fondo alla scheda Libretto, tocca **Esporta** e salva il file.
2. Nella nuova app accedi con Google e poi tocca **Importa** e scegli quel file.

## Aggiornare l'app

Per una nuova versione basta caricare su GitHub i file nuovi al posto dei vecchi (Add file → Upload files), lasciando invariato `config.js`. Se cambi i file, aumenta anche il numero di versione in `sw.js` (`libretto-v1` diventa `libretto-v2`): così i telefoni scaricano subito la versione nuova.
