<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="text-white" style="background-color: #2c2d38">
      <q-toolbar>
        <div class="row full-width">
          <div class="col-10 self-center" style="padding-left: 4%">
            <q-toolbar-title class="no_selection">
              <q-avatar
                @click="$router.push({ name: 'main' })"
                style="cursor: pointer"
                rounded
              >
                <q-img  src="../assets/logoM.png" />
              </q-avatar>
            </q-toolbar-title>
          </div>
          <div class="col-2 self-center" style="padding-right: 4%">
            <q-btn
              outline
              class="text-center float-right"
              @click="isMenu = !isMenu"
              label="Menu"
              icon="menu"
            >
              <q-menu
                :offset="[0, 12]"
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(list, index) in listData"
                    :key="index"
                    clickable
                    :to="list.route"
                  >
                    <q-item-section>{{ list.text }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="text-white" style="background-color: #2c2d38">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      isMenu: false,
      //Array
      listData: [
        { route: "/", text: "Anasayfa" },
        { route: "about", text: "About" },
      ],
      //Object
    };
  },
};
</script>