<template lang="pug">
div(style='width: 100%; height: 100%;')
  span ttttttttt
</template>

<script>

export default {
  mounted () {
  },
  methods: {
    isGoldTime () {
      let date = new Date()
      // 日期要在2019年1月8日以后
      let time = new Date(2019, 0, 8)
      if (date.getTime() < time.getTime()) {
        return false
      }
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = date.getDate()
      if (date.getDate() < 10) {
        day = '0' + day
      }
      let dateStr = `${year}-${month}-${day}`
      // 假日
      let holidays = ['2019-02-04']
      // 调休
      let dayOff = []
      // 在假日中
      if (holidays.indexOf(dateStr) >= 0) {
        return false
      }
      // 非假日的周一至周五，或者调休
      if ((date.getDay() > 0 && date.getDay() < 6) || dayOff.indexOf(dateStr) >= 0) {
        // 当前时间为今天的第N分钟
        let times = date.getHours() * 60 + date.getMinutes()
        // 当前时间在9:30 ~ 17:00中
        if ((times >= 9 * 60 + 30) && (times <= 17 * 60)) {
          return true
        }
      }
      return false
    },
    accMul (arg1, arg2) {
      let m = 0
      let s1 = arg1.toString()
      let s2 = arg2.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {
      }
      try {
        m += s2.split('.')[1].length
      } catch (e) {
      }
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
