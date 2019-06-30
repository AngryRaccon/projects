class Game {
    constructor() {
        this.colorScheme = 'colorTheme1';
        this.numOfBombs = 15;
        this.closedCells = 100;
        this.Bomb = [];
        this.lives_at_start = 3;
        this.lives;
        this.liveArr;
        this.table;
        this.numOfFlags = 0;
        this.lastChoose = '';
        this.init();
    }
    
    init() {
        document.oncontextmenu = function (){return false};
        document.querySelector('.new-game').addEventListener('click', () => {
            this.lives = document.querySelectorAll('.live');
            for(let i = 0; i < this.lives.length; i++) {
                this.lives[i].style.display = 'inline-block';
            }
            this.hideShadow();
            this.deleteTable();
            this.newGame();
        });
        this.newGame();
    }
    
    addBombs() {
        this.Bomb = [];
        let uniqueBombs = [];
        do {
            let xcoord = Math.round(Math.random()*9);
            let ycoord = Math.round(Math.random()*9);
            xcoord = xcoord == 10 ? 'xcoord' : '0' + xcoord;
            ycoord = ycoord == 10 ? 'ycoord' : '0' + ycoord;
            let currCoord = xcoord + ycoord;
            if(! uniqueBombs.includes(currCoord)) {
                uniqueBombs.push(currCoord);
                this.Bomb.push({x: + xcoord, y: + ycoord}); 
            }
        } while(uniqueBombs.length != this.numOfBombs); 
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                let currentArr = [i, j];
                for(let idx = 0; idx < this.Bomb.length; idx++) {
                    let currentBomb = Object.values(this.Bomb[idx]);
                    if(currentArr.every((value, index) => value == currentBomb[index])) {
                    let targetCell = document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add('bomb');
                    }
                }    
            }
        }
        let cellsWithBomb = document.querySelectorAll('.bomb');
    }

    gamePlay() {
        document.querySelector('.table').addEventListener('click', (elem) => {if(elem.target.tagName == 'TD' && elem.target.classList.contains('newCell') && !elem.target.classList.contains('flag')) {
            document.getElementById('soundOnFlag').pause();
            document.getElementById('soundOnFlag').currentTime = 0;
            document.getElementById('soundOnClick').pause();
            document.getElementById('soundOnClick').currentTime = 0;
            document.getElementById('soundOnBomb').pause();
            document.getElementById('soundOnBomb').currentTime = 0;
            elem.target.classList.remove('newCell');
            let dataI = elem.target.getAttribute('data-i');
            let dataJ = elem.target.getAttribute('data-j');
            if(dataI % 2 == dataJ % 2) {
                elem.target.classList.add('burlywood');
            } else {
                elem.target.classList.add('bisque');
            }
            if(elem.target.classList.contains('bomb') && this.lives == 1){
                elem.target.innerHTML = "&#128163;";
                this.colorScheme = document.querySelector('.table').getAttribute('data-color');
                document.getElementById('soundOnBomb').play();
                elem.target.addEventListener('click', this.showBombs());
                let last = this.liveArr[this.liveArr.length - 1];
                last.style.display = 'none';
            } else if(elem.target.classList.contains('bomb') && this.lives !=1) {
                elem.target.innerHTML = "&#128163;";
                document.getElementById('soundOnBomb').play();
                let last = this.liveArr[this.liveArr.length - 1];
                last.style.display = 'none';
                this.liveArr = [...this.liveArr].slice(0, -1);
                this.lives -= 1;  
            }
              else {
                document.getElementById('soundOnClick').play();
                this.surround(elem.target);
            }
        }
            if(this.isWin(document.querySelector('.table'), this.lives_at_start, this.lives)) {
                this.colorScheme = document.querySelector('.table').getAttribute('data-color');
                this.showTextHideSelector('.loseP');
            };
        });
    }
    
    showBombs() {
        let cellWithBombs = document.querySelectorAll('.bomb');
        let closedBombs = [];
        for(let i = 0; i < cellWithBombs.length; i++) {
            if(cellWithBombs[i].classList.contains('newCell')) {
                closedBombs.push(cellWithBombs[i])
            }
        }
        let lockedDiv = document.createElement('div');
        lockedDiv.id = 'locked-div';
        document.querySelector('.table').appendChild(lockedDiv);
        let int = setInterval(() => {
            if(closedBombs.length != 0){
                document.getElementById('soundOnBomb').pause();
                document.getElementById('soundOnBomb').currentTime = 0;
                let bomb = closedBombs.pop();
                bomb.classList.remove('newCell');
                let dataI = bomb.getAttribute('data-i');
                let dataJ = bomb.getAttribute('data-j');
                if((dataI % 2) == (dataJ % 2)) {
                    bomb.classList.add('burlywood');
                } else {
                    bomb.classList.add('bisque');
                }
                document.getElementById('soundOnBomb').play();
                bomb.innerHTML = "&#128163;";
            } else {
                clearInterval(int);
                document.querySelector('.table').removeChild(document.getElementById('locked-div'));
                this.showTextHideSelector('.winP');
            }
        }, 200);
         
    }
    
    surround(elem) {
        let count = 0;
        let cellI = +elem.getAttribute('data-i');
        let cellJ = +elem.getAttribute('data-j');
        for(let i = cellI - 1; i <= cellI + 1; i++) {
            if(i == -1 || i == 10) {
                continue;
            }
                for(let j = cellJ - 1; j <=cellJ + 1; j++) {
                    if(j == -1 || j == 10){ 
                        continue;
                    } else {
                        if(document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.contains('bomb')) {
                                count++;
                        }
                    }
                }
        }
        if(count == 0) {
            elem.innerHTML = '';
            this.cascade(elem);    
        } else {
            elem.innerHTML = count;
            if(count > 2) {
                elem.style.color = 'red';    
            }
        }
    }
        
    cascade(elem) {
        let count = 0;
        let cellI = +elem.getAttribute('data-i' );
        let cellJ = +elem.getAttribute('data-j');
        for(let i = cellI - 1; i <= cellI + 1; i++) {
            if(i == -1 || i == 10) {
                continue;
            }
                for(let j = cellJ - 1; j <=cellJ + 1; j++) {
                    if(j == -1 || j == 10){ 
                        continue;
                    } else {
                        let currCell = document.querySelector(`[data-i = '${i}'][data-j = '${j}']`); 
                        if(currCell.classList.contains('flag')) {
                            currCell.classList.remove('flag');
                            this.numOfFlags -= 1;
                            document.querySelector('.numOfFlags').innerHTML = this.numOfFlags;
                        }
                        if(currCell.classList.contains('newCell')) { 
                            currCell.classList.remove('newCell');
                            if(i % 2 == j % 2) {
                                currCell.classList.add('burlywood');
                            } else {
                                currCell.classList.add('bisque');
                            }
                            this.surround(currCell);
                        }
                    }
                }
        }    
    }           
    
    isWin(table, lives_at_start, lives) {
        let closed = table.querySelectorAll('.newCell').length;
        if(closed == this.numOfBombs - (this.lives_at_start - this.lives)) {
            return true;
        }
    }
        
    showShadow() {
        let shadowDiv = document.createElement('div');
        shadowDiv.id = 'shadow-div';
        document.querySelector('.table').appendChild(shadowDiv);
    }  
        
    showTextHideSelector(selector) {
        this.showShadow();
        document.querySelector('.result').style.display = 'block';
        document.querySelector(selector).style.display = 'none';
        let x = (document.querySelector('.container').offsetWidth - document.querySelector('.result').offsetWidth) / 2;
        let y = (document.querySelector('.container').offsetHeight - document.querySelector('.result').offsetHeight) / 2;
        document.querySelector('.result').style.right = `${x}px`;
        document.querySelector('.result').style.top = `${y}px`;
    }
    
    flags() {
        document.querySelector('.numOfFlags').innerHTML = this.numOfFlags;
        document.querySelector('.table').addEventListener('contextmenu', (elem) => {
            document.getElementById('soundOnFlag').pause();   
            document.getElementById('soundOnFlag').currentTime = 0;
            if(elem.target.classList.contains('newCell') && elem.target.innerHTML == '') {
                elem.target.innerHTML = '&#128681;';
                this.numOfFlags += 1;
                elem.target.classList.add('flag');
            } else if (elem.target.classList.contains('flag')) {
                elem.target.innerHTML = '';
                this.numOfFlags -= 1;
                elem.target.classList.remove('flag');
            }
            document.getElementById('soundOnFlag').play();    
            document.querySelector('.numOfFlags').innerHTML = this.numOfFlags;
        })
    }
    
    hideShadow() {
        document.querySelector('.table').removeChild(document.getElementById('shadow-div'));
        document.querySelector('.result').style.display = 'none';    
    }
    
    deleteTable() {
    let t = document.querySelector('.table');
    t.remove();
    }
    
    newGame() {
        this.colorScheme;
        this.render();
        this.addBombs();
        this.numOfFlags = 0;
        this.flags();
        this.gamePlay();
        this.lives = this.lives_at_start;
        this.liveArr = document.querySelectorAll('.live');
        for (let type of ['.loseP', '.winP'])
            {document.querySelector(type).style.display = 'block'}
    }
    
    render() {
        this.table = '';
        for (let i = 0; i < 10; i++) {
            this.table += '<tr>';
                for(let j = 0; j < 10; j++) {
                this.table += `<td data-i = '${i}' data-j = '${j}' class='newCell'></td>`;
            };
            this.table +='</tr>';
        }
        this.table = '<table class="table"><tbody>' + this.table + '</tbody></table>';
        document.querySelector('.fortable').insertAdjacentHTML("afterbegin", this.table);
        document.querySelector('.table').setAttribute('data-color', this.colorScheme);
        switch(this.colorScheme) {
            case 'colorTheme1':
                for(let i = 0; i < 10; i++) {
                    for(let j = 0; j < 10; j++) {
                        if(i % 2 == j % 2) {
                            document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add('green');
                        } else {
                            document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add('yellowgreen');
                        }
                    }
                };
                break;
            case 'colorTheme2': 
                for(let i = 0; i < 10; i++) {
                    for(let j = 0; j < 10; j++) {
                        if(i % 2 == j % 2) {
                            document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add('crimson');
                        } else {
                            document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add('orangered');
                        }
                    }
                }; 
                break;
        }
    }
}

let myGame = new Game();