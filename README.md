<h1 align="center">StudentsHUB</h1>

<p align="center">
  <img width="50%" src="https://raw.githubusercontent.com/StudentsHUBProject/StudentsHUB/master/assets/img/FinalHomeW.png" alt="StudentsHUB: logo">
</p>

<p align="center" style="margin-top: -5%" >StudentsHUB è una piattaforma creata per favorire la collaborazione tra studenti di tutt'Italia!<br><br>Progetto di gruppo realizzato per i corsi di "Linguaggi e Tecnologie per il Web" e "Reti di Calcolatori", tenuti rispettivamente dai Proff. Riccardo Rosati ed Andrea Vitaletti nel 2° semestre del 3° anno di Ingegneria Informatica e Automatica (A.A. 2021/2022) presso Sapienza Università di Roma.</p>

<p align="center">
  <a href="https://github.com/StudentsHUBProject/StudentsHUB/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a href="https://github.com/StudentsHUBProject/StudentsHUB/actions/workflows/node.js.yml">
    <img alt="Docker Compose & Node" src="https://github.com/StudentsHUBProject/StudentsHUB/actions/workflows/node.js.yml/badge.svg">
  </a>
  <a href="https://www.codefactor.io/repository/github/studentshubproject/studentshub"><img src="https://www.codefactor.io/repository/github/studentshubproject/studentshub/badge" alt="CodeFactor" /></a>
</p>

<h2 align="center">Scopo del progetto</h2>
<p>StudentsHUB nasce con lo scopo di favorire la vita degli studenti universitari tramite una piattaforma
che incita alla collaborazione tra studenti e la condivisione di materiale didattico e conoscenze.</p>

<p>La piattaforma è divisa in 3 sezioni:
La sezione Appartamenti in cui è possibile cercare appartamenti in affitto nei pressi del tuo istituto,
la sezione Libri in cui è possibile esplorare un catalogo che spazia nell'ambito di ogni materia universitaria e acquistare il libro che stai cercando e infine la sezione Corsi in cui è possibile prenotare ripetizioni tenute proprio da colleghi universitari.</p>

<p>Inoltre ogni sezione offre la possibilità di creare annunci inerenti a appartamenti, libri e corsi</p>

<h2 align="center">Architetture di riferimento e tecnologie usate</h2>

![Schema!](/assets/img/SCHEMA.png)

<h2 align="center">Soddisfacimento dei requisiti</h2>

1. __Il servizio REST che implementate (lo chiameremo SERV) deve offrire a terze parti delle API documentate.__ (requisito 1)
    - La nostra webapp offre API documentate tramite apiDoc, in particolare è possibile effettuare la GET (eventualmente con id e/o filtri).

 2. __SERV si deve interfacciare con almeno due servizi REST di terze parti.__ (requisiti 2, 3, 4)
    - La nostra webapp utilizza le seguenti API esterne:
        - Google Maps.
        - Google Calendar: OAUTH tramite account google.
        - Google Drive: OAUTH tramite account google.

3. __La soluzione deve prevedere l'uso di protocolli asincroni. Per esempio Websocket e/o AMQP.__ (requisito 5)
    - La nostra webapp implementa il protocollo Websocket, ne fa utilizzo per permettere agli utenti di inviarsi messaggi
    
4. __Il progetto deve prevedere l'uso di Docker e l'automazione del processo di lancio, configurazione e test.__ (requisito 6)
    - La nostra webapp utilizza Docker, ogni entità della nostra rete è dockerizzata, sono presenti 3 entità node per permettere a Nginx di effettuare load balancing.

5. __Deve essere implementata una forma di CI/CD per esempio con le Github Actions__ (requisito 8)
    - La nostra webapp implenta Github Actions per:
        - Testing automatico delle funzionalità.
        - Testing automatico dei servizi API offerti.
        - Deploy su https://studentshub.ersi.xyz/

6. __Requisiti minimi di sicurezza devono essere considerati e documentati. Self-signed certificate sono più che sufficienti per gli scopi del progetto.__ (requisito 9)
    - La nostra webapp accetta solo richieste https autorizzate tramite l'utilizzo di Self-signed certificate.
    - E' presente una regola che reinstrada le richieste http in entrata al reverse proxy in https.

<h2 align="center">Istruzioni per l'installazione</h2>

  1) Tramite git clonare il repository utilizzando il comando 
  ```
  git clone https://github.com/StudentsHUBProject/StudentsHUB.git
  ```
  2) Installare docker;
  3) Rinominare ```.env.example``` in ```.env```
  4) Eseguire il comando 
  ```
  docker-compose up
  ```  
  5) Aprire il browser e andare su [localhost](https://localhost);

<h2 align="center">Istruzioni per il test</h2>

- Spostarsi nella directory principale ed installare i moduli di node :

```
cd StudentsHUB

npm install
```

- Eseguire i test digitando:

```
npm run test
```

<h2 align="center">Autori</h2>

StudentsHUB è stato creato da:

- Ersi Regolli (1895021)
- Roberto Di Giovanni (1816691)
- Lorenzo Ralli (1853661)





