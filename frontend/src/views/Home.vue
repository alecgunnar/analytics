<template>
  <div class="home">
    <h1>Welcome</h1>
    <CreateAppForm @created="goToApp" />
    <LoadAppForm @loaded="goToApp" />
  </div>
</template>

<script>
import CreateAppForm from "../components/loadApp/CreateAppForm";
import LoadAppForm from "../components/loadApp/LoadAppForm";

export default {
  name: 'home',
  methods: {
    goToApp (id) {
      this.$router.push({
        name: 'appOverview',
        params: {id}
      })
    }
  },
  components: {
    LoadAppForm,
    CreateAppForm
  }
}
</script>
