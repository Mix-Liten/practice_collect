const app = {
  el: '#app',
  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 23 + 1), // just for fun :D
      cardName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      minCardYear: new Date().getFullYear(),
      amexCardMask: '#### ###### #####',
      otherCardMask: '#### #### #### ####',
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
    }
  },
  mounted() {
    document.getElementById('cardNumber').focus()
  },
  computed: {
    getCardType() {
      let number = this.cardNumber
      let re = new RegExp(/^4/)
      if (number.match(re) != null) return 'visa'

      re = new RegExp(/^3[47]/)
      if (number.match(re) != null) return 'amex'

      re = new RegExp(/^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/)
      if (number.match(re) != null) return 'mastercard'

      re = new RegExp(/^(308[8-9]|309[0-3]|3094[0]{4}|309[6-9]|310[0-2]|311[2-9]|3120|315[8-9]|333[7-9]|334[0-9]|35)/)
      if (number.match(re) != null) return 'jcb'

      return 'visa' // default type
    },
    generateCardNumberMask() {
      return this.getCardType === 'amex' ? this.amexCardMask : this.otherCardMask
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1
      return 1
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = ''
      }
    },
    getCardType(_, oldType) {
      if (oldType === 'amex' && this.cardCvv.length > 3) {
        this.cardCvv = this.cardCvv.slice(0, 3)
      }
    },
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status
    },
    focusInput(e) {
      this.isInputFocused = true
      let targetRef = e.target.dataset.ref
      let target = this.$refs[targetRef]
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      }
    },
    blurInput() {
      let vm = this
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null
        }
      }, 300)
      vm.isInputFocused = false
    },
  },
}

new Vue(app)
