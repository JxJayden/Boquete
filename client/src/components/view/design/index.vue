<template>
    <div>
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
                <component :is="'v-' + element.type"
                           :content="element.defaultContent"
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
import { assign } from '../../../lib/utils'
import VText from './text'
import VImage from './image'
import VVideo from './video'
import VCarousel from './carousel'

const defaultModules = {
    'carousel': {
        name: '轮播',
        type: 'carousel'
    },
    'image': {
        name: '图片',
        type: 'image'
    },
    'video': {
        name: '视频',
        type: 'video'
    },
    'text': {
        name: '文字',
        type: 'text'
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
            const item = assign(defaultModules[itemType], {
                defaultContent: defaultContent || '',
                content: ''
            })
            this.customModules.push(item)
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
    border-top: 1px solid #D3DCE6;
    padding-top: 20px;
}
</style>
