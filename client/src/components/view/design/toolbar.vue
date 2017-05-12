<template>
    <div class="tool-bar">
        <slot>
            <span class="tool-bar-title">工具栏</span>
            <el-button v-for="tool in tools" size="small" class="tool-bar-btn" @click="tool.event">{{tool.name}}</el-button>
        </slot>
    </div>
</template>

<script>
export default {
    props: {
        tools: {
            type: Array,
            default: function () {
                return []
            }
        }
    }
}
</script>

<style>
.tool-bar {
    margin: 5px 0;
    background: #20A0FF;
    padding: 5px;
}
.tool-bar-title {
    color: #FFF;
    font-size: 14px;
}
</style>
