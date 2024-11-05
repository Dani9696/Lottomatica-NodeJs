# Lottomatica test

Applicazione per il test in Node.js di Lottomatica. Prevede degli endpoint per la gestione degli utenti.
L'applicazione utilizza Express.js per istanziare un server ed esporre i 2 endpoint API.
Gli endpoint esposti saranno:

- [GET] `/users/id`: Recupera i dati dell'utente da Redis o MySQL e li memorizza nella cache.
- [POST] `/users`: Aggiunge un nuovo utente a MySQL e lo memorizza in Redis. I parametri accettati sono `username` ed `email`

L'ambiente utilizzato è Linux.

## Prerequisiti
- Node.js (versione LTS più recente, quella utilizzata in test è la v23.1.0)
- MySQL
- Redis (Server)

## Installazione
1. Clona il repository o scarica i file.
2. Esegui `npm install` per installare le dipendenze.


## Configurazione
- Modifica i file `config/db.js` e `config/redisClient.js` con i dettagli di connessione appropriati per MySQL e Redis.


## Avvio dell'applicazione
```bash
node app.js
```

## Test dell'applicazione
Una volta avviato il server, è possibile testare l'applicazione come segue (supponendo l'applicazione sia partita in localhost sulla porta 3000):

### POST /users/
```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"username": "username_example", "email": "email@example.com"}'
```

### GET /users/id
```bash
curl http://localhost:3000/users/1
```

## Note
- Anche se non era esplicitato, ho utilizzato express per simulare degli endpoint API che eseguono le funzioni richieste nella traccia
- Non ho utilizzato una libreria per il sanitizing degli input, che al momento è abbastanza semplice. Potrebbe essere utile utilizzare una libreria apposita per queste operazioni.
