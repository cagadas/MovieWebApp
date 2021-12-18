<template>
  <q-card class="advCard">
    <q-card-section class="q-pa-none">
      <q-img
        v-if="list.length > 0"
        height="330px"
        transition="fade"
        position="0px 0px"
        :src="
          'https://www.themoviedb.org/t/p/original/' + list[index].backdrop_path
        "
      >
        <div
          class="absolute-bottom"
          style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
        >
          <span
            class="block q-ml-lg"
            :class="$q.screen.width < 720 ? ' text-subtitle1' : 'text-h5'"
          >
            {{ list[index].title }}
          </span>
          <span
            class="q-ml-lg"
            :class="$q.screen.width < 720 ? ' ' : 'text-h5'"
          >
            {{ list[index].overview }}</span
          >
        </div>
      </q-img>
    </q-card-section>
  </q-card>
</template>

<script>
import Movies from "../models/Movies";
export default {
  name: "ViewPort",
  data() {
    return {
      moviesModel: new Movies(),
      index: 0,
      data: [],
    };
  },
  created() {
    var path = ["movie", "popular"];
    this.moviesModel.find(path).then((data) => {
      this.data = data.results;
    });
  },
  mounted() {
    if (this.index >= 5) {
      this.index = 0;
    }
    this.timer = setInterval(() => {
      this.index++;
    }, 3000);
  },
  computed: {
    list() {
      var list;
      list = this.data;
      return list;
    },
  },
};
</script>

<style lang="scss">
.advCard {
  margin: 60px 0px;
  min-height: 300px;
}
</style>