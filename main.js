const app = Vue.createApp({
  data() {
    return {
      query: '',
      buffets: []
    }
  },

  computed: {
    searchedBuffet() {
      if (this.query) {
        return this.buffets.filter(buffet => {
          return buffet.trading_name.toLowerCase().includes(this.query.toLowerCase());
        });
      }
      else {
        return this.buffets;
      }
    }
  },

  async mounted() {
    this.searchedBuffet = await this.getBuffets();
  },

  methods: {
    async getBuffets() {
      let response = await fetch('http://localhost:3000/api/v1/buffets');
      this.buffets = await response.json();
    }
  }
});

app.mount('#app');
