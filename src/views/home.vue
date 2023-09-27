<template>
  <div class="hold-transition skin-purple sidebar-mini">
    <div class="wrapper">
    <Head></Head>
    <Aside></Aside>
    <router-view></router-view>
    <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Head from '@/components/homeParts/Head.vue'
import Footer from "@/components/homeParts/Footer.vue";
import Aside from "@/components/homeParts/Aside.vue";
export default {
  name: 'home',
  components: {
    Head,
    Footer,
    Aside
  }
}
</script>
