<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomeNew from './components/HomeNew.vue';
import HomeHot from './components/HomeHot.vue';
import HomePanel from './components/HomePanel.vue';
</script>
<template>
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomePanel title="新品好物" sub-title="新鲜好物 好多商品">
        <div>我</div>
    </HomePanel>
    <HomePanel title="人气推荐" sub-title="人气推荐 好多商品"></HomePanel>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
</template>
<style></style>