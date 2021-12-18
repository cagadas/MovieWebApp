<template>
  <div class="row justify-center">
    <div class="col-auto text-center">
      <q-img
        width="96px"
        height="96px"
        class="imgCls"
        :src="
          data.profile_path !== null
            ? 'https://www.themoviedb.org/t/p/w185/' + data.profile_path
            : 'https://iupac.org/wp-content/uploads/2018/05/default-avatar-300x300.png'
        "
      />
      <span class="block"> {{ data.name }} </span>
      <span class="block" style="font-size: 11px"> {{ character }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CastCard",
  data() {
    return {
      character: "",
    };
  },
  props: {
    data: Object,
  },
  created() {
    this.character = this.data.character.split("/")[0];
  },
};
</script>

<style lang="scss">
.imgCls {
  //position: relative;
  z-index: 5;
  //transform: translateY(8px);
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 3px 0 6px -2px rgb(100, 100, 100),
    -3px 0 6px -2px rgb(100, 100, 100);
}
/*.spanClass {
  border-radius: 5px;
  z-index: 1;
  position: relative;
  padding: 12px;
  box-shadow: 0px 1px 3px rgb(100, 100, 100);
}*/
</style>