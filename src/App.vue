<template>
  <div id="app">
    <div align="center">
      <a href="https://abjad.ganjoor.net"><img alt="محاسبه‌گر ابجد" src="./assets/logo.png" /></a>
    </div>
    <div v-if="!rev" align="center">
      <input
        class="text-input"
        v-model="inputString"
        placeholder="متن را اینجا وارد کنید"
        size="50"
      />
      <div class="result-section" v-if="inputString != null">
        <p>{{ persianizeNumerals(calc(inputString).n.toString()) }}</p>
        <p>{{ calc(inputString).desc }}</p>
      </div>
      <div class="count-section" v-if="cleanCharCount != 0">
        <p>
          شمار نویسه‌ها (از
          {{ persianizeNumerals(cleanCharCount.toString()) }} نویسه):
        </p>
        <div id="letters-stat-sourceStringContainer"></div>
        <div id="letters-stat-resultTableContainer" class="charContainer"></div>
      </div>
      <div v-if="!rev && inputString != null && inputString.length > 0">
        <a :href="`https://abjad.ganjoor.net?q=` + inputString ">پیوند به این جستجو</a>
      </div>
      <button
        v-if="returnUrl != null"
        type="button"
        class="rev-button"
        @click="returnToReturnUrl"
      >
        برگشت
      </button>
    </div>

    <div v-if="rev" align="center">
      <p>
        <textarea
          class="textarea-input"
          v-model="numbersString"
          placeholder="برای تبدیل سطرهای عدد به حرف سطور را در کادر زیر وارد کنید"
          cols="50"
          rows="4"
          style="direction: ltr"
        ></textarea>
      </p>
      <div class="result-section">
        <p>{{ revcalc(numbersString).str }}</p>
        <p>{{ revcalc(numbersString).desc }}</p>
      </div>

      <p>
        <small>
          <a href="http://blog.ganjoor.net/1399/04/20/rev-abjad/"
            >تبدیل سلسله عدد چیست؟</a
          >
        </small>
      </p>
    </div>

    <a href="#" class="rev-a" @click="onRev()">
      {{ revString }}
    </a>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    inputString: "",
    returnUrl: null,
    rev: false,
    revString: "تبدیل سلسله عدد",
    numbersString: "",
    cleanCharCount: 0,
  }),
  mounted() {
    this.inputString = this.$route.query.q;
    this.returnUrl = this.$route.query.r;
  },
  methods: {
    returnToReturnUrl() {
      window.location.href = this.returnUrl;
    },
    countAndSortCharacters(inputString) {
      if (inputString == null) return;
      // Initialize an empty map to store character counts
      const charCountMap = new Map();

      // Iterate through each character in the input string
      for (const char of inputString) {
        if (char == " ") continue;
        // Check if the character is already in the map
        if (charCountMap.has(char)) {
          // If yes, increment the count
          charCountMap.set(char, charCountMap.get(char) + 1);
        } else {
          // If not, add the character to the map with a count of 1
          charCountMap.set(char, 1);
        }
      }

      // Sort the map by character counts in descending order
      const sortedCharCount = new Map(
        [...charCountMap.entries()].sort((a, b) => b[1] - a[1])
      );

      // Return the sorted map
      return sortedCharCount;
    },

    countAndDisplayCharacters(inputString, resultTableId, sourceStringId) {
      const result = this.countAndSortCharacters(inputString);

      const container = document.getElementById(resultTableId);
      if (container == null) return;
      container.innerHTML = "";

      let highlightedCharDiv = null; // To keep track of the previously clicked charDiv

      // Populate the row with cells for each character and its frequency
      var first = true;
      result.forEach((count, char) => {
        const charDiv = document.createElement("div");
        charDiv.textContent = `${char}: ${this.persianizeNumerals(
          count.toString()
        )}`;
        charDiv.className = "charCell";

        // Add a click event listener to highlight the character in the source string
        charDiv.addEventListener("click", (event) => {
          if (event.target.classList.contains("charCell")) {
            // Roll back the color of the previously clicked charDiv
            if (highlightedCharDiv) {
              highlightedCharDiv.classList.remove("background-red");
            }

            const sourceStringDiv = document.getElementById(sourceStringId);
            const highlightedString = this.highlightCharacter(
              inputString,
              char,
              sourceStringDiv.innerHTML
            );
            sourceStringDiv.innerHTML = highlightedString;

            // Toggle the color of the clicked charDiv
            charDiv.classList.toggle("background-red");
            highlightedCharDiv = charDiv; // Update the reference to the clicked charDiv
          }
        });

        // Highlight the first character by default
        if (first) {
          first = false;
          charDiv.classList.add("background-red");
          highlightedCharDiv = charDiv;
          const sourceStringDiv = document.getElementById(sourceStringId);
          const highlightedString = this.highlightCharacter(
            inputString,
            char,
            sourceStringDiv.innerHTML
          );
          sourceStringDiv.innerHTML = highlightedString;
        }

        // Append the div to the container
        container.appendChild(charDiv);
      });
    },
    persianizeNumerals(value) {
      return value
        .replace(/0/gi, "۰")
        .replace(/1/gi, "۱")
        .replace(/2/gi, "۲")
        .replace(/3/gi, "۳")
        .replace(/4/gi, "۴")
        .replace(/5/gi, "۵")
        .replace(/6/gi, "۶")
        .replace(/7/gi, "۷")
        .replace(/8/gi, "۸")
        .replace(/9/gi, "۹");
    },
    highlightCharacter(previousHighlightedString, charToHighlight) {
      // Escape special characters in the regex pattern
      const escapedChar = charToHighlight.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      // Create a regular expression to match the specified character
      const regex = new RegExp(escapedChar, "g");

      // Remove previous highlighting
      const unhighlightedString = previousHighlightedString.replace(
        /<span style="color: red;">|<\/span>/g,
        ""
      );

      // Replace the matched character with the HTML code for red color
      const highlightedString = unhighlightedString.replace(
        regex,
        `<span style="color: red;">$&</span>`
      );

      return highlightedString;
    },
    calc(str) {
      var ret = { n: 0, desc: "" };
      if (str == null) {
        return ret;
      }

      var cleanStr = "";
      var charCount = 0;

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
          case "ؤ":
            n = 6;
            break;
          case "ز":
          case "ژ":
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
          case "ئ":
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
          case " ":
            cleanStr += str.charAt(i);
            break;
        }
        if (n != 0) {
          if (ret.desc != "") {
            ret.desc += " + ";
          }
          ret.desc +=
            "[" +
            str.charAt(i) +
            " = " +
            this.persianizeNumerals(n.toString()) +
            "]";
          ret.n += n;

          cleanStr += str.charAt(i);
          charCount++;
        }
      }
      this.cleanCharCount = charCount;
      this.countAndDisplayCharacters(
        cleanStr,
        "letters-stat-resultTableContainer",
        "letters-stat-sourceStringContainer"
      );
      return ret;
    },
    revcalc(str) {
      var ret = { str: "", desc: "" };
      if (str == null) {
        return ret;
      }

      var i = 0;

      while (i < str.length) {
        var outputStr = "";
        var inStr = "";
        var nextChar = "";
        if (i != str.length - 1) {
          nextChar = str[i + 1];
          if (nextChar == "۰") {
            nextChar = "0";
          }
        }
        var thirdChar = "";
        if (i < str.length - 2) {
          thirdChar = str[i + 2];
          if (thirdChar == "۰") {
            thirdChar = "0";
          }
        }
        var forthChar = "";
        if (i < str.length - 3) {
          forthChar = str[i + 2];
          if (forthChar == "۰") {
            forthChar = "0";
          }
        }
        switch (str.charAt(i)) {
          case "1":
          case "۱":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  if (forthChar == "0") {
                    inStr = "1000";
                    outputStr += "غ";
                    i += 4;
                  } else {
                    inStr = "100";
                    outputStr += "ق";
                    i += 4;
                  }
                } else {
                  inStr = "10";
                  outputStr += "ی";
                  i += 1;
                }
              } else {
                inStr = "1";
                outputStr += "ا";
                i++;
              }
            }
            break;
          case "2":
          case "۲":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "200";
                  outputStr += "ر";
                  i += 3;
                } else {
                  inStr = "20";
                  outputStr += "ک(گ)";
                  i += 2;
                }
              } else {
                inStr = "2";
                outputStr += "(پ)ب";
                i++;
              }
            }
            break;
          case "3":
          case "۳":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "300";
                  outputStr += "ش";
                  i += 3;
                } else {
                  inStr = "30";
                  outputStr += "ل";
                  i += 2;
                }
              } else {
                inStr = "3";
                outputStr += "ج(چ)";
                i++;
              }
            }
            break;

          case "4":
          case "۴":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "400";
                  outputStr += "ت";
                  i += 3;
                } else {
                  inStr = "40";
                  outputStr += "م";
                  i += 2;
                }
              } else {
                inStr = "4";
                outputStr += "د";
                i++;
              }
            }
            break;

          case "5":
          case "۵":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "500";
                  outputStr += "ث";
                  i += 3;
                } else {
                  inStr = "50";
                  outputStr += "ن";
                  i += 2;
                }
              } else {
                inStr = "5";
                outputStr += "ه";
                i++;
              }
            }
            break;

          case "6":
          case "۶":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "600";
                  outputStr += "خ";
                  i += 3;
                } else {
                  inStr = "60";
                  outputStr += "س";
                  i += 2;
                }
              } else {
                inStr = "6";
                outputStr += "و";
                i++;
              }
            }
            break;

          case "7":
          case "۷":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "700";
                  outputStr += "ذ";
                  i += 3;
                } else {
                  inStr = "70";
                  outputStr += "ع";
                  i += 2;
                }
              } else {
                inStr = "7";
                outputStr += "ز";
                i++;
              }
            }
            break;

          case "8":
          case "۸":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "800";
                  outputStr += "ض";
                  i += 3;
                } else {
                  inStr = "80";
                  outputStr += "ف";
                  i += 2;
                }
              } else {
                inStr = "8";
                outputStr += "ح";
                i++;
              }
            }
            break;

          case "9":
          case "۹":
            {
              if (nextChar == "0") {
                if (thirdChar == "0") {
                  inStr = "900";
                  outputStr += "ظ";
                  i += 3;
                } else {
                  inStr = "90";
                  outputStr += "ص";
                  i += 2;
                }
              } else {
                inStr = "9";
                outputStr += "ط";
                i++;
              }
            }
            break;
          default:
            i++;
            break;
        }
        if (outputStr != "") {
          if (ret.desc != "") {
            ret.desc += " + ";
          }
          ret.desc += "[" + inStr + " = " + outputStr + "]";
          ret.str += outputStr;
        }
      }
      return ret;
    },

    onRev() {
      if (this.rev) {
        this.revString = "تبدیل سلسله عدد";
      } else {
        this.revString = "تبدیل معمولی";
      }
      this.rev = !this.rev;
    },
  },
};
</script>

<style>
* {
  direction: rtl;
  font-family: "Samim";
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none;
}
.rev-a{
  font-size: small;
}
.charContainer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.charCell {
  border: 1px solid black;
  padding: 8px;
  margin: 4px;
  cursor: pointer;
}

.count-section {
  border: solid 1px;
  display: table-row;
}

.background-red {
  background-color: red;
}
</style>
