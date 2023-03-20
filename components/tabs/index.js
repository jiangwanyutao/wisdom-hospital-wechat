// components/Tabs/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    },
    tabMark: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      this.setData({
        tabMark: e.currentTarget.dataset.index
      })
      this.triggerEvent("tabClickEvent", this.data.tabMark)
    }
  }
})