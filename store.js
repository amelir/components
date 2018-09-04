export const sidebarStore = {
  state: {
    visible: false,
    mobileOpen: false,
    links: []
  },

  mutations: {
    toggleSidebar(state, open){
      state.visible = Boolean(open);
    },

    setSidebarLinks(state, links){
      state.links = links;
    }
  }
}