<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    export default {
        props: {
            cellData: String,
            rowIndex: Number,
            cellIndex: Number
        },

        methods: {
            onClickTd() {
                const rootData = this.$root.$data;
                console.log(rootData);
               // console.log(this.$parent.$data);
               // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
               // vue에서 인덱스로 접근하면 데이터가 안변함. vue.set을 사용!
               this.$set( rootData.tableData[this.rowIndex], this.cellIndex, this.$root.$data.turn);
               

                let win = false;
                if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn){
                    win = true;
                }
                if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn){
                    win = true;
                }
                if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn &&  rootData.tableData[2][2] === rootData.turn){
                    win = true;
                }                
                if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn ){
                    win = true;
                }

                if( win ) { // 이긴 경우
                    rootData.winner = rootData.turn;
                    rootData.turn = 'o';
                    rootData.tableData = [['','',''],['','',''],['','','']];
                }else { // 무승부
                    let all = true; // all이 true면 무승부라는 뜻
                    rootData.tableData.forEach( (row) => { // 무승부 검사
                        row.forEach( (cell) => {
                            if( !cell ) {
                                all = false;
                            }
                        })
                    })
                    if( all) { 
                        rootData.winner = '';
                        rootData.turn = 'o';
                         rootData.tableData = [['','',''],['','',''],['','','']];
                    } else{ // 게임이 아직 끝나지 않은 경우
                        rootData.turn = rootData.turn === 'o' ? 'x' : 'o';
                    }
                    
                }

                 

            },
        }
    };
</script>

