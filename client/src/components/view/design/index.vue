<template>
    <div class="design-content">
        <div class="btn-group">
            <el-button icon="plus"
                       type="primary"
                       v-for="item in modules"
                       @click="addModules(item)">{{defaultModules[item].name}}
            </el-button>
            <el-button type="success"
                       @click="saveDesign">确认保存</el-button>
        </div>
        <div class="custom-content mgt20">
            <div v-for="(element, index) in customModules">
                <div class="modules-bar">
                    <span class="modules-bar-title">工具栏</span>
                    <el-button size="small"
                               class="modulrd-bar-btn"
                               @click="removeModule">删除模块</el-button>
                </div>
                <component :is="'v-' + element.type"
                           :content="element.content"
                           :module-id="index"
                           v-on:get-content="getContent"
                           v-on:remove="removeModule">
                </component>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import VText from './text'
import VImage from './image'
import VVideo from './video'
import VCarousel from './carousel'

const defaultModules = {
    'carousel': {
        name: '轮播',
        type: 'carousel',
        content: ''
    },
    'image': {
        name: '图片',
        type: 'image',
        content: ''
    },
    'video': {
        name: '视频',
        type: 'video',
        content: ''
    },
    'text': {
        name: '文字',
        type: 'text',
        content: ''
    }
}

const defaultModulesType = ['video', 'image', 'carousel', 'text']

export default {
    name: 'vue-custom',
    props: {
        value: null,
        modules: {
            type: Array,
            default: defaultModulesType
        },
        data: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            pageData: null,
            customModules: [],
            defaultModules: defaultModules,
            finalModules: []
        }
    },
    components: {
        draggable: draggable,
        'v-text': VText,
        'v-image': VImage,
        'v-video': VVideo,
        'v-carousel': VCarousel
    },
    methods: {
        addModules(itemType, defaultContent) {
            this.customModules.push(defaultModules[itemType])
        },
        saveDesign() {
            this.$emit('input', this.customModules)
        },
        getContent(index, content) {
            this.customModules[index].content = content
        },
        removeModule(index) {
            this.customModules.splice(index, 1)
        }
    }
}
</script>
<style scoped>
.custom-content {
    border: 1px solid #D3DCE6;
    background: #F9FAFC;
    padding: 20px 0;
    margin-bottom: 20px;
}
.modules-bar {
    margin: 5px 0;
    background: #20A0FF;
    padding: 5px;
}
.modules-bar-title {
    color: #FFF;
    font-size: 14px;
}

</style>
