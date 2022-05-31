<template>
<div>
  <v-container class="header">
    <v-row align="center" justify="center">
      <v-col
      cols="3">
        <!-- 날씨 정보가 있을 경우 -->
      <div id="weather">
      <div v-if="typeof weather.main != 'undefined'">
        <div :title="weather.weather[0].main">
          <!-- Clear -->
          <v-icon v-if="code == 800">{{ icons[5] }}</v-icon>
          <!-- Thunderstorm -->
          <v-icon v-else-if="code.substr(0, 1) == 2">
            {{ icons[0] }}
          </v-icon>
          <!-- Drizzle -->
          <v-icon v-else-if="code.substr(0, 1) == 3">
            {{ icons[1] }}
          </v-icon>
          <!-- Rain -->
          <v-icon v-else-if="code.substr(0, 1) == 5">
            {{ icons[2] }}
          </v-icon>
          <!-- Snow -->
          <v-icon v-else-if="code.substr(0, 1) == 6">
            {{ icons[3] }}
          </v-icon>
          <!-- Atmosphere -->
          <v-icon v-else-if="code.substr(0, 1) == 7">
            {{ icons[4] }}
          </v-icon>
          <!-- Clouds -->
          <v-icon v-else>
            {{ icons[6] }}
          </v-icon>
        </div>
        <div>{{ Math.round(temp) }}℃</div>
      </div>
      <!-- 날씨 정보가 없을 경우 -->
      <div v-else>
        <div>
          <v-icon>mdi-cancel</v-icon>
        </div>
        <div>
          {{ weather.cod }}
        </div>
      </div>
      </div>
      </v-col>
      <v-col cols="9">
        <h3>{{this.$store.getters.getUser.nickname}}님 환영합니다!</h3>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <div>
      {{time}}
      </div>
      </v-row>
  </v-container>
  </div>
</template>

<script>
export default {
    data: function() {
    return {
      interval: null,
      time: null,
      api_key: '9fedb142615a2b54eb304391781d02f8',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      code: '',
      temp: 0,
      // 날씨 표현 시 사용될 icon 배열
      icons: [
        'mdi-weather-lightning-rainy', // 2xx : Thunderstorm
        'mdi-weather-rainy', // 3xx : Drizzle
        'mdi-weather-pouring', // 5xx : Rain
        'mdi-weather-snowy', // 6xx : Snow
        'mdi-weather-fog', // 7xx : Atmosphere
        'mdi-weather-sunny', // 800 : Clear
        'mdi-weather-cloudy', // 8xx : Clouds
      ],
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  mounted() {
    // API 요청 URL (지역 Seoul 고정)
    let fetchUrl = `${this.url_base}weather?q=Seoul&units=metric&APPID=${this.api_key}`
    fetch(fetchUrl)
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.weather = result // 날씨 정보
        this.temp = result.main.temp // 기온
        this.code = result.weather[0].id.toString() // 날씨 코드
      })
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        year : 'numeric',
        month : 'long',
        day : 'numeric',
        weekday : 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()
    }, 1000)
  }
}
</script>

<style>
  .header {
    padding-bottom : 20px;
    margin-bottom : 5px;
    border-bottom: 1px solid lightgrey;
  }
  h2 {
    color: #2F3B52;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
  #weather {
    font-size: 0.875rem;
    font-weight: 500;
  }  
</style>
