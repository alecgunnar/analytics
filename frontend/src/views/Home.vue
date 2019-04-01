<template>
  <div class="home">
    <CreateAppForm @created="appCreated" />
  </div>
</template>

<script>
import CreateAppForm from "../components/createApp/CreateAppForm";
export default {
  name: 'home',
  methods: {
    appCreated (id) {
      this.$router.push({
        name: 'appOverview',
        params: {id}
      })
    }
  },
  components: {
    CreateAppForm
  }
}
</script>
