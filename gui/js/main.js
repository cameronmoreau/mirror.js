var GreetingComponent = Vue.extend({
  template: '<h1>Hello</h1>'
});

Vue.component('greeting', GreetingComponent);

var ClockComponent = Vue.extend({
  template: "\
    <div class='clock'>\
      <div class='clock-date'>{{date}}</div>\
      <div class='clock-time'>{{time}}</div>\
    </div>",
  data: function() {
    return {
      'time': '10:44 PM',
      'date': 'Monday the 26th'
    }
  },
  ready: function() {
    //this.$set('time', '');
    //this.$set('date', '');
  }
});

Vue.component('clock', ClockComponent);

var app = new Vue({
  el: '#app',
  data: {
    name: 'Cameron',
    weather: 'hello'
  },
  template: "\
  <div>\
    <weather></weather>\
    <clock></clock>\
  </div>\
  "
});
