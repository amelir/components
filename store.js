export const sidebarStore = {
  state: {
    visible: false,
    mobileOpen: false,
    links: []
  },

  mutations: {
    setSidebarLinks(state, links){
      state.links = links;
    },

    toggleMobileSidebar(state){
      state.mobileOpen = !state.mobileOpen;
    },

    toggleSidebar(state, open){
      state.visible = Boolean(open);
    },
  }
}