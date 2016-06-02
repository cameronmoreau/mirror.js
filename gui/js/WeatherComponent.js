var WeatherComponent = Vue.extend({
  template: "\
    <div class='weather-box'>\
      <div class='weather-location'>{{location}}</div>\
      <i class='left weather-icon wi {{icon}}'></i>\
      <div class='right'>\
        <div class='weather-temp'>{{temp}}&deg; F</div>\
        <div class='weather-sub'>{{condition}}</div>\
        <div class='weather-sub'>Humidity <span class='thin'>{{humid}}</span></div>\
        <div class='weather-sub'>Wind <span class='thin'>{{wind}}mph</span></div>\
      </div>\
      <div class='clear'></div>\
    </div>\
  ",
  data: function() {
    return {
      condition: '',
      temp: '',
      humid: '',
      wind: '',
      icon: '',
      location: '',
    }
  },
  ready: function() {
    var self = this;
    $.get('http://api.wunderground.com/api/5ef9851cb5724a26/conditions/q/TX/Arlington.json', function(data) {
      var w = data.current_observation;
      self.$set('condition', w.weather);
      self.$set('temp', Math.round(w.temp_f));
      self.$set('humid', w.relative_humidity);
      self.$set('wind', w.wind_mph);
      self.$set('location', w.display_location.full);
      self.$set('icon', self.getIcon(w.icon));
    });
  },
  methods: {
    getIcon: function(s) {
      var icons = {
        "chanceofflurries": "wi-snow-wind",
        "chanceofrain": "wi-rain",
        "chanceofsleet": "wi-sleet",
        "chanceofsnow": "wi-snow",
        "chanceofathunderstorm": "wi-thunderstorm",
        "clear": "wi-night-clear",
        "cloudy": "wi-cloudy",
        "flurries": "wi-snow-wind",
        "hazy": "wi-smog",
        "mostlycloudy": "wi-cloudy",
        "mostlysunny": "wi-day-sunny",
        "partlycloudy": "wi-day-cloudy",
        "partlysunny": "wi-day-cloudy",
        "rain": "wi-rain",
        "sleet": "wi-sleet",
        "snow": "wi-snow",
        "sunny": "wi-day-sunny",
        "thunderstorm": "wi-thunderstorm",
        "unknown": "wi-meteor"
      }

      var temp = icons[s.toLowerCase()];
      if(typeof temp === 'undefined') {
        console.log(s);
        return icons['unknown'];
      }
      else return temp;
    }
  }
});

Vue.component('weather', WeatherComponent);
