<script setup lang="ts">
import { onMounted } from 'vue';
import Arrow from './Arrow.vue';
import { useRouter } from 'vue-router';

const props = defineProps(['name', 'doc']);
const router = useRouter();
const Component = props.doc;

onMounted(() => {
    window.scrollTo(0, 0);
});
</script>
<template>
    <div class="arcodesign-mobile-demo-wrapper">
        <div className="demo-content" :id="`demo-${name}`">
            <div
                class="arrow-back"
                @click="router.back()"
            >
                <Arrow class="arrow-back-icon" />
            </div>
            <Component />
        </div>
    </div>
</template>
