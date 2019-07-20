<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if='winner'>{{winner}}님의 승리</div>
    </div>
</template>


<script>
    
    import TableComponent from './TableComponent';

    export default {
        components : {
          TableComponent,
        },

        data() {
            return {
                tableData : [
                    ['','',''],
                    ['','',''],
                    ['','',''],
                ],
                turn: 'o',
                winner: '',
            };
        },

        computed : {
            onChangeData() {
                this.$set(this.tableData[1], 0, 'X'); //vue.set과 동일
            }
        },

        methods: {

    
        },

        mounted() {

        },

        beforeDestroy() {

        },


    }
</script>
    


<style scoped>
    table {
        border-collapse : collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>