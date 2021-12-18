<template>
  <div class="row" style="max-width: 228px">
    <div class="col-12 imgBorder" style="max-height: 338px; cursor: pointer">
      <q-img
        @mouseover="onMouse = true"
        @mouseleave="onMouse = false"
        :src="
          'https://www.themoviedb.org/t/p/w220_and_h330_face/' +
          movieData.poster_path
        "
      >
        <div class="absolute-bottom rateCard" :class="onMouse ? 'up' : 'down'">
          <div class="row">
            <div class="col-6 text-center">
              <q-circular-progress
                show-value
                class="text-white"
                :value="movieData.vote_average * 10"
                size="70px"
                :thickness="0.1"
                :color="rateColor"
                track-color="transparent"
              >
                <q-icon name="star" color="grey-4" size="md" />
                {{ movieData.vote_average }}
              </q-circular-progress>
            </div>
            <div class="col-6 self-center">
              <div
                v-for="(text, index) in genreTextArr.slice(0, 2)"
                :key="index"
              >
                {{ text }}
              </div>
            </div>
          </div>
        </div>
      </q-img>
    </div>
    <div class="col-12 q-pa-sm">
      <span>{{ movieData.title }}</span>
      <span class="block">{{ movieData.release_date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  data() {
    return {
      onMouse: false,
      value: 71,
      genreTextArr: [],
    };
  },
  props: { movieData: Object, genreList: Array },
  created() {
    this.movieData.genre_ids.forEach((t, index) => {
      this.genreTextArr.push(this.genreList.filter((e) => e.id === t)[0].name);
    });
  },
  computed: {
    rateColor() {
      var color, rate;
      rate = this.movieData.vote_average * 10;
      if (rate < 50) {
        color = "red";
      } else if (rate < 70 && rate >= 50) {
        color = "yellow";
      } else if (rate >= 70) {
        color = "green";
      }
      return color;
    },
  },
};
</script>

<style lang="scss">
.rateCard {
  filter: brightness(100%);
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.up {
  -webkit-transition: -webkit-transform 0.5s ease;
  -moz-transition: -moz-transform 0.5s ease;
  -o-transition: -o-transform 0.5s ease;
  transition: transform 0.5s ease;
  transform: translateY(0%);
}
.down {
  -webkit-transition: -webkit-transform 0.7s ease;
  -moz-transition: -moz-transform 0.7s ease;
  -o-transition: -o-transform 0.7s ease;
  transition: transform 0.7s ease;
  transform: translateY(100%);
}
.q-img__content > div {
  padding: 0px;
  padding-top: 16px;
  padding-right: 0px;
  padding-bottom: 16px;
  padding-left: 0px;
}
</style>