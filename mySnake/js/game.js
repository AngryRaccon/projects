"use strict";

let game = {
    settings,
    renderer,
    snake,
    food,
    tickInterval: null,
    status,

    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);

        if( !this.settings.validate()) {
            return;
        }

        this.renderer.renderMap(this.settings.rowsCount, this.settings.colsCount);

        this.setEventHandlers();

        this.snake.init(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());

        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakePoint(), 'up');
        this.food.setFoodCoordinates(this.getRandomCoordinates());
        this.status.resetScore();
        this.render();
    },

    render() {
        this.renderer.render(this.snake.body, this.food.getFoodCoordinates());
        this.renderer.setScore(this.makeScoreContent());
    },

    play() {
        this.status.setPlaying();
        this.setTicker();
        this.changePlayButton('Стоп');
    },
    
    setTicker() {
        let k = this.status.speedMultiplexor
        clearInterval(this.tickInterval);
        this.tickInterval = setInterval( () => game.tickHandler(), 1000.0 / (k*this.settings.speed));
    },
    
    increaseSnakeSpeed() {
        this.status.speedMultiplexor += 0.5;
        this.setTicker();
    },

    tickHandler() {
        if (!this.canSnakeMakeStep()) {
            this.finish();
            return;
        }

        if(this.food.isFoodPoint(this.snake.getNextStepHeadPoint())) {
            this.status.increaseScore();
            this.snake.incrementBody();
            this.food.setFoodCoordinates(this.getRandomCoordinates());
            this.increaseSnakeSpeed();
            if(this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    isGameWon() {
        return this.snake.body.length >= this.settings.winLength;
    },
    
    isGameLoosed() {
        return  this.status.isFinished() && this.snake.body.length < this.settings.winLength;
    },

    finish() {
        //ставим статус в финиш
        this.status.setFinished();
        //останавливаем шаги змейки
        clearInterval(this.tickInterval);
        //меняем кнопку игры, сделаем серой и напишем игра закончена
        this.changePlayButton('Игра закончена', true);
        this.render();
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.changePlayButton('Старт');
    },

    getStartSnakePoint() {
        return {
            x: Math.floor(this.settings.colsCount / 2),
            y: Math.floor(this.settings.rowsCount / 2)
        }
    },

    changePlayButton(textContent, isDisabled = false) {
        let playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getRandomCoordinates() {
        let exclude = [...this.snake.body, this.food.getFoodCoordinates()];

        while(true) {
            let rndPoint = {
                x: Math.floor(Math.random() * this.settings.colsCount),
                y: Math.floor(Math.random() * this.settings.rowsCount),
            };

            let excludeContainsRndPoint = exclude.some(function (elem) {
                return rndPoint.x === elem.x && rndPoint.y === elem.y;
            });

            if(!excludeContainsRndPoint) {
                return rndPoint;
            }
        }
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    setEventHandlers() {
        document.getElementById('playButton').onclick =  function () {
            game.playClickHandler();
        };
        document.addEventListener('keydown', () => this.keyDownHandler(event));
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if(!this.status.isPlaying()) {
            return;
        }

        let direction = this.getDirectionByCode(event.code);
        if(this.canSetDirection(direction)) {
            this.snake.setDirection(direction)
        }
    },

    canSetDirection(direction) {
        return direction === 'up' && this.snake.lastStepDirection !== 'down' ||
            direction === 'right' && this.snake.lastStepDirection !== 'left' ||
            direction === 'down' && this.snake.lastStepDirection !== 'up' ||
            direction === 'left' && this.snake.lastStepDirection !== 'right';
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSnakeMakeStep() {
        let nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isBodyPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.settings.colsCount &&
            nextHeadPoint.y < this.settings.rowsCount &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },
    
    makeScoreContent() {
        let color = "black";
        let content = `Счёт: ${this.status.score}/${this.settings.winLength - 1}`;
        if (this.isGameWon()) {
            content += '<br>Вы выиграли! 🙃';     
            color = "green";
        } else if (this.isGameLoosed()) {
            content += '<br>Вы проиграли! 😔';
            color = "red";
        }
        return {score: content, color: color};
    }
};

window.onload = function () {
    game.init({speed: 2, winLength: 10});
};

