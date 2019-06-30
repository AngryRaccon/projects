class Settings {
    constructor() {
        this.init(); 
        this.colorTheme = {colorTheme1: ['green', 'yellowgreen'], colorTheme2: ['crimson', 'orangered']};
    }
    
    init() {
        document.querySelector('.container').addEventListener('click', (elem) => {
            let set = document.querySelector('.toset');
            let btn = document.querySelector('.settingsBtn');
            if (elem.target.classList.contains('notPressed') || (elem.target.classList.contains('settingsBtnImg') && elem.target.parentNode.classList.contains('notPressed')) ){
                btn.classList.remove('notPressed');
                btn.classList.add('Pressed');
                set.style.display = (set.style.display == 'none') ? '' : 'none';
            } else {
                if(!(elem.target.classList.contains('toset') || elem.target.parentNode.classList.contains('toset') ) && btn.classList.contains('Pressed')) {
                    btn.classList.remove('Pressed');
                    btn.classList.add('notPressed');
                    set.style.display = (set.style.display == 'none') ? '' : 'none';
                }
            };
        });
        document.querySelector('.isMuted').addEventListener('click', () => {
            let flags = document.getElementById('soundOnFlag');
            let bombs = document.getElementById('soundOnBomb');
            let cells = document.getElementById('soundOnClick');
            let soundBtn = document.querySelector('.isMuted');
            if(soundBtn.classList.contains('soundOn')) {
                soundBtn.classList.remove('soundOn');
                soundBtn.classList.add('soundOff');
                flags.muted = true;
                bombs.muted = true;
                cells.muted = true;
            } else {
                soundBtn.classList.remove('soundOff');
                soundBtn.classList.add('soundOn');
                flags.muted = false;
                bombs.muted = false;
                cells.muted = false;
            }
        })
        document.querySelector('.toset').addEventListener('click', (elem) => {
            if(elem.target.classList.contains('chooseBG')) {
                this.setBG(elem.target);
            };
            if(elem.target.classList.contains('colorTheme')) {
                this.setColorTheme(elem.target);    
            };
        })
    }
    
    setBG(elem) {
        let image = elem.getAttribute("src");
        document.querySelector('.container').style.backgroundImage = `url(../Sapper/${image})`;
    }
    
    setColorTheme(elem) {
        let scheme = elem.getAttribute('id');
        if (document.querySelector('.table').getAttribute('data-color') != scheme) {
            document.querySelector('.table').setAttribute('data-color', `${scheme}`);
            let header = document.querySelector('.header');
            if (header.classList.contains('greenTheme')) {
                header.classList.remove('greenTheme');
                header.classList.add('redTheme');
            } else {
                header.classList.remove('redTheme');
                header.classList.add('greenTheme');
            } 
            let [x, y] = this.colorTheme[scheme];
            for(let i = 0; i < 10; i++) {
                for(let j = 0; j < 10; j++) {
                    let currTD = document.querySelector(`[data-i = '${i}'][data-j = '${j}']`);
                    if((i % 2 == j % 2)) {
                        (currTD.classList.contains('green')) ? currTD.classList.remove('green') : currTD.classList.remove('crimson');
                        document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add(`${x}`);
                    } else {
                        (currTD.classList.contains('yellowgreen')) ? currTD.classList.remove('yellowgreen') : currTD.classList.remove('orangered');
                        document.querySelector(`[data-i = '${i}'][data-j = '${j}']`).classList.add(`${y}`);
                    }
                }
            }
        }
        
    }
}

let mySettings = new Settings();