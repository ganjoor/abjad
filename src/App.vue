<template>
    <div id="app">
        <div align="center">
            <img alt="محاسبه‌گر ابجد" src="./assets/logo.png">
        </div>
        <div align="center">
            <input v-model="inputString" placeholder="متن را اینجا وارد کنید" size="50" />
            <p>{{ calc(inputString).n }}</p>
            <p>{{ calc(inputString).desc }}</p>
            <p v-if="returnUrl != null"><a :href="returnUrl">برگشت</a></p>
        </div>
    </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
      inputString: "",
      returnUrl: null
  }),
  mounted(){
      this.inputString = this.$route.query.q;
      this.returnUrl = this.$route.query.r;
  },
  methods: {
    
    calc(str) {
      var ret = { n: 0, desc: "" };

      for (var i = 0; i < str.length; i++) {
        var n = 0;
        switch (str.charAt(i)) {
          case "ا":
          case "آ":
          case "أ":
          case "إ":
            n = 1;
            break;
          case "ب":
          case "پ":
            n = 2;
            break;
          case "ج":
          case "چ":
            n = 3;
            break;
          case "د":
            n = 4;
            break;
          case "ه":
            n = 5;
            break;
          case "و":
            n = 6;
            break;
          case "ز":
            n = 7;
            break;
          case "ح":
            n = 8;
            break;
          case "ط":
            n = 9;
            break;
          case "ی":
          case "ي":
            n = 10;
            break;
          case "ک":
          case "ك":
          case "گ":
            n = 20;
            break;
          case "ل":
            n = 30;
            break;
          case "م":
            n = 40;
            break;
          case "ن":
            n = 50;
            break;
          case "س":
            n = 60;
            break;
          case "ع":
            n = 70;
            break;
          case "ف":
            n = 80;
            break;
          case "ص":
            n = 90;
            break;
          case "ق":
            n = 100;
            break;
          case "ر":
            n = 200;
            break;
          case "ش":
            n = 300;
            break;
          case "ت":
          case "ة":
            n = 400;
            break;
          case "ث":
            n = 500;
            break;
          case "خ":
            n = 600;
            break;
          case "ذ":
            n = 700;
            break;
          case "ض":
            n = 800;
            break;
          case "ظ":
            n = 900;
            break;
          case "غ":
            n = 1000;
            break;
        }
        if (n != 0) {
          if (ret.desc != "") {
            ret.desc += " + ";
          }
          ret.desc += "[" + str.charAt(i) + " = " + n.toString() + "]";
          ret.n += n;
        }
      }
      return ret;
    }
  }
};
</script>

<style>
    * {
        direction: rtl;
        font-family: 'Samim';
    }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
