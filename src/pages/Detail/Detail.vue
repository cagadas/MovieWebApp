<template>
  <div class="row q-mt-xl justify-center">
    <div
      class="col-2 items-center"
      :class="$q.screen.width < 720 ? 'flex flex-center  col-xs-12' : ''"
    >
      <div class="imgBorder" style="width: 280px">
        <q-img
          contain
          :src="'https://www.themoviedb.org/t/p/w500/' + movieData.poster_path"
        >
        </q-img>
      </div>
    </div>
    <div :class="$q.screen.width < 720 ? 'col-xs-9' : 'col-8'">
      <movie-info :data="movieData"></movie-info>
    </div>
    <div class="col-10 q-my-md">
      <span class="text-italic text-bold" style="font-size: 18px"> Cast </span>
      <span
        class="float-right seeAll"
        :class="$q.screen.width < 720 ? '' : 'q-pt-md'"
      >
        See All
      </span>
    </div>
    <div class="col-10">
      <div v-if="castList !== null" class="row">
        <div
          class=""
          :class="$q.screen.width < 720 ? 'col-xs-6 q-mt-sm' : 'col-1'"
          v-for="(data, index) in castList"
          :key="index"
          v-show="$q.screen.width < 720 ? index < 6 : index < 12"
        >
          <cast-card :data="data" />
        </div>
      </div>
    </div>
    <div class="col-10 q-my-md">
      <media-card v-if="mediaData" :data="mediaData"></media-card>
    </div>
  </div>
</template>

<script>
import Movies from "../../models/Movies";
import MovieInfo from "components/MovieInfoCard.vue";
import MediaCard from "components/MediaCard.vue";
import CastCard from "components/CastCard.vue";
export default {
  data() {
    return {
      moviesModel: new Movies(),
      movieData: {},
      videoData: [],
      castData: [],
    };
  },
  components: {
    MovieInfo,
    MediaCard,
    CastCard,
  },
  created() {
    var getMovieArr = ["movie", this.$route.params.id];
    var getCastArr = ["movie", this.$route.params.id, "credits"];
    this.moviesModel.find(getMovieArr).then((res) => {
      this.movieData = res;
    });
    this.moviesModel.find(getCastArr).then((res) => {
      this.castData = res;
    });
    /* if (Object.keys(this.$store.state.movieData).length === 0) {
    } else {
      this.movieData = this.$store.state.movieData;
    }*/
  },
  computed: {
    mediaData() {
      var obj;
      obj = this.movieData;
      return obj;
    },
    castList() {
      var arr;
      arr = this.castData.cast;
      return arr;
    },
  },
};
</script>

<style>
</style>