document.addEventListener('DOMContentLoaded', function() {
    const pedina = document.querySelector('.pedina');  // Seleziona l'elemento con classe 'pedina'
    const pedineFisse = document.querySelectorAll('.fisse');  // Seleziona tutti gli elementi con classe 'fisse'
    
    // Funzione per generare una posizione casuale che non coincide con le pedine fisse
    function generaPosizioneCasuale() {
        let riga, colonna;
        
        do {
            riga = generaNumeroCasuale(0, 7);  // Genera un numero casuale tra 0 e 7 (inclusi) per la riga
            colonna = generaNumeroCasuale(0, 7);  // Genera un numero casuale tra 0 e 7 (inclusi) per la colonna
        } while (document.querySelector(`.row:nth-child(${riga + 1}) .col-lg-1:nth-child(${colonna + 1}) .fisse`)); // Continua a generare finché non trova una posizione libera

        // :nth-child(n) è un selettore CSS che permette di selezionare un elemento che è l'n-esimo figlio di suo padre.
        // Ad esempio, se avessimo una lista di elementi <li> all'interno di un elemento <ul>, possiamo utilizzare ul li:nth-child(2) per selezionare il secondo elemento <li> all'interno di <ul>.
        // ${riga + 1} è utilizzato per inserire il valore della variabile riga + 1 all'interno di una stringa (stessa cosa per la colonna).
        
        return { riga, colonna };  // Restituisce le coordinate della posizione casuale
    }
    
    // Posizione casuale della pedina
    let { riga, colonna } = generaPosizioneCasuale();  // Ottiene le coordinate iniziali casuali
    
    // Posizioni casuali per le pedine fisse
    pedineFisse.forEach(function(pedinaFissa) {
        const { riga, colonna } = generaPosizioneCasuale();  // Ottiene coordinate casuali per le pedine fisse
        const destinazione = document.querySelector(`.row:nth-child(${riga + 1}) .col-lg-1:nth-child(${colonna + 1})`); // Trova la destinazione basata sulle coordinate casuali
        destinazione.appendChild(pedinaFissa);  // Aggiunge la pedina fissa alla destinazione
    });
    
    // Funzione per generare un numero casuale tra min e max (inclusi)
    function generaNumeroCasuale(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);  // Restituisce un numero casuale nell'intervallo specificato
    }

    // *** FUNZIONI PRINCIPALI PER LO SPOSTAMENTO DELLA PEDINAA ***
    
    // Funzione per spostare la pedina
    function spostaPedina(r, c) {
        const nuovaRiga = riga + r;  // Calcola la nuova riga
        const nuovaColonna = colonna + c;  // Calcola la nuova colonna
        
        if (nuovaRiga >= 0 && nuovaRiga < 8 && nuovaColonna >= 0 && nuovaColonna < 8) {  // Verifica che la nuova posizione sia all'interno della griglia
            const destinazione = document.querySelector(`.row:nth-child(${nuovaRiga + 1}) .col-lg-1:nth-child(${nuovaColonna + 1})`); // Trova la destinazione basata sulle nuove coordinate
            
            if (!destinazione.querySelector('.fisse')) {  // Verifica che non ci siano pedine fisse nella nuova posizione
                riga = nuovaRiga;  // Aggiorna la riga della pedina
                colonna = nuovaColonna;  // Aggiorna la colonna della pedina
                aggiornaPosizione();  // Aggiorna la posizione della pedina nell'HTML
            }
        }
    }
    
    // Funzione per aggiornare la posizione della pedina
    function aggiornaPosizione() {
        const righe = document.querySelectorAll('.row');  // Seleziona tutte le righe
        righe[riga].children[colonna].appendChild(pedina);  // Aggiunge la pedina alla nuova posizione
        // ogett_riga[accesso_a_1_elemento]
        // children: Questo metodo restituisce una collezione degli elementi figli dell'elemento selezionato (in questo caso, l'elemento specifico all'interno di righe).
        // [colonna]: Simile a quanto fatto con [riga], questa parte indica l'accesso a un elemento specifico all'interno della collezione dei figli. colonna probabilmente è una variabile o un indice che specifica quale elemento della collezione dei figli si vuole selezionare.
    }
    
    // Event listener per i tasti della tastiera
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowUp':
                spostaPedina(-2, 0);  // Sposta la pedina verso l'alto
                break;
            case 'ArrowDown':
                spostaPedina(2, 0);  // Sposta la pedina verso il basso
                break;
            case 'ArrowLeft':
                spostaPedina(0, -2);  // Sposta la pedina a sinistra
                break;
            case 'ArrowRight':
                spostaPedina(0, 2);  // Sposta la pedina a destra
                break;
        }
    });
    
    // Inizializza la posizione della pedina
    aggiornaPosizione();  // Chiama la funzione per inizializzare la posizione della pedina
});
