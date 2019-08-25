import Vuex from 'vuex';
import Vue from 'vue'; 

Vue.use(Vuex)

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const OPEN_MINE = 'OPEN_MINE';
export const FLAG_CELL ='FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NOMALIZE_CELL = 'NOMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPENED : 0,
}


const plantMine = ( row, cell, mine ) => {
    console.log(row, cell, mine);
    const candidate = Array(row*cell).fill().map( (arr, i ) => {
        return i;
    });
    const shuffle = [];
    while ( candidate.length > row * cell - mine ) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for( let i=0; i< row; i++ ) {
        const rowData = [];
        data.push(rowData);
        for( let j = 0 ; j < cell ; j++ ) {
            rowData.push(CODE.NORMAL);
        }
    }

    for( let k=0; k< shuffle.length; k++ ) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
} ;

export default new Vuex.Store({
    state : {
        tableData : [],
        data : {
            row : 0,
            cell : 0,
            mine : 0
        },
        timer : 0,
        halted : true , // 게임이 중단된 상태
        result : '',
    }, // vue의 data와 비슷
    gettesrs : {

    }, // vue의 computed와 비슷
    mutations :  {
        [START_GAME](state, { row, cell, mine }) { 
            state.data = {
                row,
                cell,
                mine,
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer=0;
            state.halted = false;
        },
        [OPEN_CELL](state, {row, cell }) {
            Vue.set( state.tableData[row], cell, CODE.OPEND );
        },
        [OPEN_MINE](state, {row, cell }) {
            state.halted = true;
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE );
        },
        [FLAG_CELL](state, { row, cell }) {
            if( state.tableData[row][cell] === CODE.MINE ) {
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE ); 
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, {row, cell }) {
            if( state.tableData[row][cell] === CODE.FLAG_MINE ) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE ); 
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
            }           
        },
        [NOMALIZE_CELL](state,  {row, cell } ) {
            if( state.tableData[row][cell] === CODE.QUESTION_MINE ) {
                Vue.set(state.tableData[row], cell, CODE.MINE ); 
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL);
            }    
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
    actions : {

    }
})