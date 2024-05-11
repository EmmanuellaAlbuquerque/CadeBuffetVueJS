const app = Vue.createApp({
  data() {
    return {
      buffets: []
    }
  },

  async mounted() {
    await this.getBuffets();
  },

  methods: {
    async getBuffets() {
      let response = await fetch('http://localhost:3000/api/v1/buffets');
      this.buffets = await response.json();
    }
  }
});

app.mount('#app');
