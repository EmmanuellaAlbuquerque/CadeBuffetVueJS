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
      },
      filteredBuffets: []
    }
  },

  computed: {
    searchedBuffet() {
      if (this.query) {
        return this.filteredBuffets;
      }
      else {
        return this.buffets;
      }
    }
  },

  async mounted() {
    await this.getBuffets();
  },

  watch: {
    query(newQuery) {
      this.searchBuffets(newQuery);
    }
  },

  methods: {
    async resetBuffet() {
      this.buffet = null;
    },

    async getBuffets() {
      let response = await fetch('http://localhost:3000/api/v1/buffets');
      this.buffets = await response.json();
    },

    async searchBuffets(newQuery) {
      let response = await fetch(`http://localhost:3000/api/v1/buffets?query=${newQuery}`);
      this.filteredBuffets = await response.json();
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
      const date_Parts = this.formData.event_date.split('-');
      found_event.event_date = date_Parts[2] + '/' + date_Parts[1] + '/' + date_Parts[0];
      found_event.qty_invited = this.formData.qty_invited;

      this.formData.event_date = '';
      this.formData.qty_invited = '';
    }
  }
});

app.mount('#app');
