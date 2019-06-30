"use strict";

let status = {
    condition: null,
    score: 0,
    speedMultiplexor: 1,
    
    increaseScore() {
        this.score++;
    },
    
    resetScore() {
        this.score = 0;
        this.speedMultiplexor = 1;
    },
    
    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
    
    isFinished() {
        return this.condition == 'finished';
    }
    
};
