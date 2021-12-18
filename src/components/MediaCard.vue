<template>
  <div>
    <q-card flat class="bg-grey-3">
      <q-card-section class="q-pa-none">
        <div class="row">
          <div
            v-for="(media, index) in mediaData.slice(0, 4)"
            :key="media.id"
            :class="$q.screen.width < 720 ? 'col-xs-12 q-mt-sm' : 'col'"
            style="max-width: 420px; cursor: pointer"
            :style="index % 4 !== 3 ? 'margin-right: 2px' : ''"
          >
            <q-img
              @click="[(openDialog = true), (slide = media.id)]"
              :ratio="16 / 9"
              :src="
                media.type === 'video'
                  ? 'https://img.youtube.com/vi/' + media.url + '/0.jpg'
                  : 'https://www.themoviedb.org/t/p/w533_and_h300_face' +
                    media.url
              "
              class="rounded-borders"
            >
              <div
                v-if="media.type === 'video'"
                class="row fit justify-center text-center items-center"
                style="background-color: rgba(0, 0, 0, 0.3)"
              >
                <div class="col-auto">
                  <q-icon name="mdi-play-circle-outline" size="72px" />
                  <span class="block">Trailer</span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="openDialog">
      <q-card
        style="max-width: 100vw"
      >
        <q-card-actions class="bg-grey-3" align="left">
          <q-btn
            class="q-mx-xs q-mr-md"
            round
            dense
            flat
            color="grey-8"
            icon="close"
            v-close-popup
          />
        </q-card-actions>
        <q-card-section class="q-pa-none">
          <q-carousel
            style=""
            :style="
              $q.screen.width < 720
                ? 'height: 300px'
                : 'width: 1300px; height: 735px'
            "
            class="carouselOpacity"
            control-type="regular"
            control-color="grey-6"
            control-text-color="grey-8"
            animated
            v-model="slide"
            :arrows="$q.screen.width < 720 ? false : true"
            infinite
          >
            <q-carousel-slide
              v-for="media in mediaData"
              :key="media.id"
              class="q-pa-none"
              :name="media.id"
            >
              <div class="row fit justify-center">
                <q-video
                  style="width: 1300px"
                  v-if="media.type === 'video'"
                  :src="'https://www.youtube.com/embed/' + media.url"
                />
                <q-img
                  v-else
                  contain
                  :src="'https://www.themoviedb.org/t/p/original' + media.url"
                />
              </div>
            </q-carousel-slide>
          </q-carousel>
          <div
            class="row q-pt-xs q-pb-sm full-width flex flex-center bg-grey-3"
          >
            <div
              @click="slide = media.id"
              v-for="media in mediaData"
              class="q-mr-sm bg-grey-3"
              :key="media.id"
              :style="
                slide === media.id
                  ? 'padding: 1px;border: #1976D2 1px solid;border-radius: 5px 5px 5px 5px;'
                  : 'padding: 2px'
              "
            >
              <q-img
                class="cursor-pointer"
                style="border-radius: 5px 5px 5px 5px"
                height="65px"
                width="98px"
                :src="
                  media.type === 'video'
                    ? 'https://img.youtube.com/vi/' + media.url + '/0.jpg'
                    : 'https://www.themoviedb.org/t/p/w533_and_h300_face' +
                      media.url
                "
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Movies from "../models/Movies";
export default {
  name: "MediaCard",
  data() {
    return {
      moviesModel: new Movies(),
      openDialog: false,
      slide: 1,
      mediaData: [],
    };
  },
  props: {
    data: Object,
  },
  created() {
    var getVideosArr = ["movie", this.$route.params.id, "videos"];
    var mediaID = 1;
    var videoData = [];
    var imageData = [];
    this.moviesModel.find(getVideosArr).then((videos) => {
      for (const t of videos.results) {
        if (t.type === "Trailer" || (t.type === "Teasar" && t.official)) {
          videoData.push({
            id: mediaID,
            url: t.key,
            type: "video",
          });
          mediaID++;
        }
      }
      var videoListlength = videos.results.filter(
        (t) => t.type === "Trailer" || (t.type === "Teasar" && t.official)
      ).length;
      if (this.data.belongs_to_collection !== null) {
        var getImagesArr = [
          "collection",
          this.data.belongs_to_collection.id,
          "images",
        ];
        this.moviesModel.find(getImagesArr).then((images) => {
          for (const t of images.backdrops) {
            imageData.push({
              id: mediaID,
              url: t.file_path,
              type: "image",
            });
            mediaID++;
          }
          var imageListLength = images.backdrops.length;
          if (mediaID - 1 === videoListlength + imageListLength) {
            this.mediaData = videoData.slice(0, 2).concat(imageData);
          }
        });
      } else {
        imageData.push({
          id: mediaID,
          url: this.data.backdrop_path,
          type: "image",
        });
        if (mediaID - 1 === videoListlength) {
          this.mediaData = videoData.slice(0, 2).concat(imageData);
        }
      }
    });
  },
};
</script>

<style lang="scss">
.carouselOpacity {
  background-color: rgb(0, 0, 0);
}
</style>