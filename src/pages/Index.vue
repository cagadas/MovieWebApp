<template>
  <q-page class="conteiner flex flex-center">
    <div class="row fit">
      <div class="col-12"><view-port /></div>
      <div class="col-12" style="margin-bottom: 16px">
        <span class="text-h4">Populer Movies </span>
        <div class="row q-mt-md">
          <div
            class="col q-pr-sm"
            :class="$q.screen.width < 720 ? 'col-xs-6' : ''"
            v-for="(data, index) in popularData.slice(0, 7)"
            :key="index"
          >
            <movie-card
              @click.native="navigate(data)"
              :movieData="data"
              :genreList="genreList"
            />
            <span
              v-if="index + 1 === popularData.slice(0, 7).length"
              class="float-right seeAll"
            >
              See All
            </span>
          </div>
        </div>
      </div>
      <div class="col-12" style="margin-bottom: 16px">
        <span class="text-h4">Trend Movies </span>
        <div class="row q-mt-md">
          <div
            class="col q-pr-sm"
            :class="$q.screen.width < 720 ? 'col-xs-6' : ''"
            v-for="(data, index) in trendData.slice(0, 7)"
            :key="index"
          >
            <movie-card
              @click.native="navigate(data)"
              :movieData="data"
              :genreList="genreList"
            />
            <span
              v-if="index + 1 === popularData.slice(0, 7).length"
              class="float-right seeAll"
            >
              See All
            </span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import MovieCard from "components/MovieCard.vue";
import ViewPort from "components/ViewPortCard.vue";
import Movies from "../models/Movies";
import Genres from "../models/Genres";
export default {
  name: "PageIndex",
  data() {
    return {
      moviesModel: new Movies(),
      genre: new Genres(),
      genreList: [],
      popularData: [],
      trendData: [],
    };
  },
  components: { MovieCard, ViewPort },
  created() {
    //this.$store.dispatch("setMovieData", null);
    var populerArr = ["movie", "popular"];
    var trendArr = ["trending", "movie", "day"];
    var genreArr = ["genre", "movie", "list"];
    this.genre.find(genreArr).then((res) => {
      this.genreList = res.genres;
      this.moviesModel.find(populerArr).then((popular) => {
        this.popularData = popular.results;
      });
      this.moviesModel.find(trendArr).then((trend) => {
        this.trendData = trend.results;
      });
    });
  },
  methods: {
    navigate(val) {
      //this.$store.dispatch("setMovieData", val);
      this.$router.push({ name: "detail", params: { id: val.id } });
    },
  },
};
</script>

<style lang="scss">
</style>
