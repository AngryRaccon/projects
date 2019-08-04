import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playedLength: 16,
            cartsState: [],
        }
        this.state.cartsState = this.initGameField();
    }

    initGameField = () => {
        let cartsState = [];
        for(let i = 0; i < this.state.playedLength; i++) {
            cartsState.push({
                value: (i !== this.state.playedLength - 1) ? i+1 : '',
            });
        }
        cartsState.sort(function(){
            return Math.random() - 0.5;
        })
        return cartsState;
    }

    refreshGame = () => {
        let cartsState = this.initGameField();
        this.setState({cartsState});
    }

    movePlate = (e) => {
        let i = e.currentTarget.dataset.number;
        console.log('movePlate');
        if(this.state.cartsState[i].value) {
            let vacant = this.checkNeighbours(i);
            console.log(vacant);
            if (vacant !== -1) {
                console.log('its work' + vacant);
                let cartsState = this.state.cartsState.slice();
                [cartsState[i], cartsState[vacant]] = [cartsState[vacant], cartsState[i]];
                this.setState({ cartsState });
            }
        }
    }

    checkNeighbours = (idx) => {
        let x = idx % 4;
        let y = Math.trunc(idx / 4);
        let arr = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
        let newArr = arr.filter((elem) => {
            return elem[0] >= 0 && elem[1] >= 0 && elem[0] <= 3 && elem[1] <= 3;
        })
        let result = newArr.filter((elem) => {
            let idx = elem[1] * 4 + elem[0];
            return this.state.cartsState[idx].value === '';
        })
        if (result.length === 0) {
            return -1
        } else {
            return result[0][1] * 4 + result[0][0]
        }
    }

    render() {
        return(
            <>
            <div className='gameboard'>
            {this.state.cartsState.map((elem, idx, arr) => (
                <div key={idx} className='cart' onClick={this.movePlate} data-number={idx}>{`${elem.value}`}</div>
            ))}
            </div>
            <button onClick={this.refreshGame}>New Game</button>
            </>
        )
    }
}

export default App;
