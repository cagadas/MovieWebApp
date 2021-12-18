<template>
  <div class="row q-gutter-y-lg">
    <div class="col-auto" :class="$q.screen.width < 720 ? 'mid' : 'header'">
      <span class="block"> {{ data.title }} ( {{ data.release_date }} ) </span>
      <q-chip
        v-for="genre in data.genres"
        :key="genre.id"
        style="background-color: #e36329; color: white"
        :style="$q.screen.width < 720 ? 'font-size: 12px;margin-top:16px' : ''"
      >
        <span>
          {{ genre.name }}
        </span>
      </q-chip>
    </div>
    <div class="col-12">
      <div class="row items-center">
        <q-icon class="q-mr-sm" name="star" color="green" size="lg" />
        <span class="mid">{{ data.vote_average }}</span>
      </div>
    </div>
    <div class="col-12">
      <span
        class="text-italic text-bold"
        style="text-decoration: underline; font-size: 18px"
      >
        Summary 
      </span>
      <span class="q-pl-sm" style="font-size: 18px">
        {{ data.tagline }}
      </span>
      <span class="block q-pt-sm normal" style="max-width: 640px">
        {{ data.overview }}
      </span>
    </div>
    <div class="col-12">
      <div class="row">
        <div class="col-12">
          <span
            class="text-italic text-bold"
            style="text-decoration: underline; font-size: 18px"
          >
            Producers
          </span>
        </div>
        <div class="row full-width">
          <div
            dense
            v-for="production in data.production_companies"
            :key="production.id"
            class="q-mt-sm"
            :class="$q.screen.width < 720 ? 'col-xs-12' : 'col-4'"
          >
            <div class="row items-center">
              <div
                class="col-auto"
                style="border: 1px solid; border-radius: 5px; padding: 1px"
              >
                <q-img
                  v-if="production.logo_path !== null"
                  width="92px"
                  height="45px"
                  contain
                  :src="
                    'https://www.themoviedb.org/t/p/original/' +
                    production.logo_path
                  "
                />
                <div
                  class="flex flex-center"
                  style="width: 92px; height: 45px"
                  v-else
                >
                  <q-icon name="mdi-block-helper" color="red" size="xs" />
                  <span> No Image</span>
                </div>
              </div>
              <div class="q-pl-md col-auto">
                <span>
                  {{ production.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  data() {
    return {
      castData: [],
    };
  },
  props: { data: Object },
};
</script>

<style lang="scss">
</style>