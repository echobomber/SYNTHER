export default {
  methods: {
    // 轉換貨幣
    currencyTrans (amount) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'TWD'
      })
      return formatter.format(amount)
    }
  }
}
