const memory = {                                    // cała gra to obiekt
    tileCount : 20, // wszystkie klocki
    tileOnRow : 5, // liczba w rzędzie
    divArea : null, // plansza
    divScore : null, // wynik
    tiles : [], // tablica losowych klocków
    tilesSelected : [], // zaznaczone klocki - do porównania
    moveCount : 0, // licznik ruchów
    canSelect : true, // czy można klinąć kafelek (na czas porównywania obrazków w elementClick zmieniane na false)
    pairs : 0, // znalezione pary obrazków
    stars : null, //ilość gwiazdek
    gameImg : [ // klocki
        'images/title_1.png',
        'images/title_2.png',
        'images/title_3.png',
        'images/title_4.png',
        'images/title_5.png',
        'images/title_6.png',
        'images/title_7.png',
        'images/title_8.png',
        'images/title_9.png',
        'images/title_10.png'
    ],

    elementClick : function(el) {
        if (this.canSelect) {
            if (!this.tilesSelected[0] || (this.tilesSelected[0].dataset.index !== el.target.dataset.index)) {  // sprawdzanie czy obrazek nie został kliknięty (wcale lub 2x ten sam)
                this.tilesSelected.push(el.target);
                el.target.style.backgroundImage = 'url(' + this.gameImg[el.target.dataset.imageTypeC] + ')';     // ustawiamy tło z numerem pobranym z data
            }

            if (this.tilesSelected.length === 2) {
                this.canSelect = false;

                if (this.tilesSelected[0].dataset.imageTypeC === this.tilesSelected[1].dataset.imageTypeC) {      //porównanie typów wybranych obrazków
                    // bind() jest po to żeby this wskazywało na kafelek a nie na window
                    setTimeout(this.deleteTiles.bind(this), 1000);                                       // takie same więc usuwamy elementy (funkcja deleteTiles)
                } else {
                    setTimeout(this.resetTiles.bind(this), 1000);                                        // różne więc resetujemy tablice tilesSelected (funkcja resetTiles)
                }

                this.moveCount++; // licznik ruchów
                this.divScore.innerHTML = this.moveCount;

                if (this.moveCount === 21 ){
                    console.log("masz 5 gwiazdek");
                    var element = document.getElementById("1");
                    element.parentNode.removeChild(element);
                }
                if (this.moveCount === 26 ) {
                    console.log("masz 4 gwiazdki");
                    var element = document.getElementById("2");
                    element.parentNode.removeChild(element);
                }
                if (this.moveCount === 31 ) {
                    console.log("masz 3 gwiazdki");
                    var element = document.getElementById("3");
                    element.parentNode.removeChild(element);
                }
                if (this.moveCount === 36 ) {
                    console.log("masz 2 gwiazdki");
                    var element = document.getElementById("4");
                    element.parentNode.removeChild(element);
                }
            }
        }
    },

    elementClick1 : function(el) {
        if (this.canSelect) {
            if (!this.tilesSelected[0] || (this.tilesSelected[0].dataset.index !== el.target.dataset.index)) {  // sprawdzanie czy obrazek nie został kliknięty (wcale lub 2x ten sam)
                this.tilesSelected.push(el.target);
                el.target.style.backgroundImage = 'url(' + this.gameImg[el.target.dataset.imageTypeT] + ')';     // ustawiamy tło z numerem pobranym z data
            }

            if (this.tilesSelected.length === 2) {
                this.canSelect = false;

                if (this.tilesSelected[0].dataset.imageTypeT === this.tilesSelected[1].dataset.imageTypeT) {      //porównanie typów wybranych obrazków
                    // bind() jest po to żeby this wskazywało na kafelek a nie na window
                    setTimeout(this.deleteTiles.bind(this), 1000);                                       // takie same więc usuwamy elementy (funkcja deleteTiles)
                } else {
                    setTimeout(this.resetTiles1.bind(this), 1000);                                        // różne więc resetujemy tablice tilesSelected (funkcja resetTiles)
                }

                this.moveCount++; // licznik ruchów
                this.divScore.innerHTML = this.moveCount;

                if (this.moveCount === 21 ){
                    console.log("masz 5 gwiazdek");
                    var element = document.getElementById("1");
                    element.parentNode.removeChild(element);
                }
                if (this.moveCount === 26 ) {
                    console.log("masz 4 gwiazdki");
                    var element = document.getElementById("2");
                    element.parentNode.removeChild(element);
                }
                if (this.moveCount === 31 ) {
                    console.log("masz 3 gwiazdki");
                    var element = document.getElementById("3");
                    element.parentNode.removeChild(element);
                }
                if (this.moveCount === 36 ) {
                    console.log("masz 2 gwiazdki");
                    var element = document.getElementById("4");
                    element.parentNode.removeChild(element);
                }
            }
        }
    },

    deleteTiles : function() {              // usuwamy obrazki z tablicy tilesSelected
        this.tilesSelected[0].remove();
        this.tilesSelected[1].remove();
        this.canSelect = true;              // ponownie umożliwiamy klikanie kafelków
        this.tilesSelected = [];            // czy to jest konieczne?

        this.pairs++;
        if  (this.pairs >= this.tileCount /2 ) {
            alert('brawo gra skończona');
        }
    },

    resetTiles : function(){                // ukrywamy obrazki z tablicy tilesSelected (bo nie są takie same)
        this.tilesSelected[0].style.backgroundImage = 'url(images/title.png)';
        this.tilesSelected[1].style.backgroundImage = 'url(images/title.png)';
        this.canSelect = true;              // ponownie umożliwiamy klikanie kafelków
        this.tilesSelected = [];            // czy to jest konieczne?
    },

    resetTiles1 : function(){                // ukrywamy obrazki z tablicy tilesSelected (bo nie są takie same)
        this.tilesSelected[0].style.backgroundImage = 'url(images/troll.png)';
        this.tilesSelected[1].style.backgroundImage = 'url(images/troll.png)';
        this.canSelect = true;              // ponownie umożliwiamy klikanie kafelków
        this.tilesSelected = [];            // czy to jest konieczne?
    },

    startGame : function () {                      // metoda to rozpoczęcia gry
        /////////////////////////////////////////////////////////////
        this.divArea = document.querySelector('.game-area');
        this.divArea.innerHTML = '';

        //czyścimy planszę z ruchami
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        this.stars = document.querySelector('.game-star');
        this.stars.innerHTML = '';

        //czyścimy zmienne (bo gra może się zacząć ponownie)
        this.tiles = [];
        this.tilesSelected = [];
        this.moveCount = 0;
        this.canSelect = true;
        this.pairs = 0;
        this.gameImg = [        // klocki classic
            'images/title_1.png',
            'images/title_2.png',
            'images/title_3.png',
            'images/title_4.png',
            'images/title_5.png',
            'images/title_6.png',
            'images/title_7.png',
            'images/title_8.png',
            'images/title_9.png',
            'images/title_10.png'
        ];
        for(i=1; i < 6; i++){
            const el = document.createElement("img");

            el.setAttribute("id", i);
            el.src = "images/star.png";

            const img = document.querySelector(".game-star");
            img.appendChild(el);
        }
        ////////////////////////////////////////////////////////////

        for (let i = 0; i <this.tileCount; i++) {       // generowanie tablicy klocków (pary)
            this.tiles.push(Math.floor(i / 2));
        }

        for (let i=this.tileCount-1; i>0; i--){          //mieszanie tablicy
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {          //dodawanie elementów na planszę
            const tile = document.createElement('div');
            tile.classList.add("game-tile-classic");
            this.divArea.appendChild(tile);

            tile.dataset.imageTypeC = this.tiles[i];     // identyfikacja, przypisanie numeru obrazka
            tile.dataset.index = i;

            console.log(5+(tile.offsetWidth+5)*(i%this.tileOnRow))

            tile.style.left = 5+(tile.offsetWidth+10)*(i%this.tileOnRow) + 'px'
            tile.style.top = 5+(tile.offsetHeight+10)*(Math.floor(i/this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.elementClick.bind(this));
        }

    },

    startGame1 : function () {                      // metoda to rozpoczęcia gry
        /////////////////////////////////////////////////////////////
        this.divArea = document.querySelector('.game-area');
        this.divArea.innerHTML = '';

        //czyścimy planszę z ruchami
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        this.stars = document.querySelector('.game-star');
        this.stars.innerHTML = '';

        //czyścimy zmienne (bo gra może się zacząć ponownie)
        this.tiles = [];
        this.tilesSelected = [];
        this.moveCount = 0;
        this.canSelect = true;
        this.pairs = 0;
        this.gameImg = [                // klocki troll
            'images/troll_1.png',
            'images/troll_2.png',
            'images/troll_3.png',
            'images/troll_4.png',
            'images/troll_5.png',
            'images/troll_6.png',
            'images/troll_7.png',
            'images/troll_8.png',
            'images/troll_9.png',
            'images/troll_10.png'
        ];

        for(i=1; i < 6; i++) {
            const el = document.createElement("img");

            el.setAttribute("id", i);
            el.src = "images/star.png";

            const img = document.querySelector(".game-star");
            img.appendChild(el);
        }
        ////////////////////////////////////////////////////////////

        for (let i = 0; i <this.tileCount; i++) {       // generowanie tablicy klocków (pary)
            this.tiles.push(Math.floor(i / 2));
        }

        for (let i=this.tileCount-1; i>0; i--){          //mieszanie tablicy
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {          //dodawanie elementów na planszę
            const tile = document.createElement('div');
            tile.classList.add("game-tile-troll");
            this.divArea.appendChild(tile);

            tile.dataset.imageTypeT = this.tiles[i];     // identyfikacja, przypisanie numeru obrazka
            tile.dataset.index = i;

            console.log(5+(tile.offsetWidth+5)*(i%this.tileOnRow))

            tile.style.left = 5+(tile.offsetWidth+10)*(i%this.tileOnRow) + 'px'
            tile.style.top = 5+(tile.offsetHeight+10)*(Math.floor(i/this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.elementClick1.bind(this));
        }

    },

}

document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.game-start').addEventListener('click', function () {
            memory.startGame();
            console.log("to jest wersja klasyczna");
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.game-change-mode').addEventListener('click', function () {
        memory.startGame1();
        console.log("to jest troll");
    });
});


