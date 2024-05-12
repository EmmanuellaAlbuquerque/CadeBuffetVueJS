const app = Vue.createApp({
  data() {
    return {
      query: '',
      buffets: [],
      buffet: null,
      events: []
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
    },

    async getBuffet(id) {
      let response = await fetch(`http://localhost:3000/api/v1/buffets/${id}`);
      this.buffet = await response.json(); 

      await this.getEvents(this.buffet.id);
    },

    async getEvents(buffet_id) {
      let response = await fetch(`http://localhost:3000/api/v1/buffets/${buffet_id}/events`);
      this.events = await response.json(); 
    }
  }
});

app.mount('#app');
