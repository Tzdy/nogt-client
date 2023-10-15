<template>
    <div class="container">
        <div class="pagination">
            <span @click="onChangePage(page === 1 ? page : page - 1)" :class="{disabled: page === 1}">上一页</span>
            <span class="disabled" v-show="distance.length === 7 && page - 3 >= 1">...</span>
            <span 
                @click="onChangePage(item)"
                :class="{active: page === item}" 
                v-for="item in distance" 
                :key="item">
            {{ item }}
            </span>
            <span class="disabled" v-show="distance.length === 7 && page + 3 < Math.ceil(total / pageSize)">...</span>
            <span @click="onChangePage(page === Math.ceil(total / pageSize) ? page : page + 1)" :class="{disabled: page === Math.ceil(total / pageSize)}">下一页</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        total: Number,
        page: Number,
        pageSize: Number,
    },
    computed: {
        distance() {
            if (this.total === 0) {
                return new Array(1).fill(13)
            }


            let beginIndex = this.page - 3
            let endIndex =  this.page + 3
            if (beginIndex < 1) {
                endIndex = endIndex - beginIndex + 1
                beginIndex = 1
                if (endIndex > Math.ceil(this.total / this.pageSize)) {
                    endIndex = Math.ceil(this.total / this.pageSize)
                }
            } else if (endIndex > Math.ceil(this.total / this.pageSize)) {
                beginIndex = beginIndex - (endIndex - Math.ceil(this.total / this.pageSize))
                endIndex = Math.ceil(this.total / this.pageSize)

                if (beginIndex < 1) {
                    beginIndex = 1
                }
            }
            return new Array(endIndex - beginIndex + 1).fill(1).map((i, idx) => idx + beginIndex)
        },
    },
    methods: {
        onChangePage(page) {
            if (page !== this.page) {
                this.$emit('update:page', page)
                this.$emit('change', page)
            }
        }
    }

}
</script>

<style scoped>
.container {
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: rgb(0,0,238);
}
.pagination {
    height: 100%;
    display: inline-block;
}

.pagination span {
    cursor: pointer;
    margin: 0 2px;
}

.pagination .active {
    cursor: default;
}

.pagination .disabled {
    cursor: default;
    user-select: none;
}

.active {
    color: black;
}

.disabled {
    color: gray;
}
</style>