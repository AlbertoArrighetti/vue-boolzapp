const { createApp } = Vue
createApp({
    data() {
        return {
            // visualizzione contatto attivo
            activeContact: {},


            // lista contatti
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '01/10/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '03/20/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '03/20/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '03/20/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '03/28/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '03/28/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '03/28/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '01/10/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '01/10/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '01/10/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '01/10/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '01/10/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '01/10/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '01/10/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '01/10/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                },
                
            ],


            // inserimento del messaggio
            newMessageText: '',

            // risposta automatica (array da cui viene prelevata una risposta casuale)
            automaticAnswers : [
                'Ok',
                'Tutto bene, te come stai?',
                'Che fai di bello oggi?',
                'Certamente',
                'Non sta andando male',
            ],

            // intervallo per la risposta automatica = null (da settare in funzione)
            IntervalLid: null,
            // ricerca contatti side bar
            searchQuery: '',


        }
    },

    methods: {
        // funzione per prelevare il contatto attivo
        changeMain(index) {
            this.activeContact = this.filteredContacts[index];
        },

        // funzione per risposta automatica
        automaticAnswer() {
            // inizializzo variabile
            let message;
            // se il messaggio ha un contenuto che sia diverso da nullo (0)
            // tramite trim() elimino gli spazi iniziali e finali delle parole in modo che se il messaggio è composto solo da spazi o ne contiene noon vengano conteggiati 
            // in questo modo l'utente non avrà modo di inviare un messaggio senza contenuto
            if(this.newMessageText.trim().length !== 0) {
                // creo l'oggetto da inviare
                message = {
                    message: this.newMessageText,
                    status: 'sent',
                    date: new Date(),
                }
                this.activeContact.messages.push(message);
                // setto il timeout per la risposta
                setTimeout(() => {
                    // prlevo una risposta dall'array e creo un oggetto
                    this.newAnswer = {
                        message: this.automaticAnswers[Math.floor(Math.random() * this.automaticAnswers.length)],
                        status: 'received',
                        date: new Date(),
                    }

                    this.activeContact.messages.push(this.newAnswer)
                }, 1000);
                // solo se il messaggio viene inviato elimino il contenuto dalla barra
                this.newMessageText = '';
            }
        },

        // creo una funzione per richiamare sempre quella sopra
        addMessage() {
            this.automaticAnswer();
        },

        // creo una funzione per prelevare l'ora e i minuti di invio del messaggio
        getTime(time) {
            // creo una variabile con la data del messaggio
            const currentDate = new Date(time);
            // prelevo data e ora
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      
            return `${hours}:${minutes}`;
        },

        
        
    },

    // il primo conatto al caricamento della pagina è sempre il primo
    mounted() {
        this.activeContact = this.contacts[0];
    },

    // con computed aggiorno sempre il mio campo di input
    computed: {
        filteredContacts() {
            // filtro il contatto in base a cosa inserisco nel campo di input
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },

    
}).mount('#app');