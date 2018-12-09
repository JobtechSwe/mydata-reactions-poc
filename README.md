My data reactions framework
===


## Bakgrund
Detta projekt är ett experimentprojekt för att reda ut hur bästa API:et kan konstrueras för att data genom strömmar kan skapa nya strömmar utan att få beroende mellan varandra. 

Detta är en del av MyData-initiativet. Läs mer på https://github.com/jobtechswe/mydata

## Innehåll

* /streams - Här finns exempelströmmar som skickar ut ny data i realtid i omformat till RxJS strömmar
* /reactions - Reducerare som tar en typ av data och returnerar en annan. Dessa skulle anropas via HTTP i vanliga fall
* /storage - En asynkron in-memory databas som ska simulera en riktig databas/lagring inkl enkelt hash-träd för konsistens
* index.js - Exempel på hur man kopplar ihop strömmarna med reaktionerna

## Installation

    npm install
    npm test
    npm start

