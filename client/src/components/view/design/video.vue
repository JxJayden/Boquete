<template>
    <div>
        <div class="video-container">
            <iframe width="560"
                    height="315"
                    src="https://www.youtube.com/embed/RyxtYRkzqcg?list=PL1MxVBsQo85qbTHKgEgpCh7ytX9uyIsYY"
                    frameborder="0"
                    allowfullscreen></iframe>
        </div>

        <video class="responsive-video"
               controls>
            <source src="https://www.youtube.com/embed/RyxtYRkzqcg?list=PL1MxVBsQo85qbTHKgEgpCh7ytX9uyIsYY"
                    type="video/mp4">
        </video>
    </div>
</template>
<script>
export default {
    name: 'video-component',
    props: ['content'],
    data() {
        return {

        }
    }
}
</script>
