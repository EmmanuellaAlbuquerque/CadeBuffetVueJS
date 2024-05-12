const app = Vue.createApp({
  data() {
    return {
      query: '',
      buffets: [],
      buffet: null,
      events: [],
      formData: {
        event_date: '',
        qty_invited: ''
      }
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
    },

    async checkEventAvailability(event_id) {
      event.preventDefault();
      if (!this.formData.event_date || !this.formData.qty_invited) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      let response = await fetch(`http://localhost:3000/api/v1/events/${event_id}/available?event_date=${this.formData.event_date}&qty_invited=${this.formData.qty_invited}`);
      const found_event = this.events.find(event => event.id === event_id);
      
      found_event.availability_response = await response.json();
    }
  }
});

app.mount('#app');
